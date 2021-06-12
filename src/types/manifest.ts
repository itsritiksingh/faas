/**
 * These need to correspond to Metacall language "tags"
 * See https://github.com/metacall/core/blob/1bc80baad6d820da71b71a14b4803cb441e8c1e7/source/ports/node_port/index.js#L191-L212
 */
export enum LANGUAGE_TYPE {
	JS = 'js',
	TS = 'ts',
	RUBY = 'rb',
	'C#' = 'cs',
	C = 'c',
	'C++' = 'cpp',
	D = 'd',
	RUST = 'rs'
}

export interface HandlerManifest {
	verion: number;
	name: string;
	endpoint: string;
	language: LANGUAGE_TYPE;
	source_archive: {
		url: string;
		entrypoint_file: string;
		entrypoint_function: string;
	};
}
