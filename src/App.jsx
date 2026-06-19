import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import ScrollReveal from "./components/common/ScrollReveal";
import CustomCursor from "./components/common/CustomCursor";
import PageTransition from "./components/common/PageTransition";
import FloatingActions from "./components/common/FloatingActions";

const Home = lazy(() => import("./pages/Home"));
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
                <Route path="/about" element={<Navigate to={{ pathname: "/", hash: "about" }} replace />} />
                <Route path="/services" element={<Navigate to={{ pathname: "/", hash: "services" }} replace />} />
                <Route path="/solutions" element={<Navigate to={{ pathname: "/", hash: "services" }} replace />} />
                <Route path="/contact" element={<Navigate to={{ pathname: "/", hash: "contact" }} replace />} />
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
