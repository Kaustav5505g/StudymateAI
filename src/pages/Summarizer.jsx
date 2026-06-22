import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import openai from "../openrouter";
import { FileText, Sparkles } from "lucide-react";

export default function Summarizer() {
  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const generateSummary = async () => {
    if (!notes.trim()) return;

    try {
      setLoading(true);
      setSummary("Generating summary...");

      const completion = await openai.chat.completions.create({
        model: "google/gemma-3-12b-it",
        messages: [
          {
            role: "user",
            content: `Summarize the following notes in simple student-friendly bullet points:

${notes}`,
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

  return (
    <div className="min-h-screen bg-void text-ivory flex relative overflow-hidden">

      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-5%] left-[15%] w-[450px] h-[450px] bg-cyan/10 blur-[140px] rounded-full" />
      </div>

      <Sidebar />

      <main className="flex-1 p-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-4xl font-bold mb-2 flex items-center gap-3">
            <FileText className="w-8 h-8 text-cyan-soft" /> AI Summarizer
          </h1>
          <p className="text-muted mb-8">
            Convert lengthy notes into concise summaries.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="glass rounded-2xl p-6">
            <h2 className="text-xl font-display font-semibold mb-4">
              Input Notes
            </h2>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Paste your notes here..."
              className="w-full h-80 bg-void/40 border border-white/8 rounded-xl p-4 outline-none resize-none focus:border-cyan/40 transition-colors text-ivory placeholder:text-muted/60"
            />

            <button
              onClick={generateSummary}
              disabled={loading || !notes.trim()}
              className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-cyan to-violet text-void px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed glow-cyan"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-void/40 border-t-void rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Generate Summary
                </>
              )}
            </button>
          </div>

          <div className="glass rounded-2xl p-6">
            <h2 className="text-xl font-display font-semibold mb-4">
              Generated Summary
            </h2>

            <div className="bg-void/40 border border-white/8 rounded-xl p-4 min-h-[320px]">
              {summary ? (
                <p className="text-ivory/80 whitespace-pre-wrap text-sm leading-relaxed">
                  {summary}
                </p>
              ) : (
                <p className="text-muted/60">
                  Your summary will appear here...
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}