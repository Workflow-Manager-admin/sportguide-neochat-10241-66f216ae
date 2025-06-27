import React, { useState, useRef, useEffect } from "react";

/**
 * ChatWindow - Main chat interface for conversation with the Sports TV Guide chatbot.
 * Features:
 *  - Message list, input field, send button.
 *  - Streams assistant messages one character at a time for more natural chat.
 *  - Smart loading indicator/typing simulation (dot animation).
 *  - Scrolls to newest message automatically.
 *  - Robust error and input handling.
 */
/**
 * Simulate backend chat interaction using dummy async function.
 * Replace this with a real fetch (e.g., to FastAPI+Neo4j).
 */
// PUBLIC_INTERFACE
async function fetchChatbotResponse(userText) {
  // Simulate async network delay (backend call)
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!userText.trim()) {
        resolve("Could you please type your question?");
      } else if (/football|soccer|nba|basketball/i.test(userText)) {
        resolve("Tonight at 8PM: Lakers vs. Celtics on ESPN. ⚽️🏀");
      } else if (/guide|today|evening/i.test(userText)) {
        resolve("Here's today's sports TV guide: 6PM - Baseball on Fox Sports, 8PM - Football on ESPN, 10PM - Tennis on Star Sports.");
      } else if (/hi|hello|hey|who/i.test(userText)) {
        resolve("Hello! I'm here to help you find sports TV schedules.");
      } else {
        resolve("Sorry, I can't answer that yet. Try asking about TV guide times or a sports match!");
      }
    }, 950 + Math.random() * 800);
  });
}

// PUBLIC_INTERFACE
function ChatWindow() {
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
  const [streaming, setStreaming] = useState(false);
  const [pendingBotMessage, setPendingBotMessage] = useState(null); // { id, sender, text, timestamp }
  const [error, setError] = useState("");
  const [showTyping, setShowTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to latest message effect
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, streaming, pendingBotMessage]);

  // Streaming/typing effect: if there's a pendingBotMessage (text revealed one char at a time)
  useEffect(() => {
    let timeout;
    if (streaming && pendingBotMessage && typeof pendingBotMessage.fullText === "string") {
      if (
        pendingBotMessage.text.length < pendingBotMessage.fullText.length
      ) {
        timeout = setTimeout(() => {
          setPendingBotMessage((prev) => ({
            ...prev,
            text:
              prev.fullText.slice(0, prev.text.length + Math.max(1, Math.round(prev.fullText.length / 25))), // Stream in batches for long texts
          }));
        }, pendingBotMessage.fullText.length > 80 ? 14 : 27);
      } else {
        // Finished streaming: commit bot message to messages, end streaming
        setMessages((prev) => [
          ...prev,
          {
            ...pendingBotMessage,
            text: pendingBotMessage.fullText,
            timestamp: new Date().getTime(),
          },
        ]);
        setStreaming(false);
        setPendingBotMessage(null);
      }
    }
    return () => clearTimeout(timeout);
  }, [streaming, pendingBotMessage]);

  // Smart "typing..." indicator (appears right before streaming, not through whole fetch)
  useEffect(() => {
    let typingTimeout;
    if (loading) {
      setShowTyping(true);
      // Hide fake typing if response is super quick (<400ms), or fall back with effect below
      typingTimeout = setTimeout(() => setShowTyping(false), 1900);
    } else {
      setShowTyping(false);
    }
    return () => clearTimeout(typingTimeout);
  }, [loading]);

  // PUBLIC_INTERFACE
  function handleInputChange(e) {
    setInput(e.target.value);
    setError("");
  }

  // PUBLIC_INTERFACE
  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim() || loading) {
      setError("Please enter a message.");
      return;
    }
    setError("");
    setLoading(true);

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: input,
      timestamp: new Date().getTime(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    try {
      // Artificial "typing"/streaming: after a minimum pause, then show typewriter
      const answer = await fetchChatbotResponse(userMsg.text);

      // Start stream typing effect after a brief artificial "thinking"
      setTimeout(() => {
        setShowTyping(false);
        setPendingBotMessage({
          id: Date.now() + 1,
          sender: "bot",
          text: "",
          fullText: answer,
          timestamp: new Date().getTime(),
        });
        setStreaming(true);
      }, 340 + Math.random() * 340);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          sender: "bot",
          text: "Error: Failed to reach the chatbot service.",
          timestamp: new Date().getTime(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  // Render individual chat message (bot/user)
  function renderMessage(msg, idx) {
    const isBot = msg.sender === "bot";
    return (
      <div
        key={msg.id + "-" + (msg.text || "").slice(0, 10) + idx}
        className={`chat-message ${isBot ? "bot-message" : "user-message"}`}
        style={{
          alignSelf: isBot ? "flex-start" : "flex-end",
          borderRadius: isBot
            ? "13px 13px 13px 5.5px"
            : "13px 13px 5.5px 13px",
          padding: "9px 14px",
          marginBottom: 7,
          maxWidth: "84%",
          fontSize: "1.03em",
          fontWeight: 500,
          letterSpacing: "0.02em",
          boxShadow: isBot
            ? "0 1px 4px rgba(30,58,138,0.07)"
            : "0 1px 4px rgba(245,158,66,0.10)",
          whiteSpace: "pre-line",
        }}
      >
        {msg.text}
      </div>
    );
  }

  // Render bot streaming message (not yet in final list)
  function renderStreamingBot() {
    if (!pendingBotMessage || !streaming) return null;
    return (
      <div
        className="chat-message bot-message"
        style={{
          alignSelf: "flex-start",
          borderRadius: "13px 13px 13px 5.5px",
          padding: "9px 14px",
          marginBottom: 7,
          maxWidth: "84%",
          fontSize: "1.03em",
          fontWeight: 500,
          letterSpacing: "0.02em",
          boxShadow: "0 1px 4px rgba(30,58,138,0.07)",
          minHeight: 22,
          whiteSpace: "pre-line",
        }}
        aria-live="polite"
      >
        {pendingBotMessage.text}
        {pendingBotMessage.text.length < (pendingBotMessage.fullText?.length ?? 0) && (
          <span className="blinking-cursor" style={{ opacity: 0.6 }}>▋</span>
        )}
      </div>
    );
  }

  // Render loading spinner/message as if bot is "typing"
  function renderLoading() {
    // Show only if not currently streaming
    if (!showTyping || streaming) return null;
    return (
      <div
        className="chat-message bot-message"
        style={{
          alignSelf: "flex-start",
          borderRadius: "13px 13px 13px 5.5px",
          padding: "9px 14px",
          marginBottom: 7,
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
        }}
        aria-live="polite"
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
        {renderStreamingBot()}
        {renderLoading()}
        <div ref={messagesEndRef} />
      </div>
      <form className="chat-input-bar" onSubmit={handleSend} autoComplete="off">
        <input
          className="chat-input"
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={handleInputChange}
          disabled={loading || streaming}
          aria-label="Type your message"
          autoFocus={true}
        />
        <button
          className="chat-send"
          type="submit"
          disabled={loading || streaming || !input.trim()}
          aria-label="Send message"
          style={{
            cursor: loading || streaming || !input.trim() ? "not-allowed" : "pointer",
            opacity: loading || streaming || !input.trim() ? 0.7 : 1,
          }}
        >
          {loading ? "Sending..." : streaming ? "Bot replying..." : "Send"}
        </button>
      </form>
      {error && (
        <div style={{ color: "#d32f2f", margin: "0 16px 6px 16px", fontSize: "0.97em" }}>{error}</div>
      )}
      <style>{`
        .blinking-cursor {
          animation: blink-cursor 1s steps(2, start) infinite;
          font-weight: bold;
          font-size: 1em;
        }
        @keyframes blink-cursor {
          0% { opacity: 0.6; }
          60% { opacity: 0.0; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </section>
  );
}

export default ChatWindow;
