
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Questionnaire from "./pages/Questionnaire";
import Categories from "./pages/Categories";
import CategoryDetail from "./pages/CategoryDetail";
import Documents from "./pages/Documents";
import FAQ from "./pages/FAQ";
import LegalGuide from "./pages/LegalGuide";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/questionnaire" element={<Questionnaire />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:categoryId" element={<CategoryDetail />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/guide/:guideId" element={<LegalGuide />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
