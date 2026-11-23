import { readJson, writeJson } from './storage.ts';

const STORAGE_NAME = 'review';
export const DAY_MS = 86_400_000;
/** Days a card waits before it comes back, by the Leitner box it sits in (index 0 is unused). */
const INTERVAL_DAYS = [0, 1, 3, 7, 16, 35];
const LAST_BOX = INTERVAL_DAYS.length - 1;

type Card = { box: number; due: number };

/**
 * Spaced review of the check cards from finished lessons, kept in this browser.
 * A card starts in box 1, due a day after its lesson is finished. "Got it" moves it up a box
 * and further out; "Not yet" sends it back to box 1, due tomorrow.
 */
class Review {
	#cards = $state<Record<string, Card>>({});
	restored = $state(false);

	/** Reads saved cards. Call once in the browser. */
	restore() {
		this.#cards = readJson<Record<string, Card>>(STORAGE_NAME, {});
		this.restored = true;
	}

	/** All enrolled card ids. */
	enrolled() {
		return Object.keys(this.#cards);
	}

	/** Card ids due now, oldest first. */
	due(now = Date.now()) {
		return Object.entries(this.#cards)
			.filter(([, card]) => card.due <= now)
			.sort(([, a], [, b]) => a.due - b.due)
			.map(([id]) => id);
	}

	/** Earliest due timestamp after `after` (default: any card), or null when none match. */
	nextDue(after = -Infinity) {
		const dues = Object.values(this.#cards)
			.map((c) => c.due)
			.filter((d) => d > after);
		return dues.length ? Math.min(...dues) : null;
	}

	/** Adds a finished lesson's cards to the deck. Cards already in it keep their schedule. */
	enroll(ids: string[], now = Date.now()) {
		for (const id of ids) this.#cards[id] ??= { box: 1, due: now + DAY_MS };
		writeJson(STORAGE_NAME, this.#cards);
	}

	answer(id: string, recalled: boolean, now = Date.now()) {
		const box = recalled ? Math.min((this.#cards[id]?.box ?? 1) + 1, LAST_BOX) : 1;
		this.#cards[id] = { box, due: now + INTERVAL_DAYS[box] * DAY_MS };
		writeJson(STORAGE_NAME, this.#cards);
	}
}

export const review = new Review();
