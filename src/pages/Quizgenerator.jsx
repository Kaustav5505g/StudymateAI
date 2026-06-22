import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import openai from "../openrouter";
import { FileQuestion, Sparkles } from "lucide-react";

export default function QuizGenerator() {
  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState("");
  const [loading, setLoading] = useState(false);

  const generateQuiz = async () => {
    if (!topic.trim()) return;

    try {
      setLoading(true);
      setQuiz("Generating quiz...");

      const completion = await openai.chat.completions.create({
        model: "google/gemma-3-12b-it",
        messages: [
          {
            role: "user",
            content: `
Generate 5 multiple-choice questions on "${topic}".

Format:

1. Question?
A) Option
B) Option
C) Option
D) Option
Answer: X

Make the questions educational and suitable for students.
`,
          },
        ],
      });

      setQuiz(completion.choices[0].message.content);
    } catch (error) {
      console.error(error);
      setQuiz("Failed to generate quiz.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-void text-ivory flex relative overflow-hidden">

      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-5%] right-[15%] w-[450px] h-[450px] bg-violet/10 blur-[140px] rounded-full" />
      </div>

      <Sidebar />

      <main className="flex-1 p-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-4xl font-bold mb-2 flex items-center gap-3">
            <FileQuestion className="w-8 h-8 text-violet-soft" /> AI Quiz Generator
          </h1>
          <p className="text-muted mb-8">
            Generate AI-powered quizzes from any topic.
          </p>
        </motion.div>

        <div className="glass rounded-2xl p-6">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter topic (e.g. Machine Learning)"
            className="w-full bg-void/40 border border-white/8 rounded-xl p-4 mb-4 outline-none focus:border-violet/40 transition-colors text-ivory placeholder:text-muted/60"
          />

          <button
            onClick={generateQuiz}
            disabled={loading || !topic.trim()}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet to-cyan text-void px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed glow-violet"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-void/40 border-t-void rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Generate Quiz
              </>
            )}
          </button>
        </div>

        {quiz && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 glass rounded-2xl p-6"
          >
            <h2 className="text-2xl font-display font-semibold mb-6">
              Generated Quiz on <span className="text-violet-soft">{topic}</span>
            </h2>

            <div className="bg-void/40 border border-white/8 rounded-xl p-6">
              <pre className="whitespace-pre-wrap text-ivory/80 text-sm leading-relaxed font-body">
                {quiz}
              </pre>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}