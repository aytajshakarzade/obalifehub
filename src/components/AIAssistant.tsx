import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Mic } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card } from './Card';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export function AIAssistant() {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      text: t('assistant.needHelp'),
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responses = getAssistantResponse(messageText.toLowerCase());
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        text: responses,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const getAssistantResponse = (input: string): string => {
    if (input.includes('store') || input.includes('where')) {
      return 'The nearest OBA store is 0.8 km away. It opens at 8:00 AM tomorrow. Would you like directions?';
    } else if (input.includes('coin') || input.includes('balance')) {
      return 'You currently have 82 Green Coins! You\'re on the Silver level. Just 18 more coins to reach Gold!';
    } else if (input.includes('discount') || input.includes('reward')) {
      return 'You have several great rewards available:\n• Free Tea (20 coins)\n• 10% Discount (50 coins)\n• Free Delivery (60 coins)';
    } else if (input.includes('kids') || input.includes('activity')) {
      return 'The Kids Zone has 8 fun activities ready! Try "Pick 3 Fruits" for 2 coins, or "Memory Match" for 4 coins. Which one sounds fun?';
    } else if (input.includes('language') || input.includes('lang')) {
      return 'I support 5 languages: English, Azerbaijani, Turkish, Russian, and Arabic. Your current language is ' + language + '. Would you like to change it?';
    } else if (input.includes('help')) {
      return 'I can help you with:\n• Finding nearby stores\n• Checking your balance\n• Showing available rewards\n• Explaining how to use Kids Zone\n• Changing language\n\nWhat would you like help with?';
    } else {
      return 'That\'s a great question! I can help you navigate the app. Try asking about stores, coins, rewards, activities, or language settings!';
    }
  };

  const quickSuggestions = [
    t('assistant.whereNearest'),
    t('assistant.howManyCoins'),
    t('assistant.help'),
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-2xl flex items-center justify-center text-white animate-pulse hover:animate-bounce transition-all z-40"
      >
        <MessageCircle className="w-8 h-8" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 h-96 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl flex flex-col z-50">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-t-3xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="font-semibold">{t('assistant.title')}</p>
            <p className="text-xs text-blue-100">Always here to help</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="hover:bg-white/20 p-2 rounded-full transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl ${
                message.type === 'user'
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-none shadow'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.text}</p>
              <p className={`text-xs ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'} mt-1`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-2xl rounded-bl-none shadow">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}

        {messages.length === 1 && !isTyping && (
          <div className="space-y-2 mt-4">
            <p className="text-xs text-gray-500 font-semibold px-2">{t('assistant.suggestions')}</p>
            {quickSuggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(suggestion)}
                className="w-full text-left text-sm bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-3 py-2 rounded-lg transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="border-t dark:border-gray-700 p-3 bg-white dark:bg-gray-900 rounded-b-3xl">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
            placeholder={t('assistant.placeholder')}
            className="flex-1 bg-gray-100 dark:bg-gray-800 border-0 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          />
          <button
            onClick={() => handleSend()}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
          <button className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full p-2 transition-colors">
            <Mic className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
