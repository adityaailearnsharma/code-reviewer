export interface CodeReviewRequest {
  code: string;
  language: string;
}

export interface CodeReviewResponse {
  review: string | null;
  suggestions: string[] | null;
  score: number | null ;
  issues: ReviewIssue[] | null;
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
