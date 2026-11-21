export const STORAGE_PREFIX = 'earshot:';

export const storageKey = (name: string) => `${STORAGE_PREFIX}${name}`;

export const readStorage = (name: string): string | null => {
	try {
		return localStorage.getItem(storageKey(name));
	} catch {
		return null;
	}
};

export const writeStorage = (name: string, value: string) => {
	try {
		localStorage.setItem(storageKey(name), value);
	} catch {
		// Storage can be blocked in private mode; callers keep state in memory for the visit.
	}
};

export const readJson = <T>(name: string, fallback: T): T => {
	const raw = readStorage(name);
	if (raw === null) return fallback;
	try {
		return JSON.parse(raw) as T;
	} catch {
		return fallback;
	}
};

export const writeJson = (name: string, value: unknown) => writeStorage(name, JSON.stringify(value));
