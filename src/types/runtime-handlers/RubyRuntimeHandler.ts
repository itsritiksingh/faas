import * as cp from 'child_process';
import * as fs from 'fs';
import * as util from 'util';
import { LanguageHandler } from '../BaseLanguageHandler';
import { HandlerManifest, LANGUAGE_TYPE } from '../manifest';

const execFile = util.promisify(cp.execFile);

export class RubyRuntimeHandler extends LanguageHandler {
	static language = LANGUAGE_TYPE.RUBY;
	static requirements = []; // ["ruby", "bundle"]; // Apparently not needed to run?

	constructor(manifest: HandlerManifest) {
		super({
			manifest,
			language: RubyRuntimeHandler.language,
			requirements: RubyRuntimeHandler.requirements
		});
	}

	override async installDependencies() {
		if (!fs.existsSync(this.filedir + '/gemfile')) return;
		const { stdout, stderr } = await execFile('bundle', ['install']);
	}
}
