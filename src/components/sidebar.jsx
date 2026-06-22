import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  FileQuestion,
  CalendarDays,
  BarChart3,
  ImageIcon,
  Sparkles,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/summarizer", icon: FileText, label: "Summarizer" },
  { to: "/quiz", icon: FileQuestion, label: "Quiz Generator" },
  { to: "/planner", icon: CalendarDays, label: "Study Planner" },
  { to: "/image-summarizer", icon: ImageIcon, label: "Image Summarizer" },
  { to: "/analytics", icon: BarChart3, label: "Analytics" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 glass border-r border-white/8 p-6 min-h-screen relative z-10">

      <Link to="/" className="flex items-center gap-2 mb-10">
        <div className="relative">
          <Sparkles className="w-5 h-5 text-cyan relative z-10" />
          <div className="absolute inset-0 bg-cyan blur-md opacity-50" />
        </div>
        <h1 className="font-display text-xl font-bold text-ivory">
          StudyMate <span className="text-gradient">AI</span>
        </h1>
      </Link>

      <nav className="space-y-2">
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-cyan/15 to-violet/15 text-cyan-soft border border-cyan/20"
                  : "text-muted hover:bg-white/[0.05] hover:text-ivory"
              }`}
            >
              <Icon size={20} />
              <span className="font-medium text-sm">{label}</span>
            </Link>
          );
        })}
      </nav>

    </aside>
  );
}