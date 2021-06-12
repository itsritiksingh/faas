import { HandlerManifest, LANGUAGE_TYPE } from './types/manifest';
import { RubyRuntimeHandler } from './types/runtime-handlers/RubyRuntimeHandler';

const TEST_RUBY_MANIFEST: HandlerManifest = {
	verion: 1,
	language: LANGUAGE_TYPE.RUBY,
	name: 'Test Ruby Handler',
	endpoint: '/ruby-test',
	source_archive: {
		url: 'http://localhost:8000/ruby/archive.tar.gz',
		entrypoint_file: 'app.rb',
		entrypoint_function: 'some_func'
	}
};

async function test() {
	switch (TEST_RUBY_MANIFEST.language) {
		default:
			throw new Error('Not Implemented');

		case LANGUAGE_TYPE.RUBY:
			const handler = new RubyRuntimeHandler(TEST_RUBY_MANIFEST);
			break;
	}
}
test().catch(console.log);
