// lib/deepseek.js — клиент для RouterAI (DeepSeek через российский шлюз)

const BASE_URL = process.env.ROUTERAI_BASE_URL || 'https://routerai.ru/api/v1';
const API_KEY = process.env.ROUTERAI_API_KEY;
const MODEL = process.env.ROUTERAI_MODEL || 'deepseek/deepseek-chat';

export const SYSTEM_PROMPT = `
Ты — FluentFlow Assistant, тёплый и терпеливый преподаватель английского языка.

ГЛАВНЫЕ ПРАВИЛА:
1. Отвечай преимущественно НА АНГЛИЙСКОМ, но если ученик пишет на русском или явно не понимает — объясняй сложные слова на русском.
2. Если ученик пишет по-русски — мягко подтолкни его к английскому: "Try saying it in English! For example: ..."
3. Всегда давай короткий перевод и произношение сложных слов: gonna = going to (разговорное сокращение).
4. Учи реальным разговорным сокращениям: gonna, wanna, gotta, ain't, 'em, 'cause, dunno.
5. Отвечай коротко (1-3 предложения). Не читай лекции.
6. Задавай ученику встречные вопросы — поддерживай диалог.
7. Если это ролевая игра — держись роли, но оставайся преподавателем внутри.
8. Исправляй ошибки мягко: сначала похвали, потом предложи более естественный вариант.
9. Используй эмодзи умеренно (1-2 на сообщение).
`;

export function buildRolePrompt(role) {
  const map = {
    cafe: 'Ты — бариста в кофейне. Принимай заказ, предлагай добавки, общайся дружелюбно.',
    airport: 'Ты — сотрудник аэропорта на стойке регистрации. Проверяешь паспорт, задаёшь вопросы о багаже и рейсе.',
    interview: 'Ты — HR-менеджер на собеседовании. Задаёшь стандартные вопросы о навыках и опыте.',
    friend: 'Ты — новый знакомый. Общайся легко, спрашивай о хобби, интересах, происхождении.',
    doctor: 'Ты — врач на приёме. Спрашиваешь о симптомах, даёшь простые советы.',
    shopping: 'Ты — продавец в магазине одежды. Помогаешь с выбором, размерами и ценой.',
  };
  return `\n\nРОЛЕВАЯ ИГРА: ${map[role] || map.friend}\nОставайся в роли, но мягко обучай, если ученик ошибается.`;
}

/**
 * Отправляет диалог в DeepSeek через RouterAI.
 * @param {Array} messages — [{ sender: 'user'|'assistant', content: '...' }]
 * @param {string} role — сценарий ролевой игры
 * @returns {Promise<string>} — текст ответа AI
 */
export async function chatWithAI(messages, role = 'friend') {
  if (!API_KEY) {
    throw new Error('ROUTERAI_API_KEY не задан в .env.local');
  }

  const body = {
    model: MODEL,
    temperature: 0.7,
    max_tokens: 400,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT + buildRolePrompt(role) },
      ...messages.slice(-12).map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.content,
      })),
    ],
  };

  const res = await fetch(`${BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error('RouterAI error:', res.status, errText);
    throw new Error(`AI вернул ошибку ${res.status}`);
  }

  const data = await res.json();
  const reply = data?.choices?.[0]?.message?.content?.trim();
  if (!reply) throw new Error('AI вернул пустой ответ');
  return reply;
}