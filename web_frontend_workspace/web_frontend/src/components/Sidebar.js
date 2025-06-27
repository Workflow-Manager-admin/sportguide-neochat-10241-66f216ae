import React, { useCallback, useState } from "react";

/**
 * Sidebar component for navigation sections.
 * Accessible: Includes ARIA labels, keyboard navigation, and descriptive roles.
 * Sample navigation: Chat, TV Guide, Settings.
 */
// PUBLIC_INTERFACE
function Sidebar() {
  // Highlight "Chat" as default for sample purposes
  const navItems = [
    { name: "Chat", href: "#chat", ariaLabel: "Go to chat section" },
    { name: "TV Guide", href: "#tvguide", ariaLabel: "Go to TV guide section" },
    { name: "Settings", href: "#settings", ariaLabel: "Go to settings section" }
  ];
  const [activeIdx, setActiveIdx] = useState(0);

  // Handle keyboard navigation between navigation items
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((prev) =>
          e.key === "ArrowDown"
            ? (prev + 1) % navItems.length
            : (prev - 1 + navItems.length) % navItems.length
        );
      }
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        document.getElementById(`sidebar-nav-${activeIdx}`)?.click();
      }
    },
    [activeIdx, navItems.length]
  );

  return (
    <aside className="sidebar" role="complementary" aria-label="Main Navigation Sidebar">
      <nav aria-label="App Navigation">
        <ul
          role="menu"
          aria-orientation="vertical"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          style={{ outline: "none" }}
        >
          {navItems.map((item, idx) => (
            <li key={item.name} role="none">
              <a
                id={`sidebar-nav-${idx}`}
                href={item.href}
                className={`sidebar-item${activeIdx === idx ? " active" : ""}`}
                aria-current={activeIdx === idx ? "page" : undefined}
                aria-label={item.ariaLabel}
                tabIndex={0}
                role="menuitem"
                onClick={() => setActiveIdx(idx)}
                onKeyDown={(e) => {
                  // Support quick Enter/Space activation & delegate arrows to parent
                  if (e.key === "Enter" || e.key === " ") {
                    // Allow main handler to trigger click
                    e.target.click();
                  }
                }}
                style={{ outline: activeIdx === idx ? "2px solid var(--primary)" : "none" }}
              >
                {/* Icon for navigation visual, with alt text for accessibility */}
                {item.name === "Chat" && (
                  <span
                    aria-hidden="true"
                    style={{ marginRight: 8, verticalAlign: "middle" }}
                  >
                    💬
                  </span>
                )}
                {item.name === "TV Guide" && (
                  <span
                    aria-hidden="true"
                    style={{ marginRight: 8, verticalAlign: "middle" }}
                  >
                    📺
                  </span>
                )}
                {item.name === "Settings" && (
                  <span
                    aria-hidden="true"
                    style={{ marginRight: 8, verticalAlign: "middle" }}
                  >
                    ⚙️
                  </span>
                )}
                {item.name}
                <span className="sr-only" style={{ display: "none" }}>
                  {` (${item.ariaLabel}). Navigate with arrow keys.`}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {/* Screen-reader hint for sidebar navigation */}
      <div
        aria-live="polite"
        style={{
          fontSize: "0.92em",
          padding: "7px 12px 0 15px",
          color: "var(--text-secondary)"
        }}
        className="sr-nav-hint"
      >
        Use arrow keys ↑↓ to move. Press Enter or Space to select a section.
      </div>
    </aside>
  );
}

export default Sidebar;
