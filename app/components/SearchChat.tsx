"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import PriceTrendChart from "./PriceTrendChart";

type ChatMessage = {
  id: string;
  role: "user" | "assistant" | "error";
  content: string;
};

const SUGGESTIONS = [
  "산미 있는 원두 중 가성비 좋은 거 추천해줘",
  "고깃집 사이드메뉴 밀키트 저가 위주 추천",
  "베이커리용 가성비 좋은 버터 추천해줘",
  "분식집 튀김가루 최저가 비교해줘",
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-1 py-2">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-2 w-2 rounded-full bg-[#3b9eff]/80 animate-bounce"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </div>
  );
}

export default function SearchChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const hasConversation = messages.length > 0;

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function sendMessage(text: string) {
    const message = text.trim();
    if (!message || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: message,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = (await res.json()) as { response?: string; error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? "요청에 실패했습니다.");
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: data.response ?? "",
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: "error",
          content: err instanceof Error ? err.message : "요청에 실패했습니다.",
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  function getUserQueryBefore(index: number): string {
    for (let i = index - 1; i >= 0; i--) {
      if (messages[i]?.role === "user") return messages[i].content;
    }
    return "";
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-3xl text-left sm:mt-10">
      <div className="overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0a0e18]/95 shadow-2xl shadow-black/50 backdrop-blur-xl">
        {/* Chat header */}
        <div className="flex items-center justify-between border-b border-white/[0.06] bg-[#0d111c]/80 px-4 py-3 sm:px-5">
          <div className="flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#3b9eff] to-[#1d4ed8] shadow-lg shadow-[#3b9eff]/20">
              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0d111c] bg-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">식자재 구매 상담 AI</p>
              <p className="text-xs text-[#5c6578]">카페 · 베이커리 · 음식점 맞춤 추천</p>
            </div>
          </div>
          {hasConversation && (
            <button
              type="button"
              onClick={() => setMessages([])}
              className="rounded-lg px-2.5 py-1.5 text-xs text-[#8b95a8] transition hover:bg-white/[0.05] hover:text-white"
            >
              새 대화
            </button>
          )}
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className={`overflow-y-auto px-4 py-5 sm:px-5 ${hasConversation || loading ? "min-h-[280px] max-h-[520px]" : "min-h-[140px]"}`}
          aria-live="polite"
        >
          {!hasConversation && !loading && (
            <div className="flex flex-col items-center justify-center py-4 text-center">
              <p className="text-sm text-[#8b95a8]">
                업종과 조건을 알려주시면 식자재를 추천해 드립니다.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => sendMessage(s)}
                    className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-[#a8b3c7] transition hover:border-[#3b9eff]/40 hover:bg-[#3b9eff]/10 hover:text-[#7ec8ff]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4">
            {messages.map((msg, index) =>
              msg.role === "user" ? (
                <div key={msg.id} className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-br-md bg-gradient-to-br from-[#3b9eff] to-[#2563eb] px-4 py-2.5 text-sm leading-relaxed text-white shadow-lg shadow-[#3b9eff]/15">
                    {msg.content}
                  </div>
                </div>
              ) : msg.role === "assistant" ? (
                <div key={msg.id} className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#3b9eff]/15 text-[#3b9eff]">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1 max-w-[95%]">
                    <div className="rounded-2xl rounded-tl-md border border-white/[0.06] bg-[#131a2b]/80 px-4 py-3 text-sm leading-relaxed text-[#d1d9e6]">
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                    <PriceTrendChart searchQuery={getUserQueryBefore(index)} />
                  </div>
                </div>
              ) : (
                <div key={msg.id} className="flex justify-center">
                  <p className="rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-400 ring-1 ring-red-500/20">
                    {msg.content}
                  </p>
                </div>
              ),
            )}

            {loading && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#3b9eff]/15 text-[#3b9eff]">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <div className="rounded-2xl rounded-tl-md border border-white/[0.06] bg-[#131a2b]/80 px-4 py-2">
                  <TypingIndicator />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="border-t border-white/[0.06] bg-[#0d111c]/60 p-3 sm:p-4"
        >
          <div className="flex items-end gap-2 rounded-xl border border-white/[0.1] bg-[#06080f]/80 p-2 focus-within:border-[#3b9eff]/50 focus-within:ring-1 focus-within:ring-[#3b9eff]/30">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="예: 산미 있는 원두 중 가성비 좋은 거 추천해줘"
              rows={1}
              disabled={loading}
              className="max-h-32 min-h-[44px] flex-1 resize-none bg-transparent px-2 py-2.5 text-sm text-white placeholder:text-[#5c6578] outline-none disabled:opacity-60"
              aria-label="식자재 상담 메시지"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#3b9eff] text-white transition hover:bg-[#2d8ef0] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="메시지 보내기"
            >
              {loading ? (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              )}
            </button>
          </div>
          <p className="mt-2 text-center text-[10px] text-[#5c6578]">
            Enter 전송 · Shift+Enter 줄바꿈 · AI는 참고용이며 실제 발주 전 확인이 필요합니다
          </p>
        </form>
      </div>

      <p className="mt-3 text-center text-xs text-[#5c6578]">
        12만+ SKU · 전국 도매·식자재 유통사 실시간 가격 비교
      </p>
    </div>
  );
}
