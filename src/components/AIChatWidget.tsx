import { useState } from "react";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Msg { id: string; role: "user" | "assistant"; content: string }

const cannedReplies = [
  "Untuk perjalanan keluarga 7 orang, saya rekomendasikan Toyota Innova atau Daihatsu Xenia. Mau saya carikan yang tersedia?",
  "Harga rental per hari mulai Rp 280.000 untuk city car sampai Rp 1.800.000 untuk kelas luxury. Ada preferensi kelas mobil?",
  "Untuk kota tujuan luar kota, disarankan pakai supir. Mau saya bantu buatkan booking?",
  "Baik, saya catat kebutuhannya. Silakan cek halaman Cari Mobil untuk pilihan lengkapnya.",
];

export function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: "0", role: "assistant", content: "Halo! Saya asisten CorporaRent. Butuh rekomendasi mobil?" },
  ]);
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    const userMsg: Msg = { id: String(Date.now()), role: "user", content: text.trim() };
    setMsgs((m) => [...m, userMsg]);
    setText("");
    setTyping(true);
    setTimeout(() => {
      const reply = cannedReplies[Math.floor(Math.random() * cannedReplies.length)];
      setMsgs((m) => [...m, { id: String(Date.now() + 1), role: "assistant", content: reply }]);
      setTyping(false);
    }, 900);
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed right-4 bottom-20 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 transition sm:bottom-6"
          aria-label="Buka asisten"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}
      {open && (
        <div className="fixed right-4 bottom-4 z-50 flex h-[500px] w-[calc(100%-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border bg-card shadow-2xl">
          <div className="flex items-center justify-between border-b bg-primary px-4 py-3 text-primary-foreground">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <div>
                <p className="text-sm font-semibold">Asisten CorporaRent</p>
                <p className="text-[10px] opacity-80">Bantu cari mobil yang pas</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)}><X className="h-4 w-4" /></button>
          </div>
          <div className="flex-1 space-y-2 overflow-y-auto p-3">
            {msgs.map((m) => (
              <div key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                <div className={cn(
                  "max-w-[80%] rounded-2xl px-3 py-2 text-sm",
                  m.role === "user" ? "rounded-br-sm bg-primary text-primary-foreground" : "rounded-bl-sm bg-muted",
                )}>
                  {m.content}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm bg-muted px-3 py-2">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:0.3s]" />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 border-t p-3">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Tanya apa saja..."
              className="flex-1 rounded-full border bg-background px-4 py-2 text-sm outline-none focus:border-primary"
            />
            <button onClick={send} className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
