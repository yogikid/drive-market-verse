import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { chatService, userService } from "@/services";
import { ChatWindow } from "@/components/ChatWindow";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types";
import { conversations } from "@/data/mock";

// Mock: vendor v1 owner is u3
const VENDOR_USER_ID = "u3";

export const Route = createFileRoute("/vendor/chat")({
  component: VendorChat,
});

function VendorChat() {
  const qc = useQueryClient();
  const vendorConvos = conversations.filter((c) => c.vendorId === "v1");
  const [activeId, setActiveId] = useState<string | null>(vendorConvos[0]?.id ?? null);
  const { data: users = [] } = useQuery({ queryKey: ["users"], queryFn: () => userService.list() });
  const { data: msgs = [] } = useQuery({
    queryKey: ["messages", activeId],
    queryFn: () => (activeId ? chatService.messages(activeId) : Promise.resolve([])),
    enabled: !!activeId,
  });

  const send = async (content: string) => {
    if (!activeId) return;
    const m: ChatMessage = {
      id: "m" + Date.now(),
      conversationId: activeId,
      senderId: VENDOR_USER_ID,
      content,
      timestamp: new Date().toISOString(),
    };
    await chatService.send(m);
    qc.invalidateQueries({ queryKey: ["messages", activeId] });
  };

  return (
    <div className="grid gap-4 md:grid-cols-[280px_1fr]">
      <div className="rounded-xl border bg-card p-2">
        {vendorConvos.map((c) => {
          const cust = users.find((u) => u.id === c.customerId);
          return (
            <button key={c.id} onClick={() => setActiveId(c.id)} className={cn("w-full rounded-lg p-3 text-left", activeId === c.id ? "bg-primary/10" : "hover:bg-muted")}>
              <p className="text-sm font-medium">{cust?.name}</p>
              <p className="truncate text-xs text-muted-foreground">{c.lastMessage}</p>
            </button>
          );
        })}
      </div>
      <ChatWindow className="h-[560px]" messages={msgs} currentUserId={VENDOR_USER_ID} onSend={send} />
    </div>
  );
}
