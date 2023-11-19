const slugfy = (str: string): string => {
	return str
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '') // Remove diacritic marks
		.replace(/[^\w\s-]/g, '') // Remove non-word characters
		.replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
		.replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
};

export default slugfy;