export const checkIfIsBase64 = (str: string) =>
	str.includes('data:image/') && str.includes(';base64,');
