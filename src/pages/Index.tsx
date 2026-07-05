import { useState, useMemo } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

/* ═══════════════════════════════════════════════════════════
   ВАШИ ИЗОБРАЖЕНИЯ — просто вставьте сюда ссылки на свои картинки.
   Оставьте пустую строку '' чтобы использовать оформление по умолчанию.
   ═══════════════════════════════════════════════════════════ */
const IMAGES = {
  logo: '',        // Логотип (вместо иконки луны) — квадратное изображение
  cardBack: '',    // Рубашка карт Таро — вертикальная картинка 2:3
  background: '',  // Фоновое изображение всего приложения
};

const DEFAULT_CARD_BACK = 'https://cdn.poehali.dev/projects/7823b243-974a-49d8-a9bf-5cbea3630c31/files/f092498a-ec3e-42a4-9635-2f95708e4e1b.jpg';
const CARD_BACK = IMAGES.cardBack || DEFAULT_CARD_BACK;

type TarotCard = {
  name: string;
  arcana: string;
  meaning: string;
  reading: string;
  image?: string; // ← вставьте сюда ссылку на свою иллюстрацию карты
};

const DECK: TarotCard[] = [
  { name: 'Звезда', arcana: 'XVII Старший Аркан', meaning: 'Надежда, вдохновение, обновление', reading: 'Перед вами открывается период исцеления и веры в будущее. Вселенная посылает знак, что путь, который вы выбрали, верен. Доверьтесь интуиции — она ведёт к свету.', image: '' },
  { name: 'Маг', arcana: 'I Старший Аркан', meaning: 'Воля, мастерство, начало', reading: 'У вас есть все инструменты для воплощения замысла. Сейчас момент силы — действуйте смело. Энергия творения течёт через вас, превращая идеи в реальность.', image: '' },
  { name: 'Луна', arcana: 'XVIII Старший Аркан', meaning: 'Тайны, интуиция, иллюзии', reading: 'Не всё то, чем кажется. Прислушайтесь к снам и предчувствиям — подсознание раскрывает скрытую правду. Доверьтесь внутреннему голосу сквозь туман неопределённости.', image: '' },
  { name: 'Солнце', arcana: 'XIX Старший Аркан', meaning: 'Радость, успех, ясность', reading: 'Тёплый свет озаряет вашу жизнь. Это карта чистого счастья, признания и жизненной силы. Впереди — триумф и гармония во всех начинаниях.', image: '' },
  { name: 'Колесо Фортуны', arcana: 'X Старший Аркан', meaning: 'Перемены, судьба, циклы', reading: 'Колесо судьбы поворачивается в вашу пользу. Грядут перемены, которые откроют новые возможности. Примите поток жизни — удача на вашей стороне.', image: '' },
  { name: 'Влюблённые', arcana: 'VI Старший Аркан', meaning: 'Любовь, выбор, союз', reading: 'Перед вами важный выбор сердца. Гармония отношений и глубокая связь становятся доступны. Следуйте за тем, что заставляет душу резонировать.', image: '' },
];

const FEATURES = [
  { icon: 'Sparkles', title: 'ИИ-расшифровка', text: 'Каждый расклад глубоко интерпретируется искусственным интеллектом с учётом вашего вопроса' },
  { icon: 'Layers', title: 'Авторские расклады', text: 'От простой карты дня до сложных кельтских крестов — выбирайте по настроению' },
  { icon: 'BookOpen', title: 'Справочник Арканов', text: 'Полная база значений всех 78 карт с историей и символикой' },
  { icon: 'History', title: 'История гаданий', text: 'Все ваши расклады сохраняются — возвращайтесь к ним в любой момент' },
];

const PLANS = [
  { name: 'Странник', price: '0', period: 'навсегда', features: ['3 гадания в день', 'Базовая расшифровка', 'Карта дня'], cta: 'Начать бесплатно', highlight: false },
  { name: 'Мистик', price: '400', period: 'в месяц', features: ['Безлимитные гадания', 'Глубокая ИИ-расшифровка', 'Все виды раскладов', 'История без ограничений', 'Без рекламы'], cta: 'Раскрыть тайны', highlight: true },
];

const NAV = ['Главная', 'Гадание', 'Справочник', 'История', 'Кабинет', 'Об авторе'];

function StarField() {
  const stars = useMemo(
    () =>
      Array.from({ length: 60 }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2.5 + 0.5,
        delay: Math.random() * 4,
        duration: Math.random() * 3 + 2,
      })),
    []
  );
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((s, i) => (
        <span
          key={i}
          className="star animate-twinkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Index() {
  const [drawn, setDrawn] = useState<TarotCard | null>(null);
  const [flipping, setFlipping] = useState(false);
  const [question, setQuestion] = useState('');

  const drawCard = () => {
    setFlipping(true);
    setDrawn(null);
    setTimeout(() => {
      const card = DECK[Math.floor(Math.random() * DECK.length)];
      setDrawn(card);
      setFlipping(false);
    }, 700);
  };

  return (
    <div className="relative min-h-screen text-foreground overflow-x-hidden">
      {/* Своё фоновое изображение (если задано в IMAGES.background) */}
      {IMAGES.background && (
        <div
          className="fixed inset-0 z-0 bg-cover bg-center opacity-40 pointer-events-none"
          style={{ backgroundImage: `url(${IMAGES.background})` }}
        />
      )}
      <StarField />

      {/* NAV */}
      <header className="relative z-20 flex items-center justify-between px-6 md:px-12 py-6">
        <div className="flex items-center gap-2">
          {IMAGES.logo ? (
            <img src={IMAGES.logo} alt="Логотип" className="w-8 h-8 rounded-lg object-cover" />
          ) : (
            <Icon name="Moon" className="text-gold" size={26} />
          )}
          <span className="font-display text-2xl font-semibold tracking-wide gold-shimmer">Аркана</span>
        </div>
        <nav className="hidden md:flex items-center gap-7">
          {NAV.map((item) => (
            <a key={item} href="#" className="text-sm text-muted-foreground hover:text-gold transition-colors duration-300">
              {item}
            </a>
          ))}
        </nav>
        <Button variant="outline" className="border-gold/40 text-gold hover:bg-gold/10 hover:text-gold rounded-full">
          Войти
        </Button>
      </header>

      {/* HERO */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-16 md:pt-24 pb-12">
        <div className="animate-fade-in-down inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs tracking-widest uppercase text-gold mb-8">
          <Icon name="Sparkles" size={14} /> Гадание с искусственным интеллектом
        </div>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-[1.05] max-w-4xl animate-fade-in">
          Загляни за <span className="text-gold-gradient italic">завесу</span> судьбы
        </h1>
        <p className="mt-6 max-w-xl text-muted-foreground text-lg animate-fade-in" style={{ animationDelay: '0.15s', opacity: 0 }}>
          Карты Таро раскроют тайны, а искусственный интеллект превратит древние символы в персональное послание именно для вас.
        </p>

        {/* QUESTION INPUT */}
        <div className="mt-10 w-full max-w-lg animate-scale-in" style={{ animationDelay: '0.3s', opacity: 0 }}>
          <div className="glass rounded-2xl p-1.5 flex items-center gap-2">
            <Icon name="Feather" className="text-gold ml-3" size={18} />
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Задай вопрос Вселенной..."
              className="flex-1 bg-transparent outline-none py-3 text-foreground placeholder:text-muted-foreground/70"
            />
            <Button onClick={drawCard} className="rounded-xl bg-gold text-primary-foreground hover:bg-gold/90 font-medium glow-gold">
              Гадать
            </Button>
          </div>
        </div>
      </section>

      {/* CARD READING */}
      <section className="relative z-10 flex flex-col items-center px-6 pb-20">
        <div className="relative" style={{ perspective: '1200px' }}>
          <div
            className={`w-52 h-80 md:w-60 md:h-96 rounded-2xl overflow-hidden glow-gold ${
              drawn ? 'animate-flip-card' : 'animate-float'
            }`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {drawn ? (
              drawn.image ? (
                <div className="w-full h-full relative">
                  <img src={drawn.image} alt={drawn.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-center bg-gradient-to-t from-black/70 to-transparent">
                    <h3 className="font-display text-2xl font-semibold text-white">{drawn.name}</h3>
                    <p className="text-[10px] tracking-widest uppercase text-white/70">{drawn.arcana}</p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full card-back flex flex-col items-center justify-center p-6 text-center">
                  <Icon name="Star" className="text-primary mb-4 animate-glow-pulse" size={40} />
                  <h3 className="font-display text-3xl font-semibold text-gold-gradient">{drawn.name}</h3>
                  <p className="text-[11px] tracking-widest uppercase text-muted-foreground mt-2">{drawn.arcana}</p>
                  <div className="w-12 h-px bg-primary/40 my-4" />
                  <p className="text-foreground/70 italic font-display text-lg leading-snug">{drawn.meaning}</p>
                </div>
              )
            ) : (
              <img src={CARD_BACK} alt="Карта Таро" className="w-full h-full object-cover" />
            )}
          </div>
        </div>

        {/* AI READING */}
        {drawn && (
          <div className="mt-10 max-w-xl glass rounded-2xl p-7 animate-fade-in">
            <div className="flex items-center gap-2 text-gold mb-3">
              <Icon name="Sparkles" size={18} />
              <span className="text-sm uppercase tracking-widest">Расшифровка ИИ</span>
            </div>
            <p className="text-foreground/90 leading-relaxed">{drawn.reading}</p>
            <button onClick={drawCard} className="mt-5 inline-flex items-center gap-2 text-gold text-sm hover:gap-3 transition-all">
              Вытянуть другую карту <Icon name="RefreshCw" size={15} />
            </button>
          </div>
        )}
        {flipping && (
          <p className="mt-10 text-muted-foreground animate-twinkle font-display text-xl italic">Карты тасуются...</p>
        )}
      </section>

      {/* FEATURES */}
      <section className="relative z-10 px-6 md:px-12 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-gold text-sm uppercase tracking-[0.3em] mb-3">Возможности</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold">Всё для глубокого погружения</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f) => (
            <div key={f.title} className="glass rounded-2xl p-7 hover:border-gold/40 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                <Icon name={f.icon} className="text-gold" size={24} />
              </div>
              <h3 className="font-display text-2xl font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="relative z-10 px-6 md:px-12 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-gold text-sm uppercase tracking-[0.3em] mb-3">Подписка</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold">Выбери свой путь</h2>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto">Безлимитные гадания и премиум-расшифровки для тех, кто ищет глубже.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6 items-start max-w-2xl mx-auto">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl p-8 transition-all duration-300 ${
                plan.highlight
                  ? 'glass border-gold/50 glow-gold md:-translate-y-4 relative'
                  : 'glass hover:-translate-y-1'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold text-primary-foreground text-xs font-semibold tracking-wide">
                  Популярный
                </div>
              )}
              <h3 className="font-display text-3xl font-semibold mb-1">{plan.name}</h3>
              <div className="flex items-end gap-1.5 my-5">
                <span className="text-4xl font-bold text-gold-gradient">{plan.price === '0' ? '0 ₽' : `${plan.price} ₽`}</span>
                <span className="text-muted-foreground text-sm mb-1">/ {plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3 text-sm text-foreground/85">
                    <Icon name="Check" className="text-gold shrink-0" size={16} />
                    {feat}
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full rounded-xl font-medium ${
                  plan.highlight
                    ? 'bg-gold text-primary-foreground hover:bg-gold/90'
                    : 'bg-secondary text-foreground hover:bg-secondary/70 border border-gold/20'
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 py-24 text-center">
        <Icon name="Moon" className="text-gold mx-auto mb-6 animate-float" size={48} />
        <h2 className="font-display text-4xl md:text-6xl font-semibold max-w-2xl mx-auto leading-tight">
          Судьба ждёт твоего <span className="text-gold-gradient italic">вопроса</span>
        </h2>
        <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="mt-8 rounded-full bg-gold text-primary-foreground hover:bg-gold/90 px-8 py-6 text-base font-medium glow-gold">
          Начать гадание <Icon name="ArrowUp" className="ml-2" size={18} />
        </Button>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-border/50 px-6 md:px-12 py-10 mt-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Icon name="Moon" className="text-gold" size={20} />
            <span className="font-display text-xl font-semibold gold-shimmer">Аркана</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 Аркана — гадание Таро с ИИ. Создано с любовью к тайнам Вселенной.</p>
          <div className="flex gap-4">
            <Icon name="Send" className="text-muted-foreground hover:text-gold transition-colors cursor-pointer" size={18} />
            <Icon name="Mail" className="text-muted-foreground hover:text-gold transition-colors cursor-pointer" size={18} />
            <Icon name="Instagram" className="text-muted-foreground hover:text-gold transition-colors cursor-pointer" size={18} />
          </div>
        </div>
      </footer>
    </div>
  );
}