import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { UIProvider } from "@/contexts/UIContext";
import Index from "./pages/Index";
import PrayerPage from "./pages/PrayerPage";
import LearnPage from "./pages/LearnPage";
import LessonViewPage from "./pages/LessonViewPage";
import SurahDetailPage from "./pages/SurahDetailPage";
import DuaDetailPage from "./pages/DuaDetailPage";
import ZikirmatikPage from "./pages/ZikirmatikPage";
import ZikirListPage from "./pages/ZikirListPage";
import QuizPage from "./pages/QuizPage";
import QiblaPage from "./pages/QiblaPage";
import HistoryPage from "./pages/HistoryPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <UIProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/prayer" element={<PrayerPage />} />
                <Route path="/learn" element={<LearnPage />} />
                <Route path="/learn/lesson/:id" element={<LessonViewPage />} />
                <Route path="/learn/surah/:id" element={<SurahDetailPage />} />
                <Route path="/learn/dua/:id" element={<DuaDetailPage />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/qibla" element={<QiblaPage />} />
                <Route path="/zikirmatik" element={<ZikirmatikPage />} />
                <Route path="/zikirmatik/list" element={<ZikirListPage />} />
                <Route path="/history" element={<HistoryPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </UIProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
