import * as cp from 'child_process';
import fetch from 'cross-fetch';
import * as decompress from 'decompress';
import * as util from 'util';
import type { HandlerManifest, LANGUAGE_TYPE } from './manifest';

export const execFile = util.promisify(cp.execFile);

const exists = (binary: string) =>
	cp.spawnSync(process.platform == 'win32' ? 'where' : 'which', [binary])
		.status == 0;

interface LanguageHandlerConfig {
	manifest: HandlerManifest;
	language: LANGUAGE_TYPE;
	requirements: string[];
}

/**
 * TODO: Function to get the exported symbols/main handler out after loading
 * Thought outline currently is to:
 * - Create new LanguageHandler(Manifest), manifest has source URL and metadata
 * - Call ensureRequiredToolsAvailable() to make sure we can even run/install dep libs
 * - Download and extract/decompress the source with extractManifestSource()
 * - Use the Metacall "Ports" API to load the extracted source functions into memory
 * - Add the exported/entrypoint handler function into a Map/Object
 * - Register a new HTTP endpoint that has the loaded function as the code
 */
export abstract class LanguageHandler {
	public static language: LANGUAGE_TYPE;
	public static requirements: string[];

	/* The directory containing a language handler's runtime code and dependency files */
	public filedir: string;

	constructor(public config: LanguageHandlerConfig) {
		this.filedir = `./handlers/${this.config.manifest.endpoint}`;
		this.ensureRequiredToolsAvailable();
		this.extractManifestSource();
	}

	/**
	 * Implementation specific handler for how to install dependency libs
	 * IE: "npm install", "bundle", "cargo", "dub", etc.
	 **/
	abstract installDependencies(): void;

	/** Downloads the .tar.gz source archive from manifest, extracts it to "/handlers/<ENDPOINT-NAME>" */
	async extractManifestSource() {
		const req = await fetch(this.config.manifest.source_archive.url);
		const bytes = await req.arrayBuffer();
		const decompressed = await decompress(Buffer.from(bytes), this.filedir);
		console.log('Decompressed source:', decompressed);
	}

	/** Checks that binaries required to run the program and install dependencies are available in PATH */
	ensureRequiredToolsAvailable() {
		console.log(this);
		const availableTools = this.config.requirements.map(exists);

		if (availableTools.some(it => it == false)) {
			const missing = availableTools.filter(it => it == true);
			throw new Error(
				`Error: Language ${this.config.language} is missing required tools ${missing}`
			);
		}
	}
}
