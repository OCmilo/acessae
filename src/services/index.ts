const SERVER_URI = 'http://localhost:3001';
const ERROR_500 = new Error('There was an error trying to reach the server');
const ERROR_GENERAL = new Error('There was an error with the request');

export interface AccessibilityResponse {
	url: string;
	_id: string;
	searches: number;
	comments: Array<unknown>;
	usersVoted: Array<unknown>;
	accessibility: number;
	__v: number;
}

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

export { getUri };
