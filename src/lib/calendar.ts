/** Hours after midnight on the review day when the calendar alerts the reader. */
const ALERT_HOUR = 9;

/** `YYYYMMDD` for a date in the reader's own time zone. */
const day = (date: Date) =>
	`${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;

/**
 * An `.ics` file with one all-day event on the day `due` falls in the reader's time zone, linking to
 * the review page at `url`, with an alert that morning.
 */
export const reviewEvent = (due: number, url: string, now = Date.now()) => {
	const start = new Date(due);
	const end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 1);
	const stamp = new Date(now).toISOString().replace(/[-:]|\.\d+/g, '');
	return `${[
		'BEGIN:VCALENDAR',
		'VERSION:2.0',
		'PRODID:-//Earshot//Review reminder//EN',
		'BEGIN:VEVENT',
		`UID:review-${day(start)}@earshot`,
		`DTSTAMP:${stamp}`,
		`DTSTART;VALUE=DATE:${day(start)}`,
		`DTEND;VALUE=DATE:${day(end)}`,
		'SUMMARY:Earshot review',
		'DESCRIPTION:Your review cards are due.',
		`URL:${url}`,
		'BEGIN:VALARM',
		'ACTION:DISPLAY',
		'DESCRIPTION:Earshot review',
		`TRIGGER:PT${ALERT_HOUR}H`,
		'END:VALARM',
		'END:VEVENT',
		'END:VCALENDAR'
	].join('\r\n')}\r\n`;
};
