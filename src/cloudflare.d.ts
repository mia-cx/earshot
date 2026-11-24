declare module 'cloudflare:workers' {
	/** The Worker's bindings (wrangler.jsonc). `pnpm dev` gets them from adapter-cloudflare's platform proxy. */
	export const env: {
		/** Lesson narration, served at /narration/…. */
		NARRATION: NarrationBucket;
	};

	/** The part of an R2 bucket the narration route uses. */
	interface NarrationBucket {
		get(key: string, options?: { range?: Headers; onlyIf?: Headers }): Promise<NarrationObject | null>;
	}
	/** An R2 object; `body` is missing when a conditional request matched (304). */
	interface NarrationObject {
		size: number;
		httpEtag: string;
		range?: { offset?: number; length?: number; suffix?: number };
		body?: ReadableStream;
		writeHttpMetadata(headers: Headers): void;
	}
}
