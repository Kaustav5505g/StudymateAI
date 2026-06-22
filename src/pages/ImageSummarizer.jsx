import { useState } from "react";
import { motion } from "framer-motion";
import Tesseract from "tesseract.js";
import Sidebar from "../components/Sidebar";
import openai from "../openrouter";
import { ImageIcon, Sparkles, ScanText, FileQuestion } from "lucide-react";

export default function ImageSummarizer() {
  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [summary, setSummary] = useState("");
  const [quiz, setQuiz] = useState("");
  const [loading, setLoading] = useState(false);
  const [outputType, setOutputType] = useState("summary");
  const [difficulty, setDifficulty] = useState("medium");
  const [questionCount, setQuestionCount] = useState(5);

  const extractText = async () => {
    if (!image) return;

    try {
      setLoading(true);
      setExtractedText("");
      setSummary("");
      setQuiz("");

      const result = await Tesseract.recognize(image, "eng");

      setExtractedText(result.data.text);
    } catch (error) {
      console.error(error);
      setExtractedText("Failed to extract text.");
    } finally {
      setLoading(false);
    }
  };

  const generateSummary = async () => {
    if (!extractedText.trim()) return;

    try {
      setLoading(true);
      setSummary("Generating summary...");

      const completion = await openai.chat.completions.create({
        model: "google/gemma-3-12b-it",
        messages: [
          {
            role: "user",
            content: `
Summarize the following notes in simple student-friendly bullet points:

${extractedText}
`,
          },
        ],
      });

      setSummary(completion.choices[0].message.content);
    } catch (error) {
      console.error(error);
      setSummary("Failed to generate summary.");
    } finally {
      setLoading(false);
    }
  };

  const generateQuiz = async () => {
    if (!extractedText.trim()) return;

    try {
      setLoading(true);
      setQuiz("Generating quiz...");

      const completion = await openai.chat.completions.create({
        model: "google/gemma-3-12b-it",
        messages: [
          {
            role: "user",
            content: `
Generate 5 MCQs from the notes below.

Format:

1. Question
A) ...
B) ...
C) ...
D) ...

Answer: X

Notes:

${extractedText}
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

  const inputClass =
    "bg-void/40 border border-white/8 rounded-xl p-3 outline-none focus:border-cyan/40 transition-colors text-ivory";

  return (
    <div className="min-h-screen bg-void text-ivory flex relative overflow-hidden">

      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-5%] right-[10%] w-[450px] h-[450px] bg-cyan/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-[5%] left-[10%] w-[400px] h-[400px] bg-violet/10 blur-[140px] rounded-full" />
      </div>

      <Sidebar />

      <main className="flex-1 p-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-4xl font-bold mb-2 flex items-center gap-3">
            <ImageIcon className="w-8 h-8 text-cyan-soft" /> Image Learning Assistant
          </h1>
          <p className="text-muted mb-8">
            Upload notes, extract text, generate summaries and quizzes instantly.
          </p>
        </motion.div>

        <div className="glass rounded-2xl p-6">

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="mb-4 text-sm text-muted file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:bg-gradient-to-r file:from-cyan file:to-violet file:text-void file:font-semibold file:cursor-pointer hover:file:opacity-90 file:transition-opacity"
          />

          {image && (
            <div className="mb-6">
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="max-h-80 rounded-xl border border-white/10"
              />
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-4 mb-6">

            <select
              onChange={(e) => setOutputType(e.target.value)}
              className={inputClass}
            >
              <option value="summary">Summary</option>
              <option value="mcq">MCQ Quiz</option>
              <option value="viva">Viva Questions</option>
              <option value="flashcards">Flashcards</option>
            </select>

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className={inputClass}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <input
              type="number"
              min="1"
              max="50"
              value={questionCount}
              onChange={(e) => setQuestionCount(e.target.value)}
              className={inputClass}
              placeholder="Number of Questions"
            />

          </div>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={extractText}
              disabled={loading || !image}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan to-cyan-soft text-void px-5 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ScanText className="w-4 h-4" /> Extract Text
            </button>

            <button
              onClick={generateSummary}
              disabled={!extractedText}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald to-cyan text-void px-5 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4" /> Generate Summary
            </button>

            <button
              onClick={generateQuiz}
              disabled={!extractedText}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet to-violet-soft text-void px-5 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <FileQuestion className="w-4 h-4" /> Generate Quiz
            </button>
          </div>

        </div>

        <div className="mt-8 glass rounded-2xl p-6">
          <h2 className="text-2xl font-display font-semibold mb-4">
            Extracted Text
          </h2>

          <div className="bg-void/40 border border-white/8 rounded-xl p-4 min-h-[250px]">
            {loading && !extractedText ? (
              <p className="text-cyan-soft text-sm">OCR Processing...</p>
            ) : extractedText ? (
              <pre className="whitespace-pre-wrap text-ivory/80 text-sm leading-relaxed font-body">
                {extractedText}
              </pre>
            ) : (
              <p className="text-muted/60 text-sm">Extracted text will appear here...</p>
            )}
          </div>
        </div>

        <div className="mt-8 glass rounded-2xl p-6">
          <h2 className="text-2xl font-display font-semibold mb-4">
            AI Summary
          </h2>

          <div className="bg-void/40 border border-white/8 rounded-xl p-4 min-h-[200px]">
            <pre className="whitespace-pre-wrap text-ivory/80 text-sm leading-relaxed font-body">
              {summary || "Summary will appear here..."}
            </pre>
          </div>
        </div>

        <div className="mt-8 glass rounded-2xl p-6">
          <h2 className="text-2xl font-display font-semibold mb-4">
            AI Quiz
          </h2>

          <div className="bg-void/40 border border-white/8 rounded-xl p-4 min-h-[300px]">
            <pre className="whitespace-pre-wrap text-ivory/80 text-sm leading-relaxed font-body">
              {quiz || "Quiz will appear here..."}
            </pre>
          </div>
        </div>

      </main>
    </div>
  );
}