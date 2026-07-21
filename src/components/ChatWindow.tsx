import { useState } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types";

interface Props {
  messages: ChatMessage[];
  currentUserId: string;
  onSend: (content: string) => void;
  className?: string;
  placeholder?: string;
}

export function ChatWindow({ messages, currentUserId, onSend, className, placeholder = "Tulis pesan..." }: Props) {
  const [text, setText] = useState("");
  const submit = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };
  return (
    <div className={cn("flex h-full flex-col rounded-xl border bg-card", className)}>
      <div className="flex-1 space-y-2 overflow-y-auto p-4">
        {messages.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">Belum ada pesan</p>
        )}
        {messages.map((m) => {
          const me = m.senderId === currentUserId;
          return (
            <div key={m.id} className={cn("flex", me ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[75%] rounded-2xl px-3 py-2 text-sm",
                  me ? "rounded-br-sm bg-primary text-primary-foreground" : "rounded-bl-sm bg-muted",
                )}
              >
                <p>{m.content}</p>
                <p className={cn("mt-1 text-[10px] opacity-70")}>
                  {new Date(m.timestamp).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-2 border-t p-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder={placeholder}
          className="flex-1 rounded-full border bg-background px-4 py-2 text-sm outline-none focus:border-primary"
        />
        <button
          onClick={submit}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
