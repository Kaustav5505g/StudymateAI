import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Summarizer from "./pages/Summarizer";
import QuizGenerator from "./pages/QuizGenerator";
import StudyPlanner from "./pages/StudyPlanner";
import Analytics from "./pages/Analytics";
import ImageSummarizer from "./pages/ImageSummarizer";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/summarizer" element={<Summarizer />} />
        <Route path="/quiz" element={<QuizGenerator />} />
        <Route path="/planner" element={<StudyPlanner />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route
  path="/image-summarizer"
  element={<ImageSummarizer />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;