import React from "react";

/**
 * Main chat window component for user conversation.
 * (Placeholder for chat messages and input box)
 */
// PUBLIC_INTERFACE
function ChatWindow() {
  return (
    <section className="chat-window">
      <div className="chat-header">Conversation</div>
      <div className="chat-messages">
        {/* Chat messages will appear here */}
        <p style={{ color: "#888" }}>Chatbot conversation will appear here.</p>
      </div>
      <div className="chat-input-bar">
        {/* Future: input and send button */}
        <input
          className="chat-input"
          type="text"
          placeholder="Type your message..."
          disabled
        />
        <button className="chat-send" disabled>
          Send
        </button>
      </div>
    </section>
  );
}

export default ChatWindow;
