import * as fs from 'fs';
import { execFile, LanguageHandler } from '../BaseLanguageHandler';
import { HandlerManifest, LANGUAGE_TYPE } from '../manifest';
import { RubyRuntimeHandler } from './RubyRuntimeHandler';

class JavascriptRuntimeHandler extends LanguageHandler {
	static language = LANGUAGE_TYPE.JS;
	static requirements = ['node', 'npm'];

	constructor(manifest: HandlerManifest) {
		super({
			manifest,
			language: RubyRuntimeHandler.language,
			requirements: RubyRuntimeHandler.requirements
		});
	}

	override async installDependencies() {
		if (!fs.existsSync(this.filedir + '/package.json')) return;
		const { stdout, stderr } = await execFile('npm', ['install']);
	}
}
