/** Triggers a browser download for generated text content. */
export const downloadFile = (name: string, text: string, type: string) => {
	const link = document.createElement('a');
	link.href = URL.createObjectURL(new Blob([text], { type }));
	link.download = name;
	link.click();
	URL.revokeObjectURL(link.href);
};
