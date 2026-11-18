import { expect, it } from 'vitest';
import { reviewEvent } from './calendar.ts';

// Proves the reminder lands on the reader's own calendar day of the due date, even late in the evening.
it('books the review for the day the cards fall due', () => {
	const due = new Date(2026, 10, 21, 23, 30).getTime();
	const ics = reviewEvent(due, 'https://example.com/review', Date.UTC(2026, 10, 18, 12));
	expect(ics).toContain('\r\nDTSTART;VALUE=DATE:20261121\r\n');
	expect(ics).toContain('\r\nDTEND;VALUE=DATE:20261122\r\n');
	expect(ics).toContain('\r\nDTSTAMP:20261118T120000Z\r\n');
	expect(ics).toContain('\r\nURL:https://example.com/review\r\n');
});
