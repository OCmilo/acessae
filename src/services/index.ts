import type { AccessibilityResponse } from '../entities';

const SERVER_URI = 'http://0.0.0.0:3001';
const ERROR_500 = new Error('There was an error trying to reach the server');
const ERROR_GENERAL = new Error('There was an error with the request');

const getUri = async (url: string): Promise<AccessibilityResponse | Error> => {
	let response: Response;
	try {
		response = await fetch(`${SERVER_URI}/accessibility/${url}`);
	} catch (error) {
		return ERROR_500;
	}

	if (!response.ok) {
		return ERROR_GENERAL;
	}

	const body = (await response.json()) as AccessibilityResponse;

	return body;
};

const postFeedback = async (
	url: string,
	name: string,
	body: string,
	user_score: number
): Promise<void | Error> => {
	let response: Response;

	try {
		response = await fetch(`${SERVER_URI}/feedback`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				url,
				name,
				body,
				user_score
			})
		});
	} catch (error) {
		return ERROR_500;
	}

	if (!response.ok) {
		return ERROR_GENERAL;
	}
};

export { getUri, postFeedback };
