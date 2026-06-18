import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import ScrollReveal from "./components/common/ScrollReveal";
import CustomCursor from "./components/common/CustomCursor";
import PageTransition from "./components/common/PageTransition";
import FloatingActions from "./components/common/FloatingActions";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Solutions = lazy(() => import("./pages/Solutions"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

const PageLoader = () => (
  <div className="page-loader" role="status" aria-label="Loading">
    <div className="page-loader__ring" />
    <span className="visually-hidden">Loading...</span>
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="app-shell">
          <div className="ambient-glow ambient-glow--blue" aria-hidden="true" />
          <div className="ambient-glow ambient-glow--violet" aria-hidden="true" />
          <CustomCursor />
          <ScrollToTop />
          <ScrollReveal />
          <PageTransition />
          <a href="#main-content" className="skip-link">Skip to main content</a>
          <Header />
          <main id="main-content">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/solutions" element={<Solutions />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <FloatingActions />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
