import { expect, it } from 'vitest';
import { exportBackup, parseBackup } from './backup.ts';

// Proves a backup carries every Free Game key and nothing else, and restores it unchanged.
it('round-trips every Free Game key and leaves other sites’ keys out', () => {
	const saved = { 'free-game:done': '["a/b"]', 'free-game:answers:Who?': 'Me', 'other-app:token': 'x' };
	expect(parseBackup(exportBackup(saved))).toEqual({ 'free-game:done': '["a/b"]', 'free-game:answers:Who?': 'Me' });
});

// Proves a file that isn't a backup is refused before anything is written.
it.each([
	['not JSON', 'hello'],
	['a list', '["free-game:done"]'],
	['empty', '{}'],
	['another site’s keys', '{"other-app:token":"x"}'],
	['a value that is not text', '{"free-game:done":["a/b"]}']
])('refuses %s', (_, text) => {
	expect(parseBackup(text)).toBeNull();
});
