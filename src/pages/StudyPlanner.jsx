import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/Sidebar";
import { CalendarDays, Sparkles } from "lucide-react";

const planPreview = [
  { day: "Monday", plan: "DSA (2 hrs), DBMS (1 hr)" },
  { day: "Tuesday", plan: "OS (2 hrs), DSA Revision (1 hr)" },
  { day: "Wednesday", plan: "DBMS (2 hrs), Aptitude (1 hr)" },
];

export default function StudyPlanner() {
  const [showPlan, setShowPlan] = useState(false);

  return (
    <div className="min-h-screen bg-void text-ivory flex relative overflow-hidden">

      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[450px] h-[450px] bg-emerald/10 blur-[140px] rounded-full" />
      </div>

      <Sidebar />

      <main className="flex-1 p-10 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-4xl font-bold mb-2 flex items-center gap-3">
            <CalendarDays className="w-8 h-8 text-emerald" /> Study Planner
          </h1>
          <p className="text-muted mb-8">
            Create a personalized study schedule.
          </p>
        </motion.div>

        <div className="glass rounded-2xl p-6 max-w-xl">

          <input
            type="text"
            placeholder="Subjects (e.g. DSA, DBMS, OS)"
            className="w-full bg-void/40 border border-white/8 rounded-xl p-4 mb-4 outline-none focus:border-emerald/40 transition-colors text-ivory placeholder:text-muted/60"
          />

          <input
            type="date"
            className="w-full bg-void/40 border border-white/8 rounded-xl p-4 mb-4 outline-none focus:border-emerald/40 transition-colors text-ivory [color-scheme:dark]"
          />

          <input
            type="number"
            placeholder="Hours per day"
            className="w-full bg-void/40 border border-white/8 rounded-xl p-4 mb-4 outline-none focus:border-emerald/40 transition-colors text-ivory placeholder:text-muted/60"
          />

          <button
            onClick={() => setShowPlan(true)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald to-cyan text-void px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity glow-emerald"
          >
            <Sparkles className="w-4 h-4" /> Generate Plan
          </button>

        </div>

        <AnimatePresence>
          {showPlan && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 glass rounded-2xl p-6 max-w-xl"
            >
              <h2 className="text-2xl font-display font-semibold mb-4">
                Generated Study Plan
              </h2>

              <div className="space-y-3">
                {planPreview.map(({ day, plan }, i) => (
                  <div key={i} className="bg-void/40 border border-white/8 rounded-xl p-4">
                    <span className="text-emerald font-semibold">{day}</span>
                    <span className="text-ivory/70"> → {plan}</span>
                  </div>
                ))}
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}