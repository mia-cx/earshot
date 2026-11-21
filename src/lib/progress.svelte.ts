import { SvelteSet } from 'svelte/reactivity';
import { readJson, writeJson } from './storage.ts';

const STORAGE_NAME = 'done';

/**
 * Lessons the reader has finished, kept in this browser only.
 * Storage can be unavailable (private mode, blocked site data); progress then lasts for the visit.
 */
class Progress {
	done = new SvelteSet<string>();

	/** Reads saved progress. Call once in the browser. */
	restore() {
		for (const id of readJson<string[]>(STORAGE_NAME, [])) this.done.add(id);
	}

	set(id: string, finished: boolean) {
		if (finished) this.done.add(id);
		else this.done.delete(id);
		writeJson(STORAGE_NAME, [...this.done]);
	}
}

export const progress = new Progress();
