import {
  useState, useRef, useEffect, useCallback, memo,
  type FormEvent, type KeyboardEvent,
} from "react";
import { createPortal } from "react-dom";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  time: string;
  reaction?: "up" | "down" | null;
}

const SCRIPTED_REPLIES = [
  "Great question! We offer free estimates for all our services — just give us a call at (732) 555-0192 or fill out our contact form and we'll get back to you within the hour.",
  "We serve Central NJ including Middlesex, Monmouth, and Somerset counties. Not sure if we cover your area? Give us a call and we'll let you know!",
  "Our window cleaning service covers both interior and exterior windows for residential and commercial properties. We guarantee streak-free results every time.",
  "Yes! We offer same-day and next-day appointments depending on availability. Call us at (732) 555-0192 to check our schedule.",
  "Absolutely — we're fully insured and all our technicians are trained and background-checked. Your property is in safe hands.",
  "Our pricing is based on the size of your home/business and the services needed. We always provide a free, no-obligation estimate before any work begins.",
  "We use professional-grade, eco-friendly cleaning solutions that are safe for your family, pets, and landscaping.",
  "In addition to window cleaning, we offer power washing, gutter cleaning, and junk removal. We're your one-stop exterior cleaning company!",
  "Dylan, the owner, personally oversees every job to make sure it meets our high standards. We take real pride in every property we work on.",
  "We have a 5-star rating on Google from our Central NJ customers. Customer satisfaction is our #1 priority — if you're not happy, we'll make it right.",
];

let replyIndex = 0;

function getNextReply(): string {
  const reply = SCRIPTED_REPLIES[replyIndex % SCRIPTED_REPLIES.length];
  replyIndex++;
  return reply;
}

function getTime(): string {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}


function ChatIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
        stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
        stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1.5 h-4" aria-label="Typing">
      <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-[chatbotDot_1.2s_ease-in-out_infinite] [animation-delay:0s]" />
      <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-[chatbotDot_1.2s_ease-in-out_infinite] [animation-delay:.18s]" />
      <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-[chatbotDot_1.2s_ease-in-out_infinite] [animation-delay:.36s]" />
    </span>
  );
}

const PURPLE = "#974ff5";

function SkullAvatar({ size = 28 }: { size?: number }) {
  return (
    <img
      src="/all-star-window-cleaning/favicon.png"
      alt="All Star Assistant"
      width={size}
      height={size}
      className="rounded-full object-cover border-2 border-black shrink-0"
      style={{ background: PURPLE, width: size, height: size }}
    />
  );
}

const BotMessage = memo(({ msg, onReact }: {
  msg: Message;
  onReact: (id: string, r: "up" | "down") => void;
}) => (
  <div className="flex flex-col items-start mb-2 animate-[chatbotIn_.22s_ease_both]">
    <div className="relative max-w-[83%] group">
      <div className="bg-[#2a2a2a] border border-white/10 text-white px-3.5 py-2.5 rounded-[.25rem_1rem_1rem_1rem]">
        <span className="block whitespace-pre-line break-words text-[.845rem] leading-[1.55]">{msg.text}</span>
      </div>
      <div
        role="group" aria-label="Rate this response"
        className="flex gap-1 mt-1.5 opacity-0 pointer-events-none translate-y-0.5 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 transition-all duration-200"
      >
        <button type="button" onClick={() => onReact(msg.id, "up")} aria-label="Helpful" aria-pressed={msg.reaction === "up"}
          className={`border-0 bg-transparent p-0 cursor-pointer text-[.85rem] leading-none w-[1.55rem] h-[1.55rem] rounded-[.45rem] flex items-center justify-center transition-[transform,filter,background] duration-200 [filter:grayscale(50%)_opacity(.55)] hover:scale-125 hover:[filter:grayscale(0%)_opacity(1)] active:scale-105 ${msg.reaction === "up" ? "[filter:grayscale(0%)_opacity(1)] scale-110" : ""}`}>👍</button>
        <button type="button" onClick={() => onReact(msg.id, "down")} aria-label="Not helpful" aria-pressed={msg.reaction === "down"}
          className={`border-0 bg-transparent p-0 cursor-pointer text-[.85rem] leading-none w-[1.55rem] h-[1.55rem] rounded-[.45rem] flex items-center justify-center transition-[transform,filter,background] duration-200 [filter:grayscale(50%)_opacity(.55)] hover:scale-125 hover:[filter:grayscale(0%)_opacity(1)] active:scale-105 ${msg.reaction === "down" ? "[filter:grayscale(0%)_opacity(1)] scale-110" : ""}`}>👎</button>
      </div>
    </div>
    <div className="flex items-center gap-1.5 mt-1">
      <SkullAvatar size={28} />
      <time className="text-[.63rem] text-white/40 whitespace-nowrap">{msg.time}</time>
    </div>
  </div>
));

const UserMessage = memo(({ msg }: { msg: Message }) => (
  <div className="flex flex-col items-end mb-2.5 animate-[chatbotIn_.22s_ease_both]">
    <div className="max-w-[83%] text-white px-3.5 py-2.5 rounded-[1rem_1rem_.25rem_1rem] text-[.845rem] leading-[1.55] break-words font-semibold"
      style={{ background: PURPLE }}>
      {msg.text}
    </div>
    <time className="text-[.63rem] text-white/40 mt-1 pr-0.5 whitespace-nowrap">{msg.time} · Seen</time>
  </div>
));

function Fab({ open, unread, onClick }: { open: boolean; unread: number; onClick: () => void }) {
  return (
    <button
      id="chatbot-trigger"
      onClick={onClick}
      type="button"
      aria-label={open ? "Close chat" : "Chat with All Star"}
      aria-expanded={open}
      className={`fixed bottom-[clamp(1.25rem,4vw,1.75rem)] right-[clamp(1.25rem,4vw,1.75rem)] z-[100003]
        w-14 h-14 rounded-full cursor-pointer
        border-2 border-black text-white
        shadow-[0_4px_20px_rgba(0,0,0,.35),0_2px_8px_rgba(0,0,0,.2)]
        flex items-center justify-center transition-transform duration-300 ease-out
        hover:scale-110 hover:brightness-110 active:scale-95 ${open ? "scale-105" : ""}`}
      style={{ background: PURPLE }}
    >
      <span className={`flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] ${open ? "rotate-90" : ""}`}>
        {open ? <CloseIcon size={18} /> : <ChatIcon size={24} />}
      </span>
      {!open && unread > 0 && (
        <span aria-label={`${unread} new`}
          className="absolute -top-1 -right-1 bg-black text-white text-[.6rem] font-bold min-w-[1.15rem] h-[1.15rem] rounded-full flex items-center justify-center border-2"
          style={{ borderColor: PURPLE }}>
          {unread}
        </span>
      )}
    </button>
  );
}

function ChatBot() {
  const [open, setOpen]       = useState(false);
  const [msgs, setMsgs]       = useState<Message[]>([{
    id: "w0", role: "assistant",
    text: "Hi! 👋 Looking for window cleaning or exterior services in Central NJ? I'm here to help!",
    time: getTime(),
  }]);
  const [input, setInput]     = useState("");
  const [typing, setTyping]   = useState(false);
  const [unread, setUnread]   = useState(0);
  const [mounted, setMounted] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!open) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing, open]);

  useEffect(() => {
    if (open) setUnread(0);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const h = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [open]);

  const react = useCallback((id: string, r: "up" | "down") => {
    setMsgs(prev => prev.map(m => m.id === id ? { ...m, reaction: m.reaction === r ? null : r } : m));
  }, []);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text) return;
    const userMsg: Message = { id: `u${Date.now()}`, role: "user", text, time: getTime() };
    setMsgs(prev => [...prev, userMsg]);
    setInput("");
    if (inputRef.current) inputRef.current.style.height = "auto";
    setTyping(true);

    await new Promise(r => setTimeout(r, 900 + Math.random() * 700));
    const reply = getNextReply();
    setMsgs(prev => [...prev, { id: `b${Date.now()}`, role: "assistant", text: reply, time: getTime() }]);
    setTyping(false);
    if (!open) setUnread(n => n + 1);
  }, [input, open]);

  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Panel */}
      <div
        role="dialog" aria-modal="true" aria-label="Chat with All Star Window Cleaning"
        className={`fixed z-[100002]
          bottom-[calc(clamp(1.25rem,4vw,1.75rem)+3.5rem+.875rem)]
          right-[clamp(1.25rem,4vw,1.75rem)]
          w-[min(24rem,calc(100vw-clamp(2.5rem,8vw,3.5rem)))]
          max-h-[calc(100dvh-5.5rem-1rem-clamp(1.25rem,4vw,1.75rem)-3.5rem-.875rem)]
          min-h-[min(22rem,calc(100dvh-14rem))]
          flex flex-col overflow-hidden
          bg-[#111] border-2 border-[#333] rounded-[1.25rem]
          shadow-[0_24px_64px_rgba(0,0,0,.6),0_8px_24px_rgba(0,0,0,.4)]
          transition-[opacity,transform] duration-250 ease-[cubic-bezier(.34,1.56,.64,1)]
          max-sm:left-0 max-sm:right-0 max-sm:top-0 max-sm:bottom-[calc(1.25rem+3.5rem+.75rem)] max-sm:w-auto max-sm:max-h-none max-sm:min-h-0 max-sm:rounded-none max-sm:border-x-0 max-sm:border-t-0 max-sm:border-b-0
          ${open
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-3 scale-[.97] pointer-events-none"
          }`}
      >
        {/* Header */}
        <header className="flex items-center gap-3 px-4 py-3.5 shrink-0 border-b-2 border-black"
          style={{ background: PURPLE }}>
          <img
            src="/all-star-window-cleaning/favicon.png"
            alt="All Star Assistant"
            className="shrink-0 w-10 h-10 rounded-full object-cover border-2 border-black"
            style={{ background: "#000" }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-[.9rem] font-bold text-white m-0 leading-tight truncate">All Star Assistant</p>
            <p className="text-[.7rem] text-white/70 m-0 flex items-center gap-1.5 mt-0.5">
              <span className="w-[.42rem] h-[.42rem] rounded-full bg-white/60 shrink-0" />
              24×7 Support
            </p>
          </div>
          <button onClick={() => setOpen(false)} type="button" aria-label="Close"
            className="shrink-0 w-[1.9rem] h-[1.9rem] rounded-full bg-black/20 border-0 text-white flex items-center justify-center hover:bg-black/35 transition-colors cursor-pointer">
            <CloseIcon />
          </button>
        </header>

        {/* Messages */}
        <div role="log" aria-live="polite"
          className="flex-1 overflow-y-auto px-3.5 pt-4 pb-2.5 flex flex-col [scrollbar-width:none] overscroll-contain bg-[#111]">
          {msgs.map(m => m.role === "user"
            ? <UserMessage key={m.id} msg={m} />
            : <BotMessage  key={m.id} msg={m} onReact={react} />
          )}
          {typing && (
            <div className="flex flex-col items-start mb-2 animate-[chatbotIn_.22s_ease_both]">
              <div className="bg-[#2a2a2a] border border-white/10 px-3.5 py-2.5 rounded-[.25rem_1rem_1rem_1rem]">
                <TypingDots />
              </div>
              <SkullAvatar size={28} />
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input bar */}
        <form className="flex items-end gap-1.5 px-3.5 py-2.5 border-t border-white/10 bg-[#1a1a1a] shrink-0"
          onSubmit={(e: FormEvent) => { e.preventDefault(); send(); }}>
          <div className="flex-1 relative flex items-end border border-white/15 bg-[#2a2a2a] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-offset-0 transition-shadow"
            style={{ "--tw-ring-color": PURPLE } as React.CSSProperties}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = Math.min(e.target.scrollHeight, 96) + "px";
              }}
              onKeyDown={onKey}
              placeholder="Ask anything…"
              rows={1}
              tabIndex={open ? 0 : -1}
              aria-label="Message"
              className="w-full resize-none bg-transparent text-white text-[.845rem] leading-normal px-3 py-2 max-h-24 min-h-[2.4rem] overflow-y-auto [scrollbar-width:none] block outline-none placeholder:text-white/30"
            />
          </div>
          <button type="submit" aria-label="Send" disabled={!input.trim()}
            className="w-9 h-9 rounded-xl border-2 border-black cursor-pointer shrink-0 flex items-center justify-center text-white transition-[transform,opacity] duration-200 hover:enabled:scale-110 hover:enabled:brightness-110 active:enabled:scale-[.92] disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ background: PURPLE }}>
            <SendIcon />
          </button>
        </form>
      </div>

      <Fab open={open} unread={unread} onClick={() => setOpen(o => !o)} />

      <style>{`
        @keyframes chatbotIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes chatbotDot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40%            { transform: scale(1);   opacity: 1; }
        }
      `}</style>
    </>,
    document.body
  );
}

export default memo(ChatBot);
