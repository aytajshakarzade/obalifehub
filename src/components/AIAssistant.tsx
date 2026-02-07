import { useState } from 'react';
import { Sparkles, Send } from 'lucide-react';

const mockAIResponse = (q: string) => {
  if (q.toLowerCase().includes('order'))
    return 'Your last order is being prepared and will arrive today.';
  if (q.toLowerCase().includes('milk'))
    return 'Milk is available with 10% discount in OBA Yasamal.';
  if (q.toLowerCase().includes('delivery'))
    return 'Home delivery takes 1–2 hours.';
  return 'I can help you with products, orders, discounts or stores.';
};

export function AIAssistant() {
  const [messages, setMessages] = useState<{ from: 'user' | 'ai'; text: string }[]>([
    { from: 'ai', text: 'Hi 👋 I’m OBA Assistant. Ask me anything!' },
  ]);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input) return;
    const userMsg = { from: 'user', text: input };
    const aiMsg = { from: 'ai', text: mockAIResponse(input) };

    setMessages(prev => [...prev, userMsg, aiMsg]);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <div className="p-4 bg-[#2E8C3B] text-white flex items-center gap-2">
        <Sparkles />
        <span className="font-semibold">OBA AI Assistant</span>
      </div>

      <div className="flex-1 p-4 space-y-2 overflow-y-auto">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[80%] p-3 rounded-xl ${
              m.from === 'user'
                ? 'ml-auto bg-[#FFB703]'
                : 'mr-auto bg-white dark:bg-gray-800'
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className="p-3 flex gap-2 border-t bg-white dark:bg-gray-800">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask about products, orders..."
          className="flex-1 px-4 py-2 rounded-xl border"
        />
        <button
          onClick={send}
          className="p-3 bg-[#2E8C3B] text-white rounded-xl"
        >
          <Send />
        </button>
      </div>
    </div>
  );
}
