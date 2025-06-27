import React from "react";

/**
 * Header component that displays the application logo and title.
 * Accessibility: Adds banner role, alt text, and descriptive hint.
 * Includes modern SVG logo and app name.
 */
// PUBLIC_INTERFACE
function Header() {
  return (
    <header className="header-bar" role="banner" aria-label="Application Header">
      {/* App logo: simple SVG ball/TV sports style, decorative aria-hidden */}
      <span
        style={{ marginRight: 16, display: "inline-flex", alignItems: "center" }}
        aria-hidden="true"
      >
        <svg
          width="38"
          height="38"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Sports TV Guide Logo"
          focusable="false"
        >
          <circle cx="18" cy="18" r="18" fill="url(#appgrad)" />
          <circle cx="18" cy="18" r="11" fill="#fff" opacity="0.93" />
          <ellipse
            cx="18"
            cy="18"
            rx="6"
            ry="10"
            fill="none"
            stroke="#F59E42"
            strokeWidth="2"
          />
          <rect
            x="13"
            y="11"
            width="10"
            height="4"
            rx="2"
            fill="#1E3A8A"
            opacity="0.8"
          />
          <text
            x="18"
            y="29"
            textAnchor="middle"
            fontWeight="bold"
            fontFamily="Segoe UI"
            fontSize="7"
            fill="#1E3A8A"
          >
            TV
          </text>
          <defs>
            <linearGradient
              id="appgrad"
              x1="0"
              y1="0"
              x2="36"
              y2="36"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1e3a8a" />
              <stop offset="1" stopColor="#f59e42" />
            </linearGradient>
          </defs>
        </svg>
      </span>
      <h1
        className="header-title"
        tabIndex={0}
        aria-label="Sports TV Guide Chatbot, Home"
        style={{
          margin: 0,
          fontSize: "1.75rem",
          fontWeight: 800,
          letterSpacing: "0.01em",
          color: "var(--primary)",
          outline: "none",
        }}
      >
        Sports TV Guide Chatbot
      </h1>
      {/* Visually hidden: shortcut/system hint for screen readers */}
      <span className="sr-only" style={{
        display: "none"
      }}>
        Home. Use navigation links to access chat, TV guide, or settings.
      </span>
    </header>
  );
}

export default Header;
