import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Download,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  FileText,
  Layout,
  BookOpen,
  Users,
  Scale,
  Building,
  Gavel,
  Globe,
  Code,
  Shield,
  CheckCircle,
  AlertTriangle,
  Activity,
  Timer,
  Check,
  Award,
  HelpCircle,
  Clock,
  Briefcase,
  ExternalLink,
  ChevronDown,
  Info
} from "lucide-react";
import { SPEAKERS, SPEAKERS as SPEAKERS_DATA, SLIDES, SlideData } from "./data/slidesData";
import { generateEngineeringEthicsPptx } from "./utils/pptxExporter";

export default function App() {
  const [activeTab, setActiveTab] = useState<"slides" | "outline" | "practice">("slides");
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(true);
  const [pptDownloading, setPptDownloading] = useState(false);
  const [pptDownloaded, setPptDownloaded] = useState(false);
  const [selectedSpeakerFilter, setSelectedSpeakerFilter] = useState<number | null>(null);

  // Practice Timer States
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerTime, setTimerTime] = useState(150); // 2.5 minutes in seconds per speaker
  const [activeSpeakerTimer, setActiveSpeakerTimer] = useState<number>(1);
  const [overallTime, setOverallTime] = useState(0);
  const [overallRunning, setOverallRunning] = useState(false);

  // Interactive Slide States
  // Slide 3 states
  const [gridLoad, setGridLoad] = useState<"normal" | "monsoon">("normal");
  // Slide 4 states
  const [dilemmaBalance, setDilemmaBalance] = useState<number>(50); // 0 (Profit) to 100 (Safety)
  // Slide 5 states
  const [selectedStakeholder, setSelectedStakeholder] = useState<"public" | "engineer" | "employer" | "hospital">("engineer");
  // Slide 9 states: Line Drawing slider levels
  const [lineDrawingOption, setLineDrawingOption] = useState<"opt1" | "opt2" | "opt3">("opt3");
  const [ldPublicRisk, setLdPublicRisk] = useState({ opt1: 10, opt2: 95, opt3: 85 });
  const [ldCompliance, setLdCompliance] = useState({ opt1: 10, opt2: 100, opt3: 90 });
  const [ldCost, setLdCost] = useState({ opt1: 90, opt2: 20, opt3: 65 });
  // Slide 11 states
  const [activeSdg, setActiveSdg] = useState<7 | 9 | null>(7);
  // Slide 14 states
  const [activeQaId, setActiveQaId] = useState<number | null>(null);

  // Core Slide Deck details
  const currentSlide = SLIDES[currentSlideIndex];

  // Master overall timer loop
  useEffect(() => {
    let interval: any;
    if (overallRunning) {
      interval = setInterval(() => {
        setOverallTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [overallRunning]);

  // Speaking spot individual timer loop
  useEffect(() => {
    let interval: any;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerTime((prev) => {
          if (prev <= 1) {
            setTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const handleDownloadPptx = async () => {
    try {
      setPptDownloading(true);
      setPptDownloaded(false);
      await generateEngineeringEthicsPptx();
      setPptDownloaded(true);
      setTimeout(() => setPptDownloaded(false), 4000);
    } catch (e) {
      console.error(e);
      alert("Error generating PPTX. Please make sure the app compiled fully.");
    } finally {
      setPptDownloading(false);
    }
  };

  const nextSlide = () => {
    if (currentSlideIndex < SLIDES.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  // Synchronize timer duration with selected speaker
  const handleSelectSpeakerTimer = (spNum: number) => {
    setActiveSpeakerTimer(spNum);
    setTimerTime(150); // Reset to 2.5 mins
    setTimerRunning(false);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-800 font-sans flex flex-col antialiased">
      {/* HEADER / NAVIGATION BAR */}
      <header className="h-14 bg-[#1E293B] text-white border-b border-slate-700 px-6 py-2 flex flex-col sm:flex-row items-center justify-between shadow-md sticky top-0 z-50 shrink-0">
        <div className="flex items-center space-x-3 mb-2 sm:mb-0">
          <div className="bg-blue-600 text-white p-2 rounded flex items-center justify-center font-bold text-xl shadow-md">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold font-serif leading-tight">EEE 2215 Engineering Ethics</h1>
            <p className="text-[10px] text-slate-300">Case Study: The Pressure to Release (Respirator Software Bug)</p>
          </div>
        </div>

        {/* Workspace Tab Selectors */}
        <div className="flex flex-wrap bg-slate-800 p-1 rounded-lg space-x-1 mb-2 sm:mb-0">
          <button
            onClick={() => setActiveTab("slides")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center space-x-2 ${
              activeTab === "slides"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-300 hover:text-white hover:bg-slate-700/50"
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            <span>Slides Presenter</span>
          </button>
          <button
            onClick={() => setActiveTab("outline")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center space-x-2 ${
              activeTab === "outline"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-300 hover:text-white hover:bg-slate-700/50"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Speaker Script & Outline</span>
          </button>
          <button
            onClick={() => setActiveTab("practice")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center space-x-2 ${
              activeTab === "practice"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-300 hover:text-white hover:bg-slate-700/50"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Practice & Timer Dashboard</span>
          </button>
        </div>

        {/* Download PPT Button */}
        <div>
          <button
            onClick={handleDownloadPptx}
            disabled={pptDownloading}
            className={`w-full sm:w-auto px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-2 border cursor-pointer ${
              pptDownloaded
                ? "bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-600"
                : "bg-blue-600 hover:bg-blue-500 text-white border-blue-600 hover:border-blue-500"
            }`}
          >
            {pptDownloading ? (
              <>
                <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Exporting...</span>
              </>
            ) : pptDownloaded ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span className="text-white font-semibold">Downloaded Deck!</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-white" />
                <span>Download PowerPoint (.pptx)</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* CORE WORKSPACE */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 max-w-7xl w-full mx-auto flex flex-col gap-6">

        {/* INTERACTIVE SLIDES Tab */}
        {activeTab === "slides" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT SIDEBAR: List of Slides Navigation */}
            <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-4 shadow-sm h-[600px] flex flex-col">
              <h2 className="text-xs font-bold text-slate-500 tracking-wider uppercase mb-3">
                Slide Navigator ({SLIDES.length} Slides)
              </h2>

              {/* Speaker filter controls */}
              <div className="flex flex-wrap gap-1 mb-4 pb-3 border-b border-slate-100">
                <button
                  onClick={() => setSelectedSpeakerFilter(null)}
                  className={`px-2 py-1 rounded text-[10px] font-semibold transition-all ${
                    selectedSpeakerFilter === null
                      ? "bg-[#1E293B] text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  All Slides
                </button>
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    onClick={() => setSelectedSpeakerFilter(num)}
                    className={`px-2 py-1 rounded text-[10px] font-semibold transition-all ${
                      selectedSpeakerFilter === num
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    M{num}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
                {SLIDES.filter(
                  (slide) => selectedSpeakerFilter === null || slide.speakerNum === selectedSpeakerFilter
                ).map((slide) => {
                  const isCurrent = slide.id - 1 === currentSlideIndex;
                  return (
                    <button
                      key={slide.id}
                      onClick={() => setCurrentSlideIndex(slide.id - 1)}
                      className={`w-full text-left p-2.5 rounded-lg transition-all flex items-start space-x-2.5 border ${
                        isCurrent
                          ? "bg-blue-50 border-blue-600 text-blue-950 font-semibold shadow-sm"
                          : "border-transparent hover:bg-slate-50 text-slate-600"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 ${
                          isCurrent
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {slide.id}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {slide.kicker}
                        </p>
                        <p className="text-xs font-serif truncate text-slate-700">{slide.title}</p>
                        <span className="inline-block mt-1 px-1.5 py-0.5 text-[9px] font-bold bg-white text-slate-700 rounded border border-slate-200">
                          {slide.speaker}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CENTER: High-Fidelity 16:9 Slide Canvas */}
            <div className="lg:col-span-9 flex flex-col gap-4">
              <div
                className={`relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-slate-300 transition-colors duration-500 flex flex-col justify-between p-8 md:p-12 select-none ${
                  currentSlide.theme === "dark"
                    ? "bg-[#1E293B] text-white"
                    : "bg-white text-slate-800"
                }`}
                style={{ minHeight: "380px" }}
              >
                {/* Visual Elements according to theme background patterns */}
                {currentSlide.theme === "dark" && (
                  <>
                    <div className="absolute top-0 right-0 w-80 h-80 bg-radial from-blue-600 to-transparent opacity-20 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-radial from-slate-800 to-transparent opacity-40 rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none" />
                  </>
                )}

                {/* 1. Header Area */}
                <div>
                  <div className="flex items-center justify-between">
                    <p
                      className={`text-xs md:text-sm font-bold uppercase tracking-widest ${
                        currentSlide.theme === "dark" ? "text-amber-400" : "text-blue-600"
                      }`}
                    >
                      {currentSlide.kicker}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>Presenter: {currentSlide.speaker}</span>
                      </span>
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-4xl font-serif font-bold mt-2 tracking-tight">
                    {currentSlide.title}
                  </h2>
                  {currentSlide.subtitle && (
                    <p className="text-sm md:text-lg text-slate-400 mt-1 font-serif italic">
                      {currentSlide.subtitle}
                    </p>
                  )}
                </div>

                {/* 2. Slide-Specific Rich Visual Content */}
                <div className="flex-1 flex items-center justify-center my-4 overflow-hidden relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      {/* SLIDE 1: Title Slide */}
                      {currentSlide.id === 1 && (
                        <div className="text-center max-w-xl">
                          <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                            A structured ethical analysis of a critical infant respirator software defect, applying NSPE, IEEE, and Software Engineering codes of conduct.
                          </p>
                          <div className="mt-6 flex justify-center space-x-12">
                            <div className="text-center">
                              <div className="w-12 h-12 bg-rose-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-md">
                                <Activity className="w-6 h-6 animate-pulse" />
                              </div>
                              <span className="text-xs text-slate-400">Neonatal Vitals</span>
                            </div>
                            <div className="text-center">
                              <div className="w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-md">
                                <Scale className="w-6 h-6" />
                              </div>
                              <span className="text-xs text-slate-400">Ethical Balance</span>
                            </div>
                            <div className="text-center">
                              <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-md">
                                <Shield className="w-6 h-6" />
                              </div>
                              <span className="text-xs text-slate-400">Patient Safety</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SLIDE 2: Introduction to Professional Codes */}
                      {currentSlide.id === 2 && (
                        <div className="grid grid-cols-4 gap-4 w-full h-full py-2">
                          {[1, 2, 3, 4].map((num) => {
                            const sp = SPEAKERS_DATA[num];
                            const speakerBorders = [
                              "border-l-blue-600",
                              "border-l-emerald-600",
                              "border-l-amber-500",
                              "border-l-rose-600"
                            ];
                            return (
                              <div
                                key={num}
                                className={`border-y border-r border-l-4 border-slate-200 bg-slate-50 text-slate-800 rounded-r-xl p-3 flex flex-col justify-between transition-all hover:scale-[1.02] shadow-sm ${
                                  speakerBorders[num - 1]
                                }`}
                              >
                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 opacity-80">
                                      {sp.name}
                                    </span>
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200">
                                      {sp.timeAlloc}
                                    </span>
                                  </div>
                                  <h4 className="text-xs font-serif font-bold leading-tight mb-1 text-slate-900">
                                    {sp.role}
                                  </h4>
                                  <p className="text-[10px] text-slate-500 leading-relaxed line-clamp-3">
                                    {sp.responsibility}
                                  </p>
                                </div>
                                <span className="text-[9px] font-semibold text-center mt-2 uppercase tracking-widest text-slate-400 opacity-60">
                                  Presentation Spot
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* SLIDE 3: The Case Study */}
                      {currentSlide.id === 3 && (
                        <div className="flex flex-col md:flex-row gap-6 items-center w-full justify-around">
                          <div className="max-w-xs space-y-3 text-left">
                            <h4 className="font-serif font-bold text-[#1E293B]">Simulation Testing:</h4>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => setGridLoad("normal")}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                                  gridLoad === "normal"
                                    ? "bg-emerald-600 text-white shadow"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                }`}
                              >
                                Normal Oxygen State
                              </button>
                              <button
                                onClick={() => setGridLoad("monsoon")}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                                  gridLoad === "monsoon"
                                    ? "bg-rose-600 text-white shadow"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                }`}
                              >
                                Oxygen Drop + Bug State
                              </button>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed min-h-[48px]">
                              {gridLoad === "normal"
                                ? "Respirator operates safely. Oxygen delivery remains within the normal envelope, no alarm needed."
                                : "CRITICAL FAILURE: Oxygen drops below safety threshold, but due to the subtle threshold calculation bug, the vital safety alarm fails to sound!"}
                            </p>
                          </div>

                          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4 items-center w-64">
                            <span className="text-[10px] font-bold text-slate-400 tracking-wide uppercase">
                              NICU Alarm System Flow
                            </span>
                            
                            <div className="flex flex-col items-center gap-3 w-full">
                              <div className="flex items-center space-x-3 bg-white px-3 py-2 rounded-lg border border-slate-100 w-full">
                                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                  <Activity className="w-4 h-4 text-emerald-600" />
                                </div>
                                <span className="text-xs font-bold text-slate-700">Oxygen Sensor</span>
                              </div>

                              <div className="w-1 h-4 border-dashed border-l border-slate-300" />

                              <div className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg border w-full transition-all ${
                                gridLoad === "normal"
                                  ? "bg-blue-50 border-blue-200 text-blue-900"
                                  : "bg-rose-50 border-rose-200 text-rose-900 animate-pulse"
                              }`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                                  gridLoad === "normal" ? "bg-blue-600 text-white" : "bg-rose-600 text-white"
                                }`}>
                                  <Code className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-bold">Alarm Algorithm</p>
                                  <p className="text-[9px] opacity-80 truncate">
                                    {gridLoad === "normal" ? "Normal threshold (Active)" : "Alarm Suppressed (Bug!)"}
                                  </p>
                                </div>
                              </div>

                              <div className="w-1 h-4 border-dashed border-l border-slate-300" />

                              <div className="flex items-center space-x-3 bg-white px-3 py-2 rounded-lg border border-slate-100 w-full">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                  <Globe className="w-4 h-4 text-blue-600" />
                                </div>
                                <span className="text-xs font-bold text-slate-700">NICU Staff Alert</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SLIDE 4: Step 1 - Moral Clarity */}
                      {currentSlide.id === 4 && (
                        <div className="w-full flex flex-col items-center gap-4">
                          <p className="text-xs text-slate-500 max-w-md text-center">
                            Use the slider to see how different deployment decisions tilt the balance of ethical priorities.
                          </p>

                          {/* Interactive Slider */}
                          <div className="w-full max-w-md flex items-center space-x-3 bg-slate-100 p-2 rounded-xl">
                            <span className="text-xs font-bold text-slate-500 uppercase">Economic Survival</span>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={dilemmaBalance}
                              onChange={(e) => setDilemmaBalance(Number(e.target.value))}
                              className="flex-1 h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                            <span className="text-xs font-bold text-slate-500 uppercase">Paramount Safety</span>
                          </div>

                          {/* Visual scale container */}
                          <div className="relative w-full h-40 max-w-lg mt-2 flex items-center justify-center">
                            {/* Scale beam rotated based on balance */}
                            <div
                              className="absolute bg-[#1E293B] h-2 w-72 rounded transition-transform duration-300 flex justify-between px-6"
                              style={{
                                transform: `rotate(${(dilemmaBalance - 50) * 0.25}deg)`
                              }}
                            >
                              {/* Left Basket */}
                              <div
                                className="absolute bg-white border-2 border-amber-200 p-2.5 rounded-lg shadow-sm -mt-10 -ml-10 w-24 h-24 flex flex-col items-center justify-center transition-all"
                                style={{
                                  transform: `rotate(${(50 - dilemmaBalance) * 0.25}deg)`
                                }}
                              >
                                <Building className="w-5 h-5 text-amber-600 mb-1" />
                                <span className="text-[9px] font-bold text-slate-400">BUSINESS</span>
                                <span className="text-[10px] font-bold text-slate-700 text-center leading-tight">
                                  {100 - dilemmaBalance}% Weight
                                </span>
                              </div>

                              {/* Right Basket */}
                              <div
                                className="absolute bg-white border-2 border-blue-200 p-2.5 rounded-lg shadow-sm -mt-10 -mr-10 right-0 w-24 h-24 flex flex-col items-center justify-center transition-all"
                                style={{
                                  transform: `rotate(${(50 - dilemmaBalance) * 0.25}deg)`
                                }}
                              >
                                <Shield className="w-5 h-5 text-blue-600 mb-1" />
                                <span className="text-[9px] font-bold text-slate-400">SAFETY</span>
                                <span className="text-[10px] font-bold text-slate-700 text-center leading-tight">
                                  {dilemmaBalance}% Weight
                                </span>
                              </div>
                            </div>

                            {/* Base of scale */}
                            <div className="absolute bottom-0 w-10 h-28 bg-slate-300 rounded-t border-l border-r border-slate-400" />
                            <div className="absolute bottom-0 w-24 h-4 bg-slate-400 rounded" />
                          </div>
                        </div>
                      )}

                      {/* SLIDE 5: Step 2 - Know the Facts */}
                      {currentSlide.id === 5 && (
                        <div className="flex flex-col md:flex-row gap-6 items-center w-full justify-around h-full">
                          <div className="flex flex-col gap-2 w-52 shrink-0">
                            {[
                              { id: "engineer", name: "The Engineer (You)", icon: Briefcase, color: "bg-blue-600" },
                              { id: "public", name: "Infants & Parents", icon: Users, color: "bg-emerald-600" },
                              { id: "employer", name: "MedTech Solutions", icon: Building, color: "bg-amber-500" }
                            ].map((sh) => (
                              <button
                                key={sh.id}
                                onClick={() => setSelectedStakeholder(sh.id as any)}
                                className={`px-4 py-3 rounded-xl border text-left transition-all flex items-center space-x-3 ${
                                  selectedStakeholder === sh.id
                                    ? "border-blue-600 bg-blue-50 shadow-sm font-semibold text-blue-900"
                                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                                }`}
                              >
                                <div className={`w-6 h-6 rounded-full ${sh.color} text-white flex items-center justify-center`}>
                                  <sh.icon className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-xs">{sh.name}</span>
                              </button>
                            ))}
                          </div>

                          <div className="flex-1 max-w-md bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm h-full flex flex-col justify-center text-left">
                            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">
                              Stakeholder Claim & Values
                            </span>
                            <AnimatePresence mode="wait">
                              <motion.div
                                key={selectedStakeholder}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                              >
                                {selectedStakeholder === "engineer" && (
                                  <>
                                    <h4 className="font-serif font-bold text-lg text-blue-900">The Senior Engineer</h4>
                                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                                      Legally and morally bound by professional licensure. Code imperatives (NSPE, IEEE) demand prioritizing public welfare as paramount. Faces intense pressure from management but cannot delegate professional conscience.
                                    </p>
                                    <div className="mt-3 flex gap-2">
                                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[9px] rounded-full font-bold">Hold Safety Paramount</span>
                                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[9px] rounded-full font-bold">Personal Integrity</span>
                                    </div>
                                  </>
                                )}
                                {selectedStakeholder === "public" && (
                                  <>
                                    <h4 className="font-serif font-bold text-lg text-emerald-800">Premature Infants & Parents</h4>
                                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                                      Completely vulnerable; unable to advocate for themselves. Rely on the respirator's automated alarm system to warn hospital staff of dangerous oxygen drops. Failure to trigger an alarm leads to oxygen deprivation and death.
                                    </p>
                                    <div className="mt-3 flex gap-2">
                                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] rounded-full font-bold">Life & Health</span>
                                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] rounded-full font-bold">Vulnerable Patients</span>
                                    </div>
                                  </>
                                )}
                                {selectedStakeholder === "employer" && (
                                  <>
                                    <h4 className="font-serif font-bold text-lg text-amber-800">MedTech Solutions (Employer)</h4>
                                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                                      Facing severe bankruptcy risk; investors demand a release by next quarter. Believes manual monitoring by nurses will mitigate the 0.1% defect rate. A 6-month delay for a full $2M redesign would sink the firm.
                                    </p>
                                    <div className="mt-3 flex gap-2">
                                      <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[9px] rounded-full font-bold">Company Survival</span>
                                      <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[9px] rounded-full font-bold">Contractual Timelines</span>
                                    </div>
                                  </>
                                )}
                              </motion.div>
                            </AnimatePresence>
                          </div>
                        </div>
                      )}

                      {/* SLIDE 6: Human Impact */}
                      {currentSlide.id === 6 && (
                        <div className="grid grid-cols-2 gap-6 w-full py-2">
                          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col justify-between text-left">
                            <div>
                              <div className="flex items-center space-x-2.5 mb-2">
                                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                                  <Users className="w-4 h-4" />
                                </div>
                                <h4 className="font-serif font-bold text-blue-900">The Human Ethos</h4>
                              </div>
                              <p className="text-xs text-slate-500 leading-relaxed">
                                "With Great Power Comes Great Responsibility." Engineers possess specialized knowledge of complex systems that the public cannot evaluate. We hold a fiduciary relationship with vulnerable patients who trust our designs with their lives.
                              </p>
                            </div>
                            <div className="mt-3 p-2.5 bg-slate-50 rounded-lg border-l-4 border-l-blue-600">
                              <p className="text-[11px] font-serif italic font-bold text-blue-900">
                                "Fiduciary Duty to the Vulnerable"
                              </p>
                            </div>
                          </div>

                          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col justify-between text-left">
                            <div>
                              <div className="flex items-center space-x-2.5 mb-2">
                                <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center">
                                  <AlertTriangle className="w-4 h-4" />
                                </div>
                                <h4 className="font-serif font-bold text-rose-900">Therac-25 Historical Case</h4>
                              </div>
                              <p className="text-xs text-slate-500 leading-relaxed">
                                A software-controlled radiation therapy machine delivered massive, fatal overdoses due to race-condition algorithm defects. The manufacturer dismissed concerns, asserting software failure was mathematically impossible.
                              </p>
                            </div>
                            <div className="mt-3 p-2.5 bg-slate-50 rounded-lg border-l-4 border-l-rose-600">
                              <p className="text-[11px] font-serif italic font-bold text-rose-900">
                                "The assumption 'it can never happen' is fatal."
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SLIDE 7: Step 3 - Consider Options */}
                      {currentSlide.id === 7 && (
                        <div className="grid grid-cols-4 gap-2 w-full py-2">
                          {[
                            {
                              id: 1,
                              title: "Option 1: Release As-Is",
                              desc: "Sign off on software with a known bug. Meets business timelines and saves jobs, but exposes vulnerable infants to death.",
                              color: "border-rose-200 bg-rose-50 text-rose-950",
                              badge: "Unethical"
                            },
                            {
                              id: 2,
                              title: "Option 2: Delay & Fix",
                              desc: "Refuse sign-off until fully fixed. Eliminates infant risk, but likely bankrupts the company, resulting in complete job loss.",
                              color: "border-emerald-200 bg-emerald-50 text-emerald-950",
                              badge: "Ethical but Costly"
                            },
                            {
                              id: 3,
                              title: "Option 3: Creative Middle",
                              desc: "Develop an immediate hospital training/warning protocol and commit to an urgent, fast-tracked software update in 4 weeks.",
                              color: "border-amber-200 bg-amber-50 text-amber-950",
                              badge: "Moral Imagination"
                            },
                            {
                              id: 4,
                              title: "Option 4: Whistleblowing",
                              desc: "Escalate immediately to federal medical regulators if company management attempts to cover up and force the release.",
                              color: "border-slate-200 bg-slate-50 text-slate-950",
                              badge: "Escalation Path"
                            }
                          ].map((o) => (
                            <div
                              key={o.id}
                              className={`border rounded-xl p-3 flex flex-col justify-between text-left shadow-sm hover:scale-[1.01] transition-all ${o.color}`}
                            >
                              <div>
                                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white bg-opacity-80">
                                  {o.badge}
                                </span>
                                <h4 className="font-serif font-bold text-xs mt-2 mb-1">{o.title}</h4>
                                <p className="text-[10px] opacity-90 leading-relaxed">{o.desc}</p>
                              </div>
                              <span className="text-[9px] uppercase tracking-wider font-semibold opacity-60 text-right mt-2">
                                Option {o.id}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* SLIDE 8: Step 4 - Evaluate Using Codes */}
                      {currentSlide.id === 8 && (
                        <div className="grid grid-cols-3 gap-4 w-full py-2">
                          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col justify-between text-left">
                            <div>
                              <div className="flex items-center space-x-2.5 mb-2">
                                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                                  <Gavel className="w-4 h-4" />
                                </div>
                                <h4 className="font-serif font-bold text-blue-900">NSPE Code</h4>
                              </div>
                              <p className="text-xs text-slate-500 leading-relaxed">
                                "Engineers shall hold paramount the safety, health, and welfare of the public in the performance of their professional duties." If judgment is overruled under dangerous conditions, they must notify authority.
                              </p>
                            </div>
                            <div className="mt-3 p-2 bg-slate-50 rounded-lg border-l-4 border-l-blue-600">
                              <p className="text-[10px] font-serif italic font-bold text-blue-900">
                                "Safety is Paramount"
                              </p>
                            </div>
                          </div>

                          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col justify-between text-left">
                            <div>
                              <div className="flex items-center space-x-2.5 mb-2">
                                <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center">
                                  <Activity className="w-4 h-4" />
                                </div>
                                <h4 className="font-serif font-bold text-slate-800">IEEE Code</h4>
                              </div>
                              <p className="text-xs text-slate-500 leading-relaxed">
                                "To accept responsibility in making engineering decisions consistent with the safety, health, and welfare of the public, and to disclose promptly factors that might endanger the public."
                              </p>
                            </div>
                            <div className="mt-3 p-2 bg-slate-50 rounded-lg border-l-4 border-l-slate-800">
                              <p className="text-[10px] font-serif italic font-bold text-slate-900">
                                "Promptly Disclose Risks"
                              </p>
                            </div>
                          </div>

                          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col justify-between text-left">
                            <div>
                              <div className="flex items-center space-x-2.5 mb-2">
                                <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center">
                                  <Code className="w-4 h-4" />
                                </div>
                                <h4 className="font-serif font-bold text-amber-900">ACM / IEEE Software</h4>
                              </div>
                              <p className="text-xs text-slate-500 leading-relaxed">
                                "Approve software only if they have a well-founded belief that it is safe, meets specifications, passes appropriate tests, and does not diminish quality of life or harm others."
                              </p>
                            </div>
                            <div className="mt-3 p-2 bg-slate-50 rounded-lg border-l-4 border-l-amber-500">
                              <p className="text-[10px] font-serif italic font-bold text-amber-900">
                                "Only Approve Safe Software"
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SLIDE 9: Using the ETHICS PLUS & Line Drawing Model */}
                      {currentSlide.id === 9 && (
                        <div className="flex flex-col gap-3 w-full">
                          <div className="flex justify-between items-center bg-slate-100 p-2.5 rounded-xl">
                            <span className="text-xs font-bold text-slate-500">Configure Line Drawing Scenario:</span>
                            <div className="flex space-x-1 bg-white p-0.5 rounded-lg border border-slate-200">
                              {[
                                { id: "opt1", label: "Option 1 (Release)" },
                                { id: "opt2", label: "Option 2 (Delay)" },
                                { id: "opt3", label: "Option 3 (Middle)" }
                              ].map((btn) => (
                                <button
                                  key={btn.id}
                                  onClick={() => setLineDrawingOption(btn.id as any)}
                                  className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${
                                    lineDrawingOption === btn.id
                                      ? "bg-blue-600 text-white shadow-sm"
                                      : "text-slate-500 hover:text-slate-800"
                                  }`}
                                >
                                  {btn.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Sliders Grid for Line Drawing dimensions */}
                          <div className="grid grid-cols-3 gap-4">
                            {[
                              {
                                label: "Risk to Infant Patients",
                                min: "Extreme Risk",
                                max: "No Risk",
                                val: lineDrawingOption === "opt1" ? ldPublicRisk.opt1 : lineDrawingOption === "opt2" ? ldPublicRisk.opt2 : ldPublicRisk.opt3,
                                setter: (val: number) => {
                                  if (lineDrawingOption === "opt1") setLdPublicRisk(p => ({ ...p, opt1: val }));
                                  if (lineDrawingOption === "opt2") setLdPublicRisk(p => ({ ...p, opt2: val }));
                                  if (lineDrawingOption === "opt3") setLdPublicRisk(p => ({ ...p, opt3: val }));
                                }
                              },
                              {
                                label: "Professional Code Compliance",
                                min: "Violates Code",
                                max: "Fully Follows",
                                val: lineDrawingOption === "opt1" ? ldCompliance.opt1 : lineDrawingOption === "opt2" ? ldCompliance.opt2 : ldCompliance.opt3,
                                setter: (val: number) => {
                                  if (lineDrawingOption === "opt1") setLdCompliance(p => ({ ...p, opt1: val }));
                                  if (lineDrawingOption === "opt2") setLdCompliance(p => ({ ...p, opt2: val }));
                                  if (lineDrawingOption === "opt3") setLdCompliance(p => ({ ...p, opt3: val }));
                                }
                              },
                              {
                                label: "Mitigation Feasibility",
                                min: "Unfeasible",
                                max: "Highly Feasible",
                                val: lineDrawingOption === "opt1" ? ldCost.opt1 : lineDrawingOption === "opt2" ? ldCost.opt2 : ldCost.opt3,
                                setter: (val: number) => {
                                  if (lineDrawingOption === "opt1") setLdCost(p => ({ ...p, opt1: val }));
                                  if (lineDrawingOption === "opt2") setLdCost(p => ({ ...p, opt2: val }));
                                  if (lineDrawingOption === "opt3") setLdCost(p => ({ ...p, opt3: val }));
                                }
                              }
                            ].map((sli, idx) => (
                              <div key={idx} className="bg-white border border-slate-150 p-2.5 rounded-xl shadow-sm text-left flex flex-col justify-between">
                                <span className="text-[10px] font-bold text-slate-400 uppercase">{sli.label}</span>
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  value={sli.val}
                                  onChange={(e) => sli.setter(Number(e.target.value))}
                                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 my-2"
                                />
                                <div className="flex justify-between text-[9px] text-slate-400 font-semibold uppercase">
                                  <span>{sli.min}</span>
                                  <span className="text-blue-600 font-bold">{sli.val}%</span>
                                  <span>{sli.max}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* SLIDE 10: Step 5 - Making the Decision */}
                      {currentSlide.id === 10 && (
                        <div className="grid grid-cols-12 gap-6 w-full py-1 text-left items-stretch">
                          {/* Left: Recommended Action Document */}
                          <div className="col-span-6 relative border-2 border-dashed border-emerald-600 p-4 rounded-xl bg-emerald-50/20 flex flex-col justify-between shadow-sm">
                            {/* Approved Stamp */}
                            <div className="absolute top-3 right-3 border-2 border-emerald-600 text-emerald-600 px-2 py-0.5 text-[9px] font-black tracking-widest rounded rotate-12 transform uppercase select-none opacity-85">
                              Approved Path
                            </div>
                            <div>
                              <div className="flex items-center space-x-1.5 mb-1.5">
                                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                                <h4 className="font-serif font-bold text-emerald-950 text-sm">Option 3: Safe Mitigation</h4>
                              </div>
                              <ul className="text-[10px] text-slate-600 space-y-1.5 list-disc pl-3 leading-normal">
                                <li><strong>Document Everything:</strong> Create a clear, formal technical and ethical paper trail.</li>
                                <li><strong>Refuse Release:</strong> Stand firm against unconditional release until safety is assured.</li>
                                <li><strong>Interim Protocol:</strong> Propose temporary clinical manuals for hospital staff.</li>
                                <li><strong>Fast-Track Redesign:</strong> Commit to delivering a fully-tested software fix in 4 weeks.</li>
                              </ul>
                            </div>
                            <div className="pt-2 border-t border-slate-200 text-[8px] text-slate-400 font-bold uppercase flex justify-between mt-2">
                              <span>Moral Imagination</span>
                              <span>ACM/NSPE Aligned</span>
                            </div>
                          </div>

                          {/* Right: Moral Justifications */}
                          <div className="col-span-6 flex flex-col gap-3 justify-between">
                            <div className="bg-blue-50/50 p-3.5 rounded-xl border border-blue-100 flex-1 flex flex-col justify-between">
                              <div>
                                <h4 className="font-serif font-bold text-blue-950 text-xs mb-0.5">Utilitarian Calculus</h4>
                                <p className="text-[10px] text-slate-600 leading-normal">
                                  Infant mortality and brain damage from hypoxia are infinite harms. They completely outweigh commercial delays, $2M upgrade costs, or investor bankruptcy risks.
                                </p>
                              </div>
                              <span className="text-[8px] font-bold text-blue-800 uppercase tracking-wider mt-1 bg-blue-100 px-2 py-0.5 rounded w-fit">
                                Aggregate Well-Being
                              </span>
                            </div>

                            <div className="bg-amber-50/50 p-3.5 rounded-xl border border-amber-100 flex-1 flex flex-col justify-between">
                              <div>
                                <h4 className="font-serif font-bold text-amber-950 text-xs mb-0.5">Kantian Deontology</h4>
                                <p className="text-[10px] text-slate-600 leading-normal">
                                  Vulnerable babies cannot be treated as a means to corporate solvency. The engineer has an unconditional categorical duty to uphold clinical product safety.
                                </p>
                              </div>
                              <span className="text-[8px] font-bold text-amber-800 uppercase tracking-wider mt-1 bg-amber-100 px-2 py-0.5 rounded w-fit">
                                Categorical Imperative
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SLIDE 11: Limitations of Codes & Professional Reflection */}
                      {currentSlide.id === 11 && (
                        <div className="flex flex-col md:flex-row gap-6 items-center w-full justify-around h-full">
                          <div className="max-w-xs space-y-3 text-left">
                            <h4 className="font-serif font-bold text-[#1E293B]">Professional Reflection:</h4>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => setActiveSdg(7)}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                                  activeSdg === 7
                                    ? "bg-amber-500 text-white shadow"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                }`}
                              >
                                Limits of Codes
                              </button>
                              <button
                                onClick={() => setActiveSdg(9)}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                                  activeSdg === 9
                                    ? "bg-blue-600 text-white shadow"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                }`}
                              >
                                The Cost of Silence
                              </button>
                            </div>
                            <AnimatePresence mode="wait">
                              <motion.p
                                key={activeSdg}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-xs text-slate-500 leading-relaxed min-h-[48px]"
                              >
                                {activeSdg === 7
                                  ? "Codes are written in general language and cannot replace individual moral responsibility. They sometimes trigger conflicting duties (employer loyalty vs. public safety)."
                                  : "Ignoring known defects and choosing silence is a direct act of negligence. Good intentions cannot cover up the physical tragedy of an infant respirator failing to sound."}
                              </motion.p>
                            </AnimatePresence>
                          </div>

                          <div className="relative w-44 h-44 bg-white border border-slate-200 rounded-full shadow-inner flex items-center justify-center">
                            <div className="absolute top-4 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow">
                              Conscience
                            </div>
                            <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow">
                              Safety
                            </div>
                            <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shadow">
                              Integrity
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mt-1">
                              Conscience
                            </span>
                          </div>
                        </div>
                      )}

                      {/* SLIDE 12: Conclusion & Key Takeaways */}
                      {currentSlide.id === 12 && (
                        <div className="grid grid-cols-12 gap-6 w-full h-full max-h-[220px] overflow-y-auto py-1 text-left items-start">
                          {/* Left: Key Takeaways */}
                          <div className="col-span-5 border border-slate-200 p-4 rounded-xl bg-slate-50/80 h-full flex flex-col justify-between shadow-sm">
                            <div>
                              <h4 className="font-serif font-bold text-slate-900 text-xs mb-2">Presentation Takeaways</h4>
                              <ul className="text-[9px] text-slate-600 space-y-1.5 list-disc pl-3.5 leading-normal">
                                <li><strong>Public Safety Paramount:</strong> Safety is always the engineer's first priority, transcending economic interests.</li>
                                <li><strong>Group Code Backing:</strong> Professional codes offer powerful support to defend ethical actions.</li>
                                <li><strong>Conscience is Personal:</strong> Safety accountability cannot be delegated or signed away.</li>
                                <li><strong>Moral Imagination:</strong> Proactively find creative options that merge technical precision with ethics.</li>
                                <li><strong>Integrity is Your Asset:</strong> Guard your licensure, public trust, and conscience.</li>
                              </ul>
                            </div>
                            <div className="pt-2 border-t border-slate-200 text-[8px] text-slate-400 font-bold uppercase mt-2">
                              EEE 2215 Engineering Ethics
                            </div>
                          </div>

                          {/* Right side: Interactive Q&A Accordion */}
                          <div className="col-span-7 flex flex-col gap-1.5 overflow-y-auto h-full pr-1">
                            {[
                              {
                                id: 1,
                                q: "What if the CEO threatens retaliation?",
                                a: "Document all safety disclosures and conversations to form a secure paper trail. Citing NSPE/IEEE codes of conduct shields you under legal whistleblower safety guidelines."
                              },
                              {
                                id: 2,
                                q: "Is manual monitoring a safe fallback?",
                                a: "No. Relying on manually overwhelmed clinical staff to back up a critical respirator bug is professional negligence under product liability law. The alarm must work."
                              },
                              {
                                id: 3,
                                q: "What if MedTech goes bankrupt?",
                                a: "Restructuring a business is highly feasible under corporate laws. But a dead or severely disabled infant cannot be recovered. Safety remains the absolute baseline."
                              },
                              {
                                id: 4,
                                q: "How does Option 3 balance the conflict?",
                                a: "It shows moral imagination: refusing dangerous releases while immediately mitigating risk with clinical alerts and fast-tracking code fixes, delaying only slightly."
                              }
                            ].map((item) => {
                              const isSelected = activeQaId === item.id;
                              return (
                                <button
                                  key={item.id}
                                  onClick={() => setActiveQaId(isSelected ? null : item.id)}
                                  className={`text-left p-2 rounded-lg border transition-all flex flex-col justify-between ${
                                    isSelected
                                      ? "bg-slate-100 border-blue-600 text-slate-800 shadow-sm"
                                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                                  }`}
                                >
                                  <div className="flex justify-between items-center w-full">
                                    <span className="text-[10px] font-serif font-bold pr-3 leading-tight text-slate-800">{item.q}</span>
                                    <ChevronDown className={`w-3 h-3 shrink-0 transition-transform text-slate-400 ${isSelected ? "rotate-180" : ""}`} />
                                  </div>
                                  {isSelected && (
                                    <p className="text-[9px] text-slate-600 mt-1.5 leading-normal bg-white p-2 rounded border border-slate-150">
                                      {item.a}
                                    </p>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* 3. Footer / Progress Indicator */}
                <div className="flex items-center justify-between border-t border-slate-200/10 pt-4 text-[10px] text-slate-400">
                  <div className="flex items-center space-x-2">
                    <span className="font-serif font-bold">Neonatal Respirator Case Study</span>
                    <span>·</span>
                    <span>Clinical MedTech Ethics</span>
                  </div>
                  <div className="font-bold">
                    Slide {currentSlide.id} of {SLIDES.length}
                  </div>
                </div>
              </div>

              {/* SLIDE CONTROLLER FOOTER BAR */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
                <button
                  onClick={prevSlide}
                  disabled={currentSlideIndex === 0}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-700 font-bold rounded-lg text-xs transition-all flex items-center space-x-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Slide</span>
                </button>

                {/* Bullets mapping */}
                <div className="hidden sm:flex space-x-1.5">
                  {SLIDES.map((slide, idx) => (
                    <button
                      key={slide.id}
                      onClick={() => setCurrentSlideIndex(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        idx === currentSlideIndex
                          ? "bg-blue-600 scale-125"
                          : "bg-slate-250 hover:bg-slate-300"
                      }`}
                      title={slide.title}
                    />
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  disabled={currentSlideIndex === SLIDES.length - 1}
                  className="px-4 py-2 bg-[#1E293B] hover:bg-[#0F172A] disabled:opacity-50 text-white font-bold rounded-lg text-xs transition-all flex items-center space-x-1 cursor-pointer"
                >
                  <span>Next Slide</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* SPEAKER NOTES PANEL */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm text-left">
                <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                      Speaker Delivery Notes
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowNotes(!showNotes)}
                    className="text-xs text-blue-600 font-bold hover:underline"
                  >
                    {showNotes ? "Hide Notes" : "Show Notes"}
                  </button>
                </div>

                {showNotes && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-3"
                  >
                    <div className="bg-blue-50 text-blue-900 p-3 rounded-lg border border-blue-200 text-xs leading-relaxed flex items-start gap-2">
                      <Info className="w-4 h-4 shrink-0 mt-0.5" />
                      <div>
                        <strong>Speaking Guide (2.5-min focus):</strong> This slide belongs to{" "}
                        <strong className="underline">{currentSlide.speaker}</strong>. Keep tone analytical, objective, and reference relevant codes.
                      </div>
                    </div>
                    <p className="text-sm font-serif italic text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100 leading-relaxed shadow-inner">
                      "{currentSlide.notes}"
                    </p>
                  </motion.div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* FULL SPEAKER SCRIPT OUTLINE Tab */}
        {activeTab === "outline" && (
          <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-sm text-left space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl md:text-2xl font-serif font-bold text-[#1E293B]">
                Full Presentation Outline & Team Speaking Script
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Perfect resource for printouts, review, and coordinate individual deliveries.
              </p>
            </div>

            <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
              {SLIDES.map((slide) => (
                <div key={slide.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-[10px] font-bold bg-[#1E293B] text-white px-2 py-0.5 rounded">
                      Slide {slide.id} · {slide.kicker}
                    </span>
                    <span className="text-[10px] font-bold bg-amber-500 text-white px-2 py-0.5 rounded">
                      Speaker: {slide.speaker}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-slate-800 text-sm md:text-base">{slide.title}</h3>
                  <div className="bg-white p-3.5 rounded-lg border border-slate-150 text-xs text-slate-600 leading-relaxed italic font-serif">
                    "{slide.notes}"
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TEAM PRACTICE TIMER Tab */}
        {activeTab === "practice" && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Left: Overall Practice Clock */}
            <div className="md:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-sm text-center flex flex-col gap-5">
              <h2 className="text-xs font-bold text-slate-400 tracking-wider uppercase">
                Presentation Master Clock
              </h2>

              <div className="bg-slate-50 border border-slate-100 py-6 rounded-2xl">
                <span className="text-4xl font-mono font-bold text-[#1E293B] tracking-widest">
                  {formatTime(overallTime)}
                </span>
                <p className="text-[10px] text-slate-400 uppercase mt-1">Total Elapsed Time (10 Min Max)</p>
              </div>

              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => setOverallRunning(!overallRunning)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    overallRunning ? "bg-rose-600 text-white" : "bg-emerald-600 text-white"
                  }`}
                >
                  {overallRunning ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>Pause Presentation</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>Start Presentation</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    setOverallTime(0);
                    setOverallRunning(false);
                  }}
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Speaker spot countdown controller */}
            <div className="md:col-span-8 bg-white border border-slate-200 rounded-xl p-5 shadow-sm text-left flex flex-col gap-5">
              <div>
                <h2 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-1">
                  Individual Speaker Spot pacing (2.5 mins per member)
                </h2>
                <p className="text-xs text-slate-500">
                  Select a team speaker to configure and monitor their 2.5-minute spot pacing.
                </p>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((num) => {
                  const sp = SPEAKERS_DATA[num];
                  const isActive = activeSpeakerTimer === num;
                  return (
                    <button
                      key={num}
                      onClick={() => handleSelectSpeakerTimer(num)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        isActive
                          ? "border-blue-600 bg-blue-50 font-bold text-blue-900"
                          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <span className="text-[10px] block uppercase text-slate-400">Speaker</span>
                      <span className="text-xs font-serif">{sp.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Countdown panel */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h4 className="font-serif font-bold text-slate-800 text-base">
                    {SPEAKERS_DATA[activeSpeakerTimer].name} : Spot Pacing
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm leading-relaxed mt-1">
                    Topic: {SPEAKERS_DATA[activeSpeakerTimer].role}
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <span className="text-3xl font-mono font-bold text-blue-600">
                      {formatTime(timerTime)}
                    </span>
                    <p className="text-[9px] text-slate-400 uppercase">Speaker Clock</p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <button
                      onClick={() => setTimerRunning(!timerRunning)}
                      className={`p-2 rounded-full text-white ${
                        timerRunning ? "bg-rose-600" : "bg-blue-600"
                      }`}
                    >
                      {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => {
                        setTimerTime(150);
                        setTimerRunning(false);
                      }}
                      className="p-2 bg-slate-200 hover:bg-slate-300 text-slate-600 rounded-full text-center flex items-center justify-center"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* FOOTER ACCENTS */}
      <footer className="bg-[#1E293B] text-slate-400 py-6 border-t border-slate-700 px-6 text-center text-xs mt-auto">
        <p>© 2026 Clinical Medical Ethics Group presentation tool. Developed under engineering ethics curriculum parameters.</p>
        <p className="text-slate-500 mt-1 font-mono">
          Strictly engineered according to professional code guides (IEEE, ACM, NSPE) for clinical safety rubric optimization.
        </p>
      </footer>
    </div>
  );
}
