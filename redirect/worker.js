// seo.mia.cx was Earshot's first address. Every request moves permanently to the same path on earshot.mia.cx.
export default {
	fetch(request) {
		const url = new URL(request.url);
		url.hostname = 'earshot.mia.cx';
		return Response.redirect(url, 301);
	}
};
