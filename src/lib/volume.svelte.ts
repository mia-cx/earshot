import { readJson, writeJson } from './storage.ts';

const STORAGE_NAME = 'volume';

/**
 * The narration's volume, 0 to 1, set in Reading settings and kept in this browser. Storage can be
 * unavailable (private mode, blocked site data); the volume then lasts for the visit. Some browsers
 * (Safari on iOS) ignore a page's volume and leave it to the device's buttons: `adjustable` is false
 * there, and the slider stays hidden.
 */
class Volume {
	level = $state(1);
	adjustable = $state(false);
	#restored = false;

	/** Reads the saved volume, once per visit, and whether this browser lets the page set it. Call in the browser. */
	restore() {
		if (this.#restored) return;
		this.#restored = true;
		const probe = new Audio();
		probe.volume = 0.5;
		this.adjustable = probe.volume === 0.5;
		const saved = readJson<unknown>(STORAGE_NAME, 1);
		if (typeof saved === 'number' && saved >= 0 && saved <= 1) this.level = saved;
	}

	set(level: number) {
		this.level = level;
		writeJson(STORAGE_NAME, level);
	}
}

export const volume = new Volume();
