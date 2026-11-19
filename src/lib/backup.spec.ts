import { expect, it } from 'vitest';
import { exportBackup, parseBackup } from './backup.ts';

// Proves a backup carries every Earshot key and nothing else, and restores it unchanged.
it('round-trips every Earshot key and leaves other sites’ keys out', () => {
	const saved = { 'earshot:done': '["a/b"]', 'earshot:answers:Who?': 'Me', 'other-app:token': 'x' };
	expect(parseBackup(exportBackup(saved))).toEqual({ 'earshot:done': '["a/b"]', 'earshot:answers:Who?': 'Me' });
});

// Proves a file that isn't a backup is refused before anything is written.
it.each([
	['not JSON', 'hello'],
	['a list', '["earshot:done"]'],
	['empty', '{}'],
	['another site’s keys', '{"other-app:token":"x"}'],
	['a value that is not text', '{"earshot:done":["a/b"]}']
])('refuses %s', (_, text) => {
	expect(parseBackup(text)).toBeNull();
});
