import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { chatService, vendorService } from "@/services";
import { ChatWindow } from "@/components/ChatWindow";
import { useSession } from "@/lib/session";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types";

export const Route = createFileRoute("/_public/chat")({
  component: ChatPage,
});

function ChatPage() {
  const user = useSession((s) => s.user);
  const userId = user?.id ?? "u1";
  const qc = useQueryClient();
  const { data: convos = [] } = useQuery({ queryKey: ["convos", userId], queryFn: () => chatService.listConversations(userId) });
  const { data: vendors = [] } = useQuery({ queryKey: ["vendors"], queryFn: () => vendorService.list() });
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = activeId ?? convos[0]?.id ?? null;

  const { data: msgs = [] } = useQuery({
    queryKey: ["messages", active],
    queryFn: () => (active ? chatService.messages(active) : Promise.resolve([])),
    enabled: !!active,
  });

  const send = async (content: string) => {
    if (!active) return;
    const m: ChatMessage = {
      id: "m" + Date.now(),
      conversationId: active,
      senderId: userId,
      content,
      timestamp: new Date().toISOString(),
    };
    await chatService.send(m);
    qc.invalidateQueries({ queryKey: ["messages", active] });
  };

  return (
    <div>
      <h1 className="mb-4 font-display text-2xl font-bold">Chat</h1>
      <div className="grid gap-4 md:grid-cols-[280px_1fr]">
        <div className="rounded-2xl border bg-card p-2">
          {convos.length === 0 && <p className="p-4 text-center text-sm text-muted-foreground">Belum ada percakapan</p>}
          {convos.map((c) => {
            const vendor = vendors.find((v) => v.id === c.vendorId);
            return (
              <button
                key={c.id}
                onClick={() => setActiveId(c.id)}
                className={cn("w-full rounded-lg p-3 text-left transition", active === c.id ? "bg-primary/10" : "hover:bg-muted")}
              >
                <p className="text-sm font-medium">{vendor?.businessName}</p>
                <p className="truncate text-xs text-muted-foreground">{c.lastMessage}</p>
              </button>
            );
          })}
        </div>
        <ChatWindow className="h-[500px]" messages={msgs} currentUserId={userId} onSend={send} />
      </div>
    </div>
  );
}
