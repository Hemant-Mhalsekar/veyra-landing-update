import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COUNTRIES } from "../../constants/translations";

export default function CountrySelector({ value, onChange }) {
  const [isOpen,  setIsOpen]  = useState(false);
  const [search,  setSearch]  = useState("");
  const containerRef           = useRef(null);

  const selected = COUNTRIES.find((c) => c.code === value) ?? COUNTRIES[0];

  const filtered = COUNTRIES.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // Close on outside click
  useEffect(() => {
    function handleMouseDown(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

  function handleSelect(code) {
    onChange(code);
    setIsOpen(false);
    setSearch("");
  }

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", flexShrink: 0 }}
    >
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        style={{
          display:         "flex",
          alignItems:      "center",
          gap:             "0.4rem",
          height:          "48px",
          padding:         "0 0.85rem",
          background:      "rgba(255,255,255,0.08)",
          border:          "1px solid rgba(255,255,255,0.12)",
          borderRadius:    "0.75rem",
          color:           "#fff",
          fontSize:        "0.9rem",
          fontWeight:      500,
          cursor:          "pointer",
          whiteSpace:      "nowrap",
          userSelect:      "none",
        }}
      >
        <span>{selected.label}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ display: "flex", alignItems: "center", opacity: 0.7 }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            style={{
              position:        "absolute",
              top:             "calc(100% + 6px)",
              left:            0,
              zIndex:          1000,
              background:      "#1a1a1a",
              border:          "1px solid rgba(255,255,255,0.12)",
              borderRadius:    "0.75rem",
              padding:         "0.5rem",
              minWidth:        "200px",
              boxShadow:       "0 8px 32px rgba(0,0,0,0.5)",
            }}
          >
            {/* Search */}
            <input
              autoFocus
              type="text"
              placeholder="Search…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width:           "100%",
                boxSizing:       "border-box",
                background:      "rgba(255,255,255,0.06)",
                border:          "1px solid rgba(255,255,255,0.1)",
                borderRadius:    "0.5rem",
                padding:         "0.45rem 0.65rem",
                color:           "#fff",
                fontSize:        "0.85rem",
                marginBottom:    "0.4rem",
                outline:         "none",
              }}
            />

            {/* List */}
            {filtered.length === 0 ? (
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem",
                          padding: "0.4rem 0.5rem", margin: 0 }}>
                No results
              </p>
            ) : (
              filtered.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => handleSelect(c.code)}
                  style={{
                    display:         "flex",
                    alignItems:      "center",
                    gap:             "0.5rem",
                    width:           "100%",
                    padding:         "0.5rem 0.65rem",
                    background:      c.code === value
                                       ? "rgba(214,192,111,0.15)"
                                       : "transparent",
                    border:          "none",
                    borderRadius:    "0.5rem",
                    color:           c.code === value ? "#d6c06f" : "#fff",
                    fontSize:        "0.9rem",
                    fontWeight:      c.code === value ? 600 : 400,
                    cursor:          "pointer",
                    textAlign:       "left",
                  }}
                >
                  <span>{c.label}</span>
                  <span style={{ opacity: 0.6, fontSize: "0.8rem" }}>{c.name}</span>
                </button>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
