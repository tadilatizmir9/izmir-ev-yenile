import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load pages
const BanyoTadilati = lazy(() => import("./pages/BanyoTadilati"));
const MutfakTadilati = lazy(() => import("./pages/MutfakTadilati"));
const KompleEvTadilati = lazy(() => import("./pages/KompleEvTadilati"));
const IcMimarlik = lazy(() => import("./pages/IcMimarlik"));
const BornovaTadilat = lazy(() => import("./pages/BornovaTadilat"));
const KarsiyakaTadilat = lazy(() => import("./pages/KarsiyakaTadilat"));
const BucaTadilat = lazy(() => import("./pages/BucaTadilat"));
const KonakTadilat = lazy(() => import("./pages/KonakTadilat"));
const AlsancakTadilat = lazy(() => import("./pages/AlsancakTadilat"));
const GaziemirTadilat = lazy(() => import("./pages/GaziemirTadilat"));
const MavisehirTadilat = lazy(() => import("./pages/MavisehirTadilat"));
const NarlidereTadilat = lazy(() => import("./pages/NarlidereTadilat"));
const UrlaTadilat = lazy(() => import("./pages/UrlaTadilat"));
const CesmeTadilat = lazy(() => import("./pages/CesmeTadilat"));
const GuzelbahceTadilat = lazy(() => import("./pages/GuzelbahceTadilat"));
const BayrakliTadilat = lazy(() => import("./pages/BayrakliTadilat"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const AdminAuth = lazy(() => import("./pages/AdminAuth"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminContact = lazy(() => import("./pages/admin/AdminContact"));
const AdminBlog = lazy(() => import("./pages/admin/AdminBlog"));
const AdminPages = lazy(() => import("./pages/admin/AdminPages"));

const queryClient = new QueryClient();

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/banyo-tadilati" element={<BanyoTadilati />} />
            <Route path="/mutfak-tadilati" element={<MutfakTadilati />} />
            <Route path="/komple-ev-tadilati" element={<KompleEvTadilati />} />
            <Route path="/ic-mimarlik" element={<IcMimarlik />} />
            <Route path="/bornova-tadilat" element={<BornovaTadilat />} />
            <Route path="/karsiyaka-tadilat" element={<KarsiyakaTadilat />} />
            <Route path="/buca-tadilat" element={<BucaTadilat />} />
            <Route path="/konak-tadilat" element={<KonakTadilat />} />
            <Route path="/alsancak-tadilat" element={<AlsancakTadilat />} />
            <Route path="/gaziemir-tadilat" element={<GaziemirTadilat />} />
            <Route path="/mavisehir-tadilat" element={<MavisehirTadilat />} />
            <Route path="/narlidere-tadilat" element={<NarlidereTadilat />} />
            <Route path="/urla-tadilat" element={<UrlaTadilat />} />
            <Route path="/cesme-tadilat" element={<CesmeTadilat />} />
            <Route path="/guzelbahce-tadilat" element={<GuzelbahceTadilat />} />
            <Route path="/bayrakli-tadilat" element={<BayrakliTadilat />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />

            {/* Admin Routes */}
            <Route path="/admin/auth" element={<AdminAuth />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="contact" element={<AdminContact />} />
              <Route path="blog" element={<AdminBlog />} />
              <Route path="pages" element={<AdminPages />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
