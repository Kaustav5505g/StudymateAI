import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import { FileText, FileQuestion, CalendarDays, Sparkles, Clock } from "lucide-react";

const stats = [
  { label: "Study Streak", value: "12 Days", color: "text-cyan" },
  { label: "Hours Studied", value: "48 hrs", color: "text-emerald" },
  { label: "Weekly Goal", value: "80%", color: "text-violet-soft" },
];

const quickActions = [
  { to: "/summarizer", icon: FileText, label: "Open Summarizer" },
  { to: "/quiz", icon: FileQuestion, label: "Generate Quiz" },
  { to: "/planner", icon: CalendarDays, label: "Study Planner" },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-void text-ivory flex relative overflow-hidden">

      {/* Ambient glow */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[10%] w-[450px] h-[450px] bg-cyan/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[20%] w-[450px] h-[450px] bg-violet/10 blur-[140px] rounded-full" />
      </div>

      <Sidebar />

      <main className="flex-1 p-10 relative z-10">

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-4xl font-bold mb-8 flex items-center gap-3"
        >
          Welcome Back <span className="text-2xl">👋</span>
        </motion.h1>

        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-2xl p-6 hover:bg-white/[0.07] transition-colors"
            >
              <h3 className="text-muted text-sm">{stat.label}</h3>
              <p className={`text-4xl font-display font-bold mt-3 ${stat.color}`}>
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {quickActions.map(({ to, icon: Icon, label }, i) => (
            <Link
              key={to}
              to={to}
              className="glass rounded-2xl p-6 hover:bg-white/[0.07] hover:border-cyan/30 transition-all duration-300 text-center group"
            >
              <Icon className="w-6 h-6 text-cyan-soft mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-base font-semibold">{label}</div>
            </Link>
          ))}
        </div>

        <div className="mt-8 glass rounded-2xl p-6">
          <h2 className="text-xl font-display font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-soft" /> Upcoming Study Session
          </h2>
          <p className="text-muted">
            Data Structures • Today at 7:00 PM
          </p>
        </div>

        <div className="mt-6 glass rounded-2xl p-6 border-l-2 border-l-violet/40">
          <h2 className="text-xl font-display font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-violet-soft" /> AI Recommendations
          </h2>

          <ul className="space-y-2.5">
            {[
              "Focus on Machine Learning this week",
              "Complete 2 additional quizzes",
              "Revise Python before Friday",
              "Maintain your 12-day study streak",
            ].map((rec, i) => (
              <li key={i} className="flex items-start gap-2 text-muted text-sm">
                <span className="text-violet-soft mt-1">•</span> {rec}
              </li>
            ))}
          </ul>
        </div>

      </main>

    </div>
  );
}