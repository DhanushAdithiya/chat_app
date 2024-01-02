const replaceTempalte= (html: string, title: string): string => {
	let op = html.replace("{%TITLE%}", title);
	return op;
}

export default replaceTempalte;
