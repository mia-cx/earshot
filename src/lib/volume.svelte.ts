import { readJson, writeJson } from './storage.ts';

const STORAGE_NAME = 'volume';

/**
 * The narration's volume, 0 to 1, set in Reading settings and kept in this browser. Storage can be
 * unavailable (private mode, blocked site data); the volume then lasts for the visit.
 */
class Volume {
	level = $state(1);

	/** Reads the saved volume. Call in the browser. */
	restore() {
		const saved = readJson<unknown>(STORAGE_NAME, 1);
		if (typeof saved === 'number' && saved >= 0 && saved <= 1) this.level = saved;
	}

	set(level: number) {
		this.level = level;
		writeJson(STORAGE_NAME, level);
	}
}

export const volume = new Volume();
