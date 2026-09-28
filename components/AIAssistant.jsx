'use client';
import { useState, useRef, useEffect } from 'react';

const ROLES = [
  { id: 'cafe', label: '☕ В кафе', greeting: "Welcome to the café! I'm your barista. What would you like to order? ☕" },
  { id: 'airport', label: '✈️ В аэропорту', greeting: "Good afternoon! May I see your passport, please? ✈️" },
  { id: 'interview', label: '💼 Собеседование', greeting: "Hello! Thanks for coming in. Tell me a little about yourself. 💼" },
  { id: 'friend', label: '👋 Знакомство', greeting: "Hey! Nice to meet you! What's your name? 😊" },
  { id: 'doctor', label: '🩺 У врача', greeting: "Hello! Please, have a seat. What seems to be the problem? 🩺" },
  { id: 'shopping', label: '🛍️ Магазин', greeting: "Hi there! Are you looking for something specific? 🛍️" },
];

export default function AIAssistant() {
  const [role, setRole] = useState('cafe');
  const [messages, setMessages] = useState([
    { sender: 'assistant', content: ROLES[0].greeting },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    bodyRef.current?.scrollTo(0, bodyRef.current.scrollHeight);
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;
    const newMsgs = [...messages, { sender: 'user', content: text }];
    setMessages(newMsgs);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMsgs.slice(-10), role }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages((m) => [...m, { sender: 'assistant', content: data.reply }]);
      } else {
        setMessages((m) => [...m, { sender: 'assistant', content: 'Ошибка: ' + (data.error || 'нет ответа') }]);
      }
    } catch (e) {
      setMessages((m) => [...m, { sender: 'assistant', content: 'Сетевая ошибка 😔' }]);
    } finally {
      setLoading(false);
    }
  };

  const changeRole = (newRole) => {
    setRole(newRole);
    const g = ROLES.find((r) => r.id === newRole).greeting;
    setMessages([{ sender: 'assistant', content: g }]);
  };

  return (
    <section id="assistant" className="section">
      <div className="container">
        <h2 className="section-title">
          Твой личный <span className="grad">AI-ассистент</span>
        </h2>
        <p className="section-sub">
          Голосовой чат, ролевые игры, объяснения на русском. Попробуй прямо сейчас 👇
        </p>

        <div className="assistant-wrap">
          <div className="assistant-controls">
            <h3>Ролевая игра</h3>
            <div className="roles">
              {ROLES.map((r) => (
                <button
                  key={r.id}
                  className={`role-btn ${role === r.id ? 'active' : ''}`}
                  onClick={() => changeRole(r.id)}
                >
                  {r.label}
                </button>
              ))}
            </div>

            <div className="assistant-hint">
              <strong>Подсказка:</strong> ассистент отвечает на английском,
              но объясняет сложные слова на русском.
            </div>
          </div>

          <div className="chat">
            <div className="chat-header">
              <div className="avatar">AI</div>
              <div>
                <strong>FluentFlow Assistant</strong>
                <span className="status">● онлайн</span>
              </div>
            </div>

            <div className="chat-body" ref={bodyRef}>
              {messages.map((m, i) => (
                <div key={i} className={`msg ${m.sender === 'user' ? 'user' : 'ai'}`}>
                  {m.content}
                </div>
              ))}
              {loading && (
                <div className="msg ai" style={{ opacity: 0.5 }}>
                  печатает...
                </div>
              )}
            </div>

            <form
              className="chat-input"
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Напиши сообщение..."
                autoComplete="off"
                disabled={loading}
              />
              <button type="submit" className="btn btn-primary" disabled={loading}>
                ➤
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
