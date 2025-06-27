import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import TVGuide from "./components/TVGuide";

/**
 * Main application root for the Sports TV Guide chatbot.
 * Arranges layout: Header, Sidebar, ChatWindow, TVGuide.
 * Top-level ARIA roles and main regions applied.
 */
// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState("light");

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="App">
      <Header />
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        tabIndex={0}
        title={`Switch to ${theme === "light" ? "dark" : "light"} color theme (keyboard shortcut available from Settings)`}
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
      <div className="main-layout" role="main">
        <Sidebar />
        <main className="content-area" aria-label="Chat content area" tabIndex={-1}>
          <ChatWindow />
        </main>
        <TVGuide />
      </div>
    </div>
  );
}

export default App;
