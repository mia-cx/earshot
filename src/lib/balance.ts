/**
 * Splits items into two columns whose heights are as close as possible (subset sum over whole
 * pixels). Each column keeps the items' original order, and the column holding the first item
 * comes first. Returns the item indexes of each column.
 */
export const balance = (heights: readonly number[]): [number[], number[]] => {
	const sizes = heights.map((h) => Math.max(0, Math.round(h)));
	const total = sizes.reduce((a, b) => a + b, 0);
	const half = Math.floor(total / 2);
	// reachedBy[s] is the item that first made height s reachable; -1 means unreachable.
	const reachedBy = new Int32Array(half + 1).fill(-1);
	const reached = new Uint8Array(half + 1);
	reached[0] = 1;
	sizes.forEach((size, i) => {
		for (let s = half; s >= size; s--) {
			if (!reached[s] && reached[s - size]) {
				reached[s] = 1;
				reachedBy[s] = i;
			}
		}
	});
	let s = half;
	while (!reached[s]) s--;
	const picked = new Set<number>();
	while (s > 0) {
		const i = reachedBy[s];
		picked.add(i);
		s -= sizes[i];
	}
	const a = sizes.flatMap((_, i) => (picked.has(i) ? [i] : []));
	const b = sizes.flatMap((_, i) => (picked.has(i) ? [] : [i]));
	return a[0] === 0 ? [a, b] : [b, a];
};
