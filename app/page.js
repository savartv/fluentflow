'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '../utils/supabase/client';
import AIAssistant from '@/components/AIAssistant';
import RobotMentor from '@/components/RobotMentor';

export default function Home() {
  const [payOpen, setPayOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user || null);
    });
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <header className="nav">
        <div className="container nav-inner">
          <a href="#" className="logo">
            <span className="logo-mark">FF</span>
            <span>FluentFlow</span>
          </a>
          <nav className="nav-links">
            <a href="#features">Возможности</a>
            <a href="#movies">Фразы из фильмов</a>
            <a href="#assistant">AI-ассистент</a>
            <a href="#pricing">Тарифы</a>
          </nav>
          {user ? (
            <Link href="/dashboard" className="btn btn-primary">Личный кабинет</Link>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost">Войти</Link>
              <Link href="/login" className="btn btn-primary">Начать бесплатно</Link>
            </>
          )}
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-text">
            <div className="badge">🔥 Английский, который реально работает</div>
            <h1>Говори как <span className="grad">носитель</span>, а не как учебник</h1>
            <p className="lead">
              Сокращения, живое произношение, фразы из фильмов и AI-собеседник,
              который общается с тобой голосом на английском и объясняет на русском.
            </p>
            <div className="hero-cta">
              <a href="#pricing" className="btn btn-primary btn-lg">Попробовать 7 дней бесплатно</a>
              <a href="#movies" className="btn btn-ghost btn-lg">▶ Смотреть демо</a>
            </div>
            <div className="hero-stats">
              <div><strong>12 400+</strong><span>учеников</span></div>
              <div><strong>4.9★</strong><span>рейтинг</span></div>
              <div><strong>449 ₽</strong><span>в месяц</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <RobotMentor />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="section">
        <div className="container">
          <h2 className="section-title">Почему FluentFlow помогает <span className="grad">по-настоящему</span></h2>
          <p className="section-sub">Не очередное приложение с карточками. Мы учим говорить, а не заучивать.</p>

          <div className="grid-3">
            <div className="card">
              <div className="card-icon">🗣️</div>
              <h3>Разговорная речь</h3>
              <p>Учим сокращениям: gonna, wanna, ain't, gotta — как реально говорят носители.</p>
            </div>
            <div className="card">
              <div className="card-icon">🎬</div>
              <h3>Фразы из фильмов</h3>
              <p>Живые вырезки из кино — слышишь, как звучит фраза в реальном контексте.</p>
            </div>
            <div className="card">
              <div className="card-icon">🤖</div>
              <h3>AI-собеседник</h3>
              <p>Голосовое общение, ролевые игры и объяснения на русском, когда непонятно.</p>
            </div>
            <div className="card">
              <div className="card-icon">✅</div>
              <h3>Обязательные тесты</h3>
              <p>Без прохождения теста — не идёшь дальше. Так прогресс реально закрепляется.</p>
            </div>
            <div className="card">
              <div className="card-icon">🔊</div>
              <h3>Произношение</h3>
              <p>Разбор звуков, ударений и интонаций с обратной связью от AI.</p>
            </div>
            <div className="card">
              <div className="card-icon">📚</div>
              <h3>С нуля до свободы</h3>
              <p>Стартуешь с алфавита — заканчиваешь уверенным диалогом с носителем.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MOVIES */}
      <section id="movies" className="section section-alt">
        <div className="container">
          <h2 className="section-title">Учи фразы из <span className="grad">легендарных фильмов</span></h2>
          <p className="section-sub">Слышишь — повторяешь — понимаешь, как это звучит вживую.</p>

          <div className="movies">
            <div className="movie-card">
              <div className="movie-poster" style={{ background: 'linear-gradient(135deg,#1a2a6c,#b21f1f)' }}>
                <span className="play">▶</span>
              </div>
              <div className="movie-info">
                <h4>Star Wars</h4>
                <p>"May the Force be with you."</p>
                <small>Произношение: /meɪ ðə fɔːrs biː wɪð juː/</small>
              </div>
            </div>
            <div className="movie-card">
              <div className="movie-poster" style={{ background: 'linear-gradient(135deg,#232526,#414345)' }}>
                <span className="play">▶</span>
              </div>
              <div className="movie-info">
                <h4>Terminator</h4>
                <p>"I'll be back." → <em>Я вернусь</em></p>
                <small>Сокращение: I will → I'll</small>
              </div>
            </div>
            <div className="movie-card">
              <div className="movie-poster" style={{ background: 'linear-gradient(135deg,#0f2027,#2c5364)' }}>
                <span className="play">▶</span>
              </div>
              <div className="movie-info">
                <h4>Jaws</h4>
                <p>"You're gonna need a bigger boat."</p>
                <small>gonna = going to (разговорное)</small>
              </div>
            </div>
            <div className="movie-card">
              <div className="movie-poster" style={{ background: 'linear-gradient(135deg,#42275a,#734b6d)' }}>
                <span className="play">▶</span>
              </div>
              <div className="movie-info">
                <h4>The Dark Knight</h4>
                <p>"Why so serious?"</p>
                <small>Интонация вопроса — важно!</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI ASSISTANT */}
      <AIAssistant />

      {/* TRANSLATOR */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="section-title">Быстрый <span className="grad">переводчик</span></h2>
          <p className="section-sub">Найди перевод и узнай, как это звучит у носителей.</p>

          <div className="translator">
            <textarea placeholder="Введи слово или фразу..." rows={3}></textarea>
            <button className="btn btn-primary" style={{ marginTop: 16 }}>Перевести</button>
            <div className="trans-output" style={{ marginTop: 16 }}>Здесь появится перевод 👀</div>
          </div>
        </div>
      </section>

      {/* QUIZ */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Тест, который <span className="grad">нельзя пропустить</span></h2>
          <p className="section-sub">Проверь, как ты понял сокращения. Без правильного ответа — следующего урока не будет 😉</p>

          <div className="quiz">
            <div className="quiz-q">Что означает <strong>"I'm gonna go"</strong>?</div>
            <div className="quiz-options">
              <button>Я иду в магазин</button>
              <button>Я собираюсь пойти</button>
              <button>Я хочу есть</button>
              <button>Я устал</button>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="section section-alt">
        <div className="container">
          <h2 className="section-title">Всего <span className="grad">449 ₽</span> в месяц</h2>
          <p className="section-sub">Полный доступ. Отмена в любой момент. 7 дней бесплатно.</p>

          <div className="pricing-card">
            <div className="pricing-badge">Хит</div>
            <h3>FluentFlow Premium</h3>
            <div className="price"><span>449 ₽</span> / месяц</div>
            <ul className="features-list">
              <li>✅ Полный курс с нуля до свободного общения</li>
              <li>✅ AI-ассистент с голосом и ролевыми играми</li>
              <li>✅ Библиотека фраз из фильмов</li>
              <li>✅ Обязательные тесты и закрепление</li>
              <li>✅ Тренажёр произношения</li>
              <li>✅ Встроенный переводчик</li>
              <li>✅ Мобильное приложение</li>
            </ul>
            <button className="btn btn-primary btn-lg" onClick={() => setPayOpen(true)}>
              Оформить за 449 ₽
            </button>
            <small className="pricing-note">Безопасная оплата • Отмена в 1 клик</small>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <div className="logo"><span className="logo-mark">FF</span><span>FluentFlow</span></div>
            <p>Говори как носитель. С нуля и по-настоящему.</p>
          </div>
          <div>
            <h5>Продукт</h5>
            <a href="#features">Возможности</a>
            <a href="#assistant">AI-ассистент</a>
            <a href="#pricing">Тарифы</a>
          </div>
          <div>
            <h5>Компания</h5>
            <a href="#">О нас</a>
            <a href="#">Контакты</a>
            <a href="#">Блог</a>
          </div>
        </div>
        <div className="container copyright">© 2025 FluentFlow. Все права защищены.</div>
      </footer>

      {/* PAYMENT MODAL */}
      {payOpen && (
        <div className="modal open" onClick={() => setPayOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setPayOpen(false)}>✕</button>
            <h3>Оформление подписки</h3>
            <p className="modal-sub">FluentFlow Premium — 449 ₽ / месяц</p>
            <div className="pay-methods">
              <button className="pay-btn">💳 Банковская карта</button>
              <button className="pay-btn">📱 СБП</button>
              <button className="pay-btn">🍎 Apple Pay</button>
              <button className="pay-btn">🤖 Google Pay</button>
            </div>
            <button className="btn btn-primary btn-lg full" onClick={() => {
              alert('Это демо. Здесь будет подключена реальная оплата ЮKassa.');
              setPayOpen(false);
            }}>Оплатить 449 ₽</button>
          </div>
        </div>
      )}
    </>
  );
}