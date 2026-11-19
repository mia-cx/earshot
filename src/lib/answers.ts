import { persistentMap } from '@nanostores/persistent';

/**
 * The reader's worksheet answers, keyed by question id and saved in this browser as
 * `earshot:answers:<question>`. Every form that asks a question reads and writes the same answer,
 * so a later lesson shows what the reader wrote earlier and lets them refine it. Open tabs stay in
 * sync; when storage is blocked, answers last for the visit.
 */
export const answers = persistentMap<Record<string, string>>('earshot:answers:');
