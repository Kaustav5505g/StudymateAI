import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import { BarChart3, CheckCircle2, FileText, CalendarDays } from "lucide-react";

const stats = [
  { label: "Quizzes Taken", value: "24", color: "text-cyan" },
  { label: "Average Score", value: "78%", color: "text-emerald" },
  { label: "Study Hours", value: "42", color: "text-violet-soft" },
  { label: "Weak Topics", value: "Machine Learning", color: "text-rose", small: true },
];

const activity = [
  { icon: CheckCircle2, text: "Quiz on DSA completed → Score: 80%", color: "text-emerald" },
  { icon: FileText, text: "Summary generated for Machine Learning notes", color: "text-cyan-soft" },
  { icon: CalendarDays, text: "Study plan created for DBMS", color: "text-violet-soft" },
];

export default function Analytics() {
  return (
    <div className="min-h-screen bg-void text-ivory flex relative overflow-hidden">

      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-5%] right-[5%] w-[450px] h-[450px] bg-violet/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-cyan/10 blur-[140px] rounded-full" />
      </div>

      <Sidebar />

      <main className="flex-1 p-10 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-4xl font-bold mb-2 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-cyan-soft" /> Analytics Dashboard
          </h1>
          <p className="text-muted mb-8">
            Track your learning performance and study progress.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-2xl p-6 hover:bg-white/[0.07] transition-colors"
            >
              <h3 className="text-muted text-sm">{stat.label}</h3>
              <p className={`${stat.small ? "text-xl" : "text-4xl"} font-display font-bold mt-2 ${stat.color}`}>
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 glass rounded-2xl p-6">
          <h2 className="text-2xl font-display font-semibold mb-5">
            Recent Activity
          </h2>

          <div className="space-y-3">
            {activity.map(({ icon: Icon, text, color }, i) => (
              <div key={i} className="glass rounded-xl p-4 flex items-center gap-3 hover:bg-white/[0.06] transition-colors">
                <Icon className={`w-4 h-4 ${color} shrink-0`} />
                <span className="text-sm text-ivory/80">{text}</span>
              </div>
            ))}
          </div>
        </div>

      </main>

    </div>
  );
}