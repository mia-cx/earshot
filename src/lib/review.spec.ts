import { expect, it } from 'vitest';
import { DAY_MS, review } from './review.svelte.ts';

// Proves the spacing schedule: a finished lesson's card is due after 1 day, each recall pushes it
// out to 3, 7, 16 and then 35 days, and a miss brings it back tomorrow.
it('spaces cards out as they are recalled and resets them when missed', () => {
	review.enroll(['a#0'], 0);
	expect(review.due(DAY_MS - 1)).toEqual([]);
	expect(review.due(DAY_MS)).toEqual(['a#0']);

	const waits = [3, 7, 16, 35, 35].map(() => {
		const before = review.nextDue() ?? 0;
		review.answer('a#0', true, before);
		return ((review.nextDue() ?? 0) - before) / DAY_MS;
	});
	expect(waits).toEqual([3, 7, 16, 35, 35]);

	review.answer('a#0', false, 0);
	expect(review.nextDue()).toBe(DAY_MS);
});
