export interface Comment {
	name: string;
	body: string;
	created_at: string;
	user_score?: string;
}

export interface AccessibilityResponse {
	id: string;
	a11y_score: number;
	user_score: string;
	hits: number;
	url: string;
	comments: Array<Comment | null>;
}
