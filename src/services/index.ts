import type { AccessibilityResponse } from '../entities';

const SERVER_URI = 'http://localhost:3001';
const ERROR_500 = new Error('There was an error trying to reach the server');
const ERROR_GENERAL = new Error('There was an error with the request');

const getUri = async (url: string): Promise<AccessibilityResponse | Error> => {
	let response: Response;
	try {
		response = await fetch(`${SERVER_URI}/api/accessibility/${url}`);
	} catch (error) {
		return ERROR_500;
	}

	if (!response.ok) {
		return ERROR_GENERAL;
	}

	const body = (await response.json()) as AccessibilityResponse;

	return body;
};

const postRating = async (id: string, rating: number): Promise<void | Error> => {
	let response: Response;
	try {
		response = await fetch(`${SERVER_URI}/api/user-ratings`, {
			body: JSON.stringify({
				id,
				rating
			})
		});
	} catch (error) {
		return ERROR_500;
	}

	if (!response.ok) {
		return ERROR_GENERAL;
	}
};

export { getUri, postRating };
