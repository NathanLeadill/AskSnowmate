import HmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';

export function generateAuthorisationString(
	apiKey: string,
	apiSecret: string,
	data: object
): string {
	const base64Data = base64url(JSON.stringify(data));
	const hash = HmacSHA256(base64Data, apiSecret);
	const base64Hash = hash.toString(Base64);
	const authToken = btoa(apiKey + ':' + base64Hash);
	return `Basic ${authToken}`;
}

function base64url(input: string): string {
	let base64String = btoa(input);
	base64String = base64String.replace(/=+$/, '');
	base64String = base64String.replace(/\+/g, '-');
	base64String = base64String.replace(/\//g, '_');
	return base64String;
}
