import React from "react";

/**
 * Header component that displays the application title.
 * Styles: Minimal bar at the top with app name.
 */
// PUBLIC_INTERFACE
function Header() {
  return (
    <header className="header-bar">
      <h1 className="header-title">Sports TV Guide Chatbot</h1>
    </header>
  );
}

export default Header;
