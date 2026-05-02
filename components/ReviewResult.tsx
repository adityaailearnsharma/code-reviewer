'use client';

import React from 'react';
import { CodeReviewResponse } from '@/types';

interface ReviewResultProps {
  result: CodeReviewResponse | null;
  loading: boolean;
}

export const ReviewResult: React.FC<ReviewResultProps> = ({
  result,
  loading,
}) => {
  if (loading) {
    return (
      <div className="card w-full">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin text-4xl mr-4">⚙️</div>
          <p className="text-lg text-gray-600">Analyzing your code...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="card w-full">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Review Results</h2>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Code Quality Score</h3>
          <div className="text-3xl font-bold text-indigo-600">{result.score}/10</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(result.score / 10) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">AI Review</h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 whitespace-pre-wrap text-sm text-gray-700 max-h-48 overflow-y-auto">
          {result.review}
        </div>
      </div>

      {result.suggestions && result.suggestions.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            💡 Suggestions
          </h3>
          <ul className="space-y-2">
            {result.suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200"
              >
                <span className="text-blue-600 font-bold flex-shrink-0">→</span>
                <span className="text-sm text-gray-700">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.issues && result.issues.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">⚠️ Issues</h3>
          <div className="space-y-2">
            {result.issues.map((issue, index) => {
              const bgColor =
                issue.type === 'error'
                  ? 'bg-red-50 border-red-200'
                  : issue.type === 'warning'
                    ? 'bg-yellow-50 border-yellow-200'
                    : 'bg-blue-50 border-blue-200';

              const textColor =
                issue.type === 'error'
                  ? 'text-red-700'
                  : issue.type === 'warning'
                    ? 'text-yellow-700'
                    : 'text-blue-700';

              return (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${bgColor} ${textColor}`}
                >
                  <div className="font-semibold capitalize">
                    {issue.type}
                    {issue.line && ` (Line ${issue.line})`}
                  </div>
                  <div className="text-sm">{issue.message}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
