export interface Comment {
	id: number;
	name: string;
	body: string;
	created: string;
	rating?: number;
}

export interface AccessibilityResponse {
	url: string;
	_id: string;
	searches: number;
	comments: Array<Comment | null>;
	usersVoted: Array<unknown>;
	accessibility: number;
	user_score: number;
	__v: number;
}
