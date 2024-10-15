export const formatDate = (date: Date | undefined): string => {
	if (!date) return "";
	const wibDate = new Date(date.getTime() + 7 * 60 * 60 * 1000);
	return wibDate.toISOString().slice(0, 16);
};
