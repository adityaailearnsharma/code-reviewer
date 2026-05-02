'use client';

import React, { useState } from 'react';

interface CodeEditorProps {
  onReview: (code: string, language: string) => Promise<void>;
  loading: boolean;
}

const LANGUAGES = [
  'javascript',
  'typescript',
  'python',
  'react',
  'jsx',
  'tsx',
  'java',
  'cpp',
  'csharp',
  'php',
  'ruby',
  'go',
  'rust',
  'sql',
  'html',
  'css',
];

export const CodeEditor: React.FC<CodeEditorProps> = ({ onReview, loading }) => {
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<string>('javascript');

  const handleReview = async () => {
    if (code.trim()) {
      await onReview(code, language);
    }
  };

  const handleClear = () => {
    setCode('');
  };

  return (
    <div className="card w-full">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Code Editor</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Programming Language
        </label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="input-field"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Paste Your Code
        </label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your code here for AI review..."
          className="input-field font-mono text-sm h-64 resize-none"
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleReview}
          disabled={loading || !code.trim()}
          className="btn-primary flex-1"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <span className="animate-spin mr-2">⚙️</span>
              Reviewing...
            </span>
          ) : (
            '🔍 Review Code'
          )}
        </button>
        <button onClick={handleClear} className="btn-secondary">
          Clear
        </button>
      </div>
    </div>
  );
};
