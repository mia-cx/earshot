import { error } from '@sveltejs/kit';
import { worksheets } from '#lib/server/worksheets.ts';

export const entries = () => worksheets.map((w) => ({ slug: w.slug }));

export const load = ({ params }) => {
	const worksheet = worksheets.find((w) => w.slug === params.slug);
	if (!worksheet) error(404, 'No worksheet here');
	return { worksheet };
};
