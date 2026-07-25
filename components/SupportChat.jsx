"use client";

import { useEffect, useRef, useState } from "react";
import { useStore } from "@/lib/store";
import { bestMatch, productMatch, priceAnswer } from "@/lib/chatKnowledge";

const SUGGESTIONS = ["Shipping & delivery", "How does payment work?", "Returns policy", "Which bike should I get?"];
const FALLBACK = "I'm not sure about that one — I can help with shipping, payment, warranty, returns, assembly, certifications and picking a model. Try asking one of those, or use the cart form for anything order-specific.";

function reply(text, country) {
  const p = productMatch(text, country);
  if (p && /price|cost|how much|€|eur/i.test(text)) return priceAnswer(p, country);
  const hit = bestMatch(text);
  if (hit) return hit.a;
  if (p) return priceAnswer(p, country);
  return FALLBACK;
}

export default function SupportChat() {
  const { country } = useStore();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi — I'm the ZEPHRIDE assistant. Ask me anything about shipping, payment, warranty or which bike fits you best." },
  ]);
  const [input, setInput] = useState("");
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open]);

  function send(text) {
    const clean = text.trim();
    if (!clean) return;
    const answer = reply(clean, country);
    setMessages((m) => [...m, { from: "user", text: clean }, { from: "bot", text: answer }]);
    setInput("");
  }

  return (
    <>
      <button
        className={`chat-fab ${open ? "is-open" : ""}`}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close support chat" : "Open support chat"}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-8.4 8.4H5.6L3 21l1.1-3.1a8.4 8.4 0 1 1 16.9-6.4Z"/></svg>
        )}
      </button>

      <div className={`chat-panel ${open ? "open" : ""}`} role="dialog" aria-label="ZEPHRIDE support chat" aria-hidden={!open}>
        <div className="chat-head">
          <span className="chat-dot" aria-hidden="true" />
          <div>
            <b>ZEPHRIDE assistant</b>
            <small>Usually replies instantly</small>
          </div>
        </div>

        <div className="chat-body" ref={listRef}>
          {messages.map((m, i) => (
            <div className={`chat-msg chat-msg-${m.from}`} key={i}>{m.text}</div>
          ))}
          {messages.length === 1 && (
            <div className="chat-suggestions">
              {SUGGESTIONS.map((s) => (
                <button type="button" key={s} onClick={() => send(s)}>{s}</button>
              ))}
            </div>
          )}
        </div>

        <form
          className="chat-form"
          onSubmit={(e) => { e.preventDefault(); send(input); }}
        >
          <input
            type="text" value={input} onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about shipping, payment, a model…" aria-label="Message"
          />
          <button type="submit" aria-label="Send">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </form>
      </div>
    </>
  );
}
