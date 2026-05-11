export interface CodeReviewRequest {
  code: string;
  language: string;
}

export interface CodeReviewResponse {
  review: string | " ";
  suggestions: string[] | null;
  score: number | null ;
  issues: ReviewIssue[] | null;
  feedback:  string | " ";
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
