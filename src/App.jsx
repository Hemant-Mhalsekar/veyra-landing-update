import { useEffect, useRef, useState } from "react";
import { LangProvider, useLang } from "./context/LangContext";
import { POPUP_DELAY } from "./constants/translations";
import { launchConfetti } from "./components/shared/Confetti";

import Navbar        from "./components/Navbar";
import LaunchTimer   from "./components/LaunchTimer";
import Hero          from "./components/sections/Hero";
import SnackProducts from "./components/sections/SnackProducts";
import SnackProblem  from "./components/sections/SnackProblem";
import UseCases      from "./components/sections/UseCases";
import Transform     from "./components/sections/Transform";
import EarlyAccess   from "./components/sections/EarlyAccess";
import Footer        from "./components/sections/Footer";

import WhatsAppModal from "./components/modals/WhatsAppModal";
import WaitlistModal from "./components/modals/WaitlistModal";
import SuccessDialog from "./components/shared/SuccessDialog";
import ErrorDialog   from "./components/shared/ErrorDialog";

import "./index.css";

// ---------------------------------------------------------------------------
// Inner app — consumes LangContext for isTransitioning
// ---------------------------------------------------------------------------
function AppInner() {
  const { isTransitioning } = useLang();

  const [showWaitlist,  setShowWaitlist]  = useState(false);
  const [showWhatsApp,  setShowWhatsApp]  = useState(false);
  const [showSuccess,   setShowSuccess]   = useState(false);
  const [showError,     setShowError]     = useState(false);

  const earlyAccessRef = useRef(null);

  // ── Auto-open waitlist popup after POPUP_DELAY ──
  useEffect(() => {
    const id = setTimeout(() => setShowWaitlist(true), POPUP_DELAY);
    return () => clearTimeout(id);
  }, []);

  // ── Scroll progress bar ──
  useEffect(() => {
    function onScroll() {
      const scrolled = window.scrollY;
      const total    = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? scrolled / total : 0;
      document.documentElement.style.setProperty("--scroll-progress", String(progress));
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Handlers ──
  function handleScrollToEarlyAccess() {
    const el = document.getElementById("early-access");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // Focus and glow the email input after scroll settles
      setTimeout(() => {
        const input = document.getElementById("early-access-email");
        if (input) {
          input.focus();
          input.style.boxShadow    = "0 0 0 4px rgba(214,192,111,0.30)";
          input.style.borderColor  = "rgba(214,192,111,0.7)";
          setTimeout(() => {
            input.style.boxShadow   = "";
            input.style.borderColor = "";
          }, 1800);
        }
      }, 700);
    }
  }

  function handleOpenWhatsApp() {
    setShowWhatsApp(true);
  }

  function handleOpenWaitlist() {
    setShowWaitlist(true);
  }

  function handleSuccess() {
    setShowSuccess(true);
    launchConfetti();
  }

  return (
    <>
      {/* Scroll progress bar */}
      <div
        aria-hidden
        style={{
          position:   "fixed",
          top:        0,
          left:       0,
          zIndex:     99999,
          height:     "3px",
          width:      "calc(var(--scroll-progress, 0) * 100%)",
          background: "linear-gradient(90deg, #d6c06f, #f6e6a1, #bfa24a)",
          pointerEvents: "none",
          transition: "width 0.1s linear",
        }}
      />

      {/* Page content — fades during lang switch */}
      <div
        style={{
          opacity:    isTransitioning ? 0 : 1,
          transition: "opacity 0.2s ease",
        }}
      >
        <Navbar />
        <LaunchTimer />

        <main>
          <Hero
            onScrollToEarlyAccess={handleScrollToEarlyAccess}
            onOpenWaitlist={handleOpenWaitlist}
          />
          <SnackProducts />
          <SnackProblem />
          <UseCases />
          <Transform />
          <EarlyAccess onOpenWhatsApp={handleOpenWhatsApp} />
        </main>

        <Footer />
      </div>

      {/* Modals & dialogs — outside the fading wrapper so they don't flicker */}
      <WaitlistModal
        isOpen={showWaitlist}
        onClose={() => setShowWaitlist(false)}
        onSuccess={handleSuccess}
      />
      <WhatsAppModal
        isOpen={showWhatsApp}
        onClose={() => setShowWhatsApp(false)}
        onSuccess={handleSuccess}
      />
      <SuccessDialog
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
      <ErrorDialog
        isOpen={showError}
        onClose={() => setShowError(false)}
      />
    </>
  );
}

// ---------------------------------------------------------------------------
// Root — LangProvider wraps everything
// ---------------------------------------------------------------------------
export default function App() {
  return (
    <LangProvider>
      <AppInner />
    </LangProvider>
  );
}
