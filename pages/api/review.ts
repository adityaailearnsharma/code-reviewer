import type { NextApiRequest, NextApiResponse } from 'next';
import { CodeReviewResponse } from '@/types';
import { Groq } from "groq-sdk";

//const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
 const GROQ_API_KEY = "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";
const groq = new Groq({ apiKey: GROQ_API_KEY });
//const MODEL = "llama-3.3-70b-versatile";
//const MODEL = 'gpt-3.5-turbo';

if (!GROQ_API_KEY) {
  console.error('Warning: GROQ_API_KEY is not set');
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CodeReviewResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code, language } = req.body;

  if (!code || !language) {
    return res
      .status(400)
      .json({ error: 'Code and language are required' });
  }

  if (!GROQ_API_KEY) {
    return res.status(500).json({
      error: 'Groq API key not configured. Please set GROQ_API_KEY in .env.local',
    });
  }

  try {
    const prompt = `You are an expert code reviewer. Please review the following ${language} code and provide:
1. A detailed review of the code
2. Up to 5 specific suggestions for improvement
3. A quality score from 1-10
4. Any errors or issues found

Code to review:
\`\`\`${language}
${code}
\`\`\`

Provide your response in the following JSON format:
{
  "review": "detailed review text",
  "suggestions": ["suggestion 1", "suggestion 2", ...],
  "score": 8,
  "issues": [
    {"type": "error|warning|info", "message": "issue description", "line": 10}
  ]
}`;


    const completion = await groq.chat.completions.create({
      messages: [
        { 
          role: "system", 
          //content: "You are an expert Frontend Code Reviewer. Analyze code for bugs, accessibility (WCAG), and performance. Use Markdown for formatting." 
          content: prompt,
        },
        { role: "user", content: code }
      ],
      model: "llama-3.3-70b-versatile",
    });

    
  //  const data = await response.json();
    //const content = data.choices[0]?.message?.content;

   // if (!content) {
     // return res.status(500).json({ error: 'No response from Groq' });
    //}

    return res.status(200).json({ feedback: completion.choices[0].message.content });
    
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error.message });
   // return res.status(500).json({
     // error: error instanceof Error ? error.message : 'Internal server error',
   // });
  }
}
