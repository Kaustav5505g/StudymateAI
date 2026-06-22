import Silk from "../components/Silk";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  FileQuestion,
  CalendarDays,
  BarChart3,
  Target,
  Brain,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "AI Summarizer",
    desc: "Generate concise study notes from lengthy learning materials.",
    color: "text-cyan",
    bg: "bg-cyan/10",
    glow: "rgba(34,211,238,0.15)",
  },
  {
    icon: FileQuestion,
    title: "Quiz Generator",
    desc: "Create practice questions instantly from uploaded notes.",
    color: "text-violet-soft",
    bg: "bg-violet/10",
    glow: "rgba(168,85,247,0.15)",
  },
  {
    icon: CalendarDays,
    title: "Study Planner",
    desc: "Personalized schedules based on exams and available time.",
    color: "text-emerald",
    bg: "bg-emerald/10",
    glow: "rgba(52,211,153,0.15)",
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    desc: "Visual insights into learning performance and consistency.",
    color: "text-amber",
    bg: "bg-amber/10",
    glow: "rgba(251,191,36,0.15)",
  },
  {
    icon: Target,
    title: "Weak Topic Detection",
    desc: "Identify difficult concepts and receive focused recommendations.",
    color: "text-rose",
    bg: "bg-rose/10",
    glow: "rgba(251,113,133,0.15)",
  },
  {
    icon: Brain,
    title: "AI Learning Assistant",
    desc: "Smart guidance tailored to each student's learning journey.",
    color: "text-cyan-soft",
    bg: "bg-cyan/10",
    glow: "rgba(103,232,249,0.15)",
  },
];

const stats = [
  { label: "Readiness", value: "82%", color: "text-emerald" },
  { label: "Accuracy", value: "78%", color: "text-cyan" },
  { label: "Topics", value: "14/20", color: "text-violet-soft" },
  { label: "Study Streak", value: "12 Days", color: "text-amber" },
];

function App() {
  return (
    <div className="min-h-screen bg-void text-ivory relative overflow-hidden">

      {/* Ambient background glow */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-cyan/15 blur-[140px] rounded-full"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-5%] right-[-10%] w-[500px] h-[500px] bg-violet/15 blur-[140px] rounded-full"
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #F0F4FF 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-10 py-6 relative z-10">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Sparkles className="w-5 h-5 text-cyan relative z-10" />
            <div className="absolute inset-0 bg-cyan blur-md opacity-50" />
          </div>
          <h1 className="font-display text-xl font-bold text-ivory">
            StudyMate <span className="text-gradient">AI</span>
          </h1>
        </div>

        <Link
          to="/dashboard"
          className="bg-gradient-to-r from-cyan to-violet text-void px-5 py-2.5 rounded-full font-medium hover:opacity-90 transition-opacity glow-cyan text-sm"
        >
          Launch Platform
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 overflow-hidden py-16 md:py-24">

        <div className="absolute inset-0 -z-10">
          <Silk
            color="#0A1628"
            speed={3}
            scale={1.2}
            noiseIntensity={0.8}
            rotation={0}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left Side */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-flex items-center gap-1.5 text-xs tracking-[0.15em] uppercase text-cyan-soft font-semibold glass rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-3 h-3" /> AI-Powered Academic Intelligence
              </span>

              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02]">
                Learn Faster.
                <br />
                <span className="text-gradient">Study Smarter.</span>
              </h1>

              <p className="text-muted text-lg mt-6 max-w-xl leading-relaxed">
                StudyMate AI helps students summarize notes,
                generate quizzes, plan study schedules,
                track progress and improve learning outcomes.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan to-violet text-void px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity glow-cyan"
                >
                  Launch Platform <ArrowRight className="w-4 h-4" />
                </Link>

                <button className="glass px-8 py-4 rounded-xl font-medium hover:bg-white/[0.08] transition-colors">
                  View Features
                </button>
              </div>
            </motion.div>

            {/* Right Side - Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="glass-strong rounded-3xl p-8"
            >
              <h3 className="font-display text-cyan-soft font-bold text-xl mb-6 flex items-center gap-2">
                <Brain className="w-5 h-5" /> Student Dashboard
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className="glass rounded-2xl p-5 hover:bg-white/[0.07] transition-colors">
                    <p className="text-muted text-sm">{stat.label}</p>
                    <p className={`text-3xl font-display font-bold mt-1 ${stat.color}`}>
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="glass rounded-2xl p-5 mt-4 border-l-2 border-l-rose/40">
                <p className="text-muted text-sm">Weak Topic</p>
                <p className="text-rose font-semibold mt-1">Machine Learning</p>
                <p className="text-muted text-sm mt-2">
                  Recommended: 2 quizzes + 1 revision session
                </p>
              </div>
            </motion.div>

          </div>

        </div>

      </section>

      {/* Features Section */}
      <section className="mt-20 md:mt-32 px-6 md:px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Core <span className="text-gradient">Capabilities</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Designed to help students learn faster, revise smarter, and perform better.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass rounded-2xl p-6 hover:bg-white/[0.07] transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                  <Icon className={feature.color} size={24} />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted leading-relaxed">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-muted py-12 mt-20 relative z-10 border-t border-white/5 mt-32">
        © 2026 StudyMate AI • Built for Digital Solutions Challenge
      </footer>

    </div>
  );
}

export default App;