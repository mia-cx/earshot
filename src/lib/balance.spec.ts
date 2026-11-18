import { expect, it } from 'vitest';
import { balance } from './balance.ts';

const height = (heights: number[], column: number[]) => column.reduce((n, i) => n + heights[i], 0);

// Proves the tricks masonry ends its two columns level where an in-order split can't: one tall
// card early no longer leaves the other column far shorter.
it('ends both columns as level as the cards allow, in course order', () => {
	const heights = [900, 200, 300, 250, 150, 500, 100];
	const [left, right] = balance(heights);
	expect(Math.abs(height(heights, left) - height(heights, right))).toBe(0);
	expect(left[0]).toBe(0);
	for (const column of [left, right]) expect(column).toEqual([...column].sort((a, b) => a - b));
	expect([...left, ...right].sort((a, b) => a - b)).toEqual(heights.map((_, i) => i));
});
