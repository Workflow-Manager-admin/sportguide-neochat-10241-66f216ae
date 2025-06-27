import React, { useState, useRef, useEffect } from "react";

/**
 * ChatWindow - Main chat interface for conversation with the Sports TV Guide chatbot.
 * Features:
 *  - Message list, input field, send button.
 *  - Loading indicator and visual feedback when sending.
 *  - Mocked assistant response with simulated delay for demo purposes.
 *  - Scrolls to newest message automatically.
 */
// PUBLIC_INTERFACE
function ChatWindow() {
  // Chat message state
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hi! 👋 I'm your Sports TV Guide bot. Ask me about TV schedules or your favorite sports teams and matches!",
      timestamp: new Date().getTime(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to latest message effect
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Simple mock backend "AI" reply
  function mockAssistantResponse(userText) {
    // Add demo logic for variety; in real implementation, replace with API call.
    if (!userText.trim()) {
      return "Could you please type your question?";
    }
    if (/football|soccer|nba|basketball/i.test(userText)) {
      return "Tonight at 8PM: Lakers vs. Celtics on ESPN. ⚽️🏀";
    }
    if (/guide|today|evening/i.test(userText)) {
      return "Here's today's sports TV guide: 6PM - Baseball on Fox Sports, 8PM - Football on ESPN, 10PM - Tennis on Star Sports.";
    }
    if (/hi|hello|hey|who/i.test(userText)) {
      return "Hello! I'm here to help you find sports TV schedules.";
    }
    // Generic answer
    return "Sorry, I can't answer that yet. Try asking about TV guide times or a sports match!";
  }

  // PUBLIC_INTERFACE
  function handleInputChange(e) {
    setInput(e.target.value);
    setError("");
  }

  // PUBLIC_INTERFACE
  function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) {
      setError("Please enter a message.");
      return;
    }
    setError("");

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: input,
      timestamp: new Date().getTime(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Simulate async backend response with delay
    setTimeout(() => {
      const answer = mockAssistantResponse(userMsg.text);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: answer,
          timestamp: new Date().getTime(),
        },
      ]);
      setLoading(false);
    }, 950 + Math.random() * 800);
  }

  // Render individual chat message
  function renderMessage(msg, idx) {
    const isBot = msg.sender === "bot";
    return (
      <div
        key={msg.id}
        className={`chat-message ${isBot ? "bot-message" : "user-message"}`}
        style={{
          background: isBot ? "#eaf3fc" : "#fbeedb",
          color: isBot ? "#1e3a8a" : "#f59e42",
          alignSelf: isBot ? "flex-start" : "flex-end",
          borderRadius: isBot ? "12px 12px 12px 4px" : "12px 12px 4px 12px",
          padding: "8px 12px",
          marginBottom: 9,
          maxWidth: "85%",
          fontSize: "1.03em",
          fontWeight: "500",
          letterSpacing: "0.02em",
          boxShadow:
            isBot
              ? "0 1px 3px rgba(30,58,138,0.09)"
              : "0 1px 3px rgba(245,158,66,0.10)",
        }}
      >
        {msg.text}
      </div>
    );
  }

  // Render loading spinner/message as if bot is "typing"
  function renderLoading() {
    return (
      <div
        className="chat-message bot-message"
        style={{
          background: "#eaf3fc",
          color: "#1e3a8a",
          alignSelf: "flex-start",
          borderRadius: "12px 12px 12px 4px",
          padding: "8px 12px",
          marginBottom: 8,
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
        }}
      >
        <span className="dot-flashing" style={{ marginRight: 6 }}>
          <svg width="18px" height="12px" viewBox="0 0 50 12">
            <circle cx="6" cy="6" r="6" fill="#6cb8f6">
              <animate attributeName="opacity" values=".1;1;.1" dur="1s" repeatCount="indefinite" begin="0.1" />
            </circle>
            <circle cx="25" cy="6" r="6" fill="#6cb8f6">
              <animate attributeName="opacity" values=".1;1;.1" dur="1s" repeatCount="indefinite" begin="0.25" />
            </circle>
            <circle cx="44" cy="6" r="6" fill="#6cb8f6">
              <animate attributeName="opacity" values=".1;1;.1" dur="1s" repeatCount="indefinite" begin="0.4" />
            </circle>
          </svg>
        </span>
        Typing...
      </div>
    );
  }

  return (
    <section className="chat-window">
      <div className="chat-header">Conversation</div>
      <div className="chat-messages" style={{ display: "flex", flexDirection: "column" }}>
        {messages.map(renderMessage)}
        {loading && renderLoading()}
        <div ref={messagesEndRef} />
      </div>
      <form className="chat-input-bar" onSubmit={handleSend} autoComplete="off">
        <input
          className="chat-input"
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={handleInputChange}
          disabled={loading}
          aria-label="Type your message"
          autoFocus={true}
        />
        <button
          className="chat-send"
          type="submit"
          disabled={loading || !input.trim()}
          aria-label="Send message"
          style={{
            cursor: loading || !input.trim() ? "not-allowed" : "pointer",
            opacity: loading || !input.trim() ? 0.7 : 1,
          }}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
      {error && (
        <div style={{ color: "#d32f2f", margin: "0 16px 6px 16px", fontSize: "0.97em" }}>{error}</div>
      )}
    </section>
  );
}

export default ChatWindow;
