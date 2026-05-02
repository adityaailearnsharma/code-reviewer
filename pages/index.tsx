import React, { useState, useCallback } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import axios from 'axios';
import { CodeEditor } from '@/components/CodeEditor';
import { ReviewResult } from '@/components/ReviewResult';
import { ReviewHistoryComponent } from '@/components/ReviewHistory';
import { CodeReviewResponse, ReviewHistory } from '@/types';

const Home: NextPage = () => {
  const [result, setResult] = useState<CodeReviewResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<ReviewHistory[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleReview = useCallback(
    async (code: string, language: string) => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.post('/api/review', {
          code,
          language,
        });

        if (response.data.error) {
          setError(response.data.error);
          setResult(null);
        } else {
          setResult(response.data);

          const historyItem: ReviewHistory = {
            id: Date.now().toString(),
            code,
            language,
            review: response.data.review,
            timestamp: new Date(),
            score: response.data.score,
          };

          setHistory((prev) => [historyItem, ...prev].slice(0, 10));
        }
      } catch (err: unknown) {
        const errorMessage =
          axios.isAxiosError(err) && err.response?.data?.error
            ? err.response.data.error
            : err instanceof Error
              ? err.message
              : 'An error occurred while reviewing the code';
        setError(errorMessage);
        setResult(null);
        console.error('Review error:', err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return (
    <>
      <Head>
        <title>AI Code Reviewer</title>
        <meta name="description" content="AI-powered code review application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">🔍 AI Code Reviewer</h1>
                <p className="text-gray-600 mt-1">
                  Get intelligent feedback on your code using OpenAI
                </p>
              </div>
              <div className="text-sm text-gray-500">
                <p>Powered by OpenAI GPT-3.5</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-semibold">❌ Error</p>
              <p className="text-red-700 text-sm mt-1">{error}</p>
              <p className="text-red-600 text-xs mt-2">
                Make sure you have set the NEXT_PUBLIC_OPENAI_API_KEY in .env.local
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Editor */}
            <div className="lg:col-span-2">
              <CodeEditor onReview={handleReview} loading={loading} />
              <div className="mt-6">
                <ReviewResult result={result} loading={loading} />
              </div>
            </div>

            {/* Right Column - History */}
            <div className="lg:col-span-1">
              <ReviewHistoryComponent history={history} />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                <p>
                  AI Code Reviewer is a sample application demonstrating React, Next.js, and
                  OpenAI integration.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Tech Stack</h3>
                <ul className="space-y-1">
                  <li>• Next.js 14</li>
                  <li>• React 18</li>
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Resources</h3>
                <ul className="space-y-1">
                  <li>
                    <a href="https://nextjs.org" className="hover:text-indigo-600">
                      Next.js Docs
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://platform.openai.com/docs"
                      className="hover:text-indigo-600"
                    >
                      OpenAI API
                    </a>
                  </li>
                  <li>
                    <a href="https://tailwindcss.com" className="hover:text-indigo-600">
                      Tailwind CSS
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
              <p>
                © 2024 AI Code Reviewer. Made with ❤️ by{' '}
                <a
                  href="https://github.com/adityaailearnsharma"
                  className="text-indigo-600 hover:text-indigo-700"
                >
                  adityaailearnsharma
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
