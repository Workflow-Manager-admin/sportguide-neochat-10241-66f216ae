import React from "react";

/**
 * Sidebar component for navigation.
 * (Placeholder - extend with navigation items as needed)
 */
// PUBLIC_INTERFACE
function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li className="sidebar-item active">Chat</li>
          <li className="sidebar-item">TV Guide</li>
          {/* Add more navigation options as needed */}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
