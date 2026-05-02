'use client';

import React from 'react';
import { ReviewHistory } from '@/types';

interface ReviewHistoryProps {
  history: ReviewHistory[];
}

export const ReviewHistoryComponent: React.FC<ReviewHistoryProps> = ({
  history,
}) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="card w-full">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Review History</h2>
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {history.map((item, index) => (
          <div
            key={item.id}
            className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="font-semibold text-sm text-gray-800">
                  {index + 1}. {item.language.toUpperCase()}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(item.timestamp).toLocaleString()}
                </div>
              </div>
              <div className="text-lg font-bold text-indigo-600">
                {item.score}/10
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
