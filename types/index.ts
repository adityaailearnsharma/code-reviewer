export interface CodeReviewRequest {
  code: string;
  language: string;
}

export interface CodeReviewResponse {
  review: string;
  suggestions: string[];
  score: number;
  issues: ReviewIssue[];
  feedback:  string | null;
}

export interface ReviewIssue {
  type: 'error' | 'warning' | 'info';
  message: string;
  line?: number;
}

export interface ReviewHistory {
  id: string;
  code: string;
  language: string;
  review: string;
  timestamp: Date;
  score: number;
}
