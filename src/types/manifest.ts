export enum LANGUAGE_TYPE {
	JS,
	TS,
	RUBY,
	'C#',
	C,
	'C++',
	D,
	RUST
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
