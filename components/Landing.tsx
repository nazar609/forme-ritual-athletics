"use client";

import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Instagram, Menu, MoveRight, Quote, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { memberships, programs } from "@/lib/content";
import { Schedule } from "./Schedule";
import { TrialModal } from "./TrialModal";

const reveal = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

const coaches = [
  { name: "Элиас Морено", role: "Strength & Conditioning", exp: "12 лет опыта", image: asset("/images/coach-elias.png"), position: "50% 30%" },
  { name: "Майя Волкова", role: "FORME Method", exp: "Founder trainer", image: asset("/images/forme-sculpt.png"), position: "59% 36%" },
  { name: "Саша Рэй", role: "Mobility & Recovery", exp: "Breathwork coach", image: asset("/images/forme-reset.png"), position: "46% 58%" },
];

const tickerWords = [
  "STRENGTH",
  "CONTROL",
  "RECOVERY",
  "COMMUNITY",
  "MOBILITY",
  "PRESENCE",
  "ENDURANCE",
  "BALANCE",
  "ENERGY",
  "RITUAL",
  "ALIGNMENT",
  "FOCUS",
  "POWER",
  "LONGEVITY",
];

export default function Landing() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string>();
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const { scrollYProgress: pageProgress } = useScroll();

  function book(program?: string) {
    setSelectedProgram(program);
    setModalOpen(true);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main>
      <motion.div className="scroll-progress" style={{ scaleX: pageProgress }} />
      <header className="site-header">
        <a href="#top" className="brand" aria-label="FORME — на главную">
          <span className="brand-mark">F/</span><span>FORME</span>
        </a>
        <nav className="desktop-nav" aria-label="Основная навигация">
          <a href="#programs">Метод</a>
          <a href="#schedule">Расписание</a>
          <a href="#coaches">Команда</a>
          <a href="#membership">Membership</a>
        </nav>
        <button className="header-cta" onClick={() => book()}>Первый класс <ArrowUpRight size={16} /></button>
        <button className="menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Открыть меню"><Menu /></button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="mobile-menu" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
            <div className="mobile-menu-top"><span className="brand"><span className="brand-mark">F/</span><span>FORME</span></span><button onClick={() => setMenuOpen(false)} aria-label="Закрыть меню"><X /></button></div>
            <nav>
              <a href="#programs" onClick={() => setMenuOpen(false)}>01 <span>Метод</span></a>
              <a href="#schedule" onClick={() => setMenuOpen(false)}>02 <span>Расписание</span></a>
              <a href="#coaches" onClick={() => setMenuOpen(false)}>03 <span>Команда</span></a>
              <a href="#membership" onClick={() => setMenuOpen(false)}>04 <span>Membership</span></a>
            </nav>
            <button className="button button-citron" onClick={() => book()}>Записаться на первый класс <ArrowRight /></button>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="hero" id="top" ref={heroRef}>
        <motion.div className="hero-image" style={{ scale: imageScale }}>
          <Image src={asset("/images/forme-hero.png")} alt="Атлетичная девушка тренируется в студии FORME" fill priority sizes="100vw" />
        </motion.div>
        <div className="hero-shade" />
        <motion.div className="hero-content" style={{ y: heroTextY, opacity: heroOpacity }}>
          <div className="hero-kicker"><span>RITUAL ATHLETICS</span><span>MOSCOW · 2026</span></div>
          <h1><span>Move with</span><em>intention.</em></h1>
          <div className="hero-bottom">
            <p>Boutique fitness и wellness-пространство,<br />где сильное тело становится вашим ритуалом.</p>
            <button className="button button-citron" onClick={() => book()}>Начать с первого класса <ArrowRight size={18} /></button>
          </div>
        </motion.div>
        <a href="#intro" className="scroll-cue"><span>SCROLL TO MOVE</span><ArrowDown size={17} /></a>
        <div className="hero-index">01—07</div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1].map((group) => (
            <div className="ticker-group" key={group}>
              {tickerWords.map((word) => <span key={word}>{word}<i>✦</i></span>)}
            </div>
          ))}
        </div>
      </div>

      <section className="intro section-shell" id="intro">
        <motion.div className="intro-aside" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
          <span>( НАШ МЕТОД )</span>
          <div className="intro-aside-bottom">
            <div className="intro-monogram" aria-hidden="true"><span>F</span><i>01</i></div>
            <p>Strong looks different<br />on everyone.</p>
          </div>
        </motion.div>
        <motion.div className="intro-statement" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
          <h2>Мы тренируем не ради цифр.<br />Мы создаём <em>форму жизни.</em></h2>
          <div className="intro-copy"><p>FORME объединяет силовой тренинг, athletic Pilates и восстановительные практики в одну продуманную систему.</p><p>Без культа изнеможения. С вниманием к технике, состоянию и прогрессу, который остаётся с вами.</p></div>
          <div className="method-pillars">
            <div><span>01</span><strong>STRENGTH</strong><p>Сила, которую можно применять в жизни.</p></div>
            <div><span>02</span><strong>CONTROL</strong><p>Точность движения и осознанная техника.</p></div>
            <div><span>03</span><strong>RECOVERY</strong><p>Восстановление как часть прогресса.</p></div>
          </div>
        </motion.div>
      </section>

      <section className="programs" id="programs">
        <div className="section-shell">
          <div className="section-label"><span>01</span><span>THE FORME METHOD</span><span>Выберите свой формат</span></div>
          <div className="program-grid">
            {programs.map((program, index) => (
              <motion.article
                className={`program-card program-${program.tone}`}
                key={program.title}
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
              >
                <Image src={program.image} alt={program.title} fill sizes="(max-width: 800px) 100vw, 33vw" />
                <div className="program-overlay" />
                <div className="program-top"><span>{program.index}</span><span>{program.eyebrow}</span></div>
                <div className="program-main">
                  <h3>{program.title}</h3>
                  <div className="program-reveal"><p>{program.description}</p><span>{program.meta}</span></div>
                </div>
                <button onClick={() => book(program.title)} aria-label={`Попробовать ${program.title}`}><ArrowUpRight /></button>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="numbers">
        <div className="section-shell numbers-grid">
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}><strong>8</strong><span>человек<br />в среднем в классе</span></motion.div>
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}><strong>94<sup>%</sup></strong><span>гостей чувствуют<br />результат за 30 дней</span></motion.div>
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}><strong>32</strong><span>класса<br />каждую неделю</span></motion.div>
          <div className="numbers-note"><Sparkles size={20} /><p>Progress is personal.<br />The energy is collective.</p></div>
        </div>
      </section>

      <Schedule onBook={book} />

      <section className="coaches" id="coaches">
        <div className="section-shell">
          <div className="section-heading coach-heading">
            <div><p className="eyebrow">EXPERTS IN MOVEMENT</p><h2>Люди, которые<br /><em>видят вас.</em></h2></div>
            <p className="heading-copy">Не мотиваторы с громкими лозунгами, а внимательные эксперты, которые замечают детали и выстраивают ваш прогресс.</p>
          </div>
          <div className="coach-grid">
            {coaches.map((coach, index) => (
              <motion.article className="coach-card" key={coach.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <div className="coach-image"><Image src={coach.image} alt={coach.name} fill sizes="(max-width: 760px) 100vw, 33vw" style={{ objectPosition: coach.position }} /></div>
                <div className="coach-info"><div><h3>{coach.name}</h3><p>{coach.role}</p></div><span>{coach.exp}</span></div>
              </motion.article>
            ))}
          </div>
          <div className="coach-manifesto"><span>THE STANDARD</span><p>Международные сертификации — лишь начало. Каждый тренер FORME проходит 120 часов обучения нашему методу и ежемесячные калибровки.</p><MoveRight /></div>
        </div>
      </section>

      <Membership onBook={book} />

      <section className="testimonials">
        <div className="section-shell">
          <div className="section-label light"><span>04</span><span>WORDS FROM THE FLOOR</span><span>Real people · real shifts</span></div>
          <div className="quote-grid">
            <motion.blockquote variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <Quote size={34} strokeWidth={1} />
              <p>«Здесь впервые не стыдно быть новичком. Через два месяца я стала сильнее, но важнее — перестала воевать с собственным телом».</p>
              <footer><span>Алина, 34</span><span>RITUAL member · 8 месяцев</span></footer>
            </motion.blockquote>
            <div className="quote-side">
              <div className="mini-quote"><p>«50 минут, после которых голова наконец выключается».</p><span>— Максим, основатель студии</span></div>
              <div className="mini-quote citron"><strong>4.9</strong><div><span>★★★★★</span><p>Средняя оценка<br />наших классов</p></div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="gallery" id="inside">
        <div className="gallery-title section-shell"><p className="eyebrow">INSIDE FORME</p><h2>More than a workout.<br /><em>A place to arrive.</em></h2></div>
        <div className="gallery-grid">
          <motion.figure className="gallery-a" whileInView={{ y: -22 }} transition={{ duration: 1.2 }}><Image src={asset("/images/forme-hero.png")} alt="Тренировочный зал FORME" fill sizes="60vw" /><figcaption>01 · TRAINING FLOOR</figcaption></motion.figure>
          <motion.figure className="gallery-b" whileInView={{ y: 18 }} transition={{ duration: 1.2 }}><Image src={asset("/images/forme-reset.png")} alt="Recovery lounge FORME" fill sizes="40vw" /><figcaption>02 · RECOVERY LOUNGE</figcaption></motion.figure>
          <figure className="gallery-c"><Image src={asset("/images/coach-elias.png")} alt="Тренер FORME" fill sizes="30vw" /><figcaption>03 · THE TEAM</figcaption></figure>
          <figure className="gallery-d"><Image src={asset("/images/forme-sculpt.png")} alt="Групповой класс FORME" fill sizes="70vw" /><figcaption>04 · COLLECTIVE ENERGY</figcaption></figure>
        </div>
      </section>

      <section className="final-cta">
        <div className="cta-orbit" aria-hidden="true"><span>F</span></div>
        <div className="section-shell cta-inner">
          <p className="eyebrow">YOUR FIRST MOVE</p>
          <h2>Начните с одного<br /><em>правильного часа.</em></h2>
          <p>Первый класс — 1 500 ₽. Включает знакомство с пространством, тренировку и короткий check-in с тренером.</p>
          <button className="button button-dark button-large" onClick={() => book()}>Записаться на пробный класс <ArrowRight /></button>
        </div>
      </section>

      <footer className="footer">
        <div className="section-shell footer-grid">
          <div className="footer-brand"><span className="brand"><span className="brand-mark">F/</span><span>FORME</span></span><p>Ritual athletics for<br />modern life.</p></div>
          <div><h4>Студия</h4><a href="#programs">Метод</a><a href="#schedule">Расписание</a><a href="#coaches">Тренеры</a><a href="#membership">Membership</a></div>
          <div><h4>Контакты</h4><p>Москва, ул. Большая<br />Дмитровка, 12</p><a href="tel:+74951205020">+7 495 120-50-20</a><a href="mailto:hello@forme.club">hello@forme.club</a></div>
          <div><h4>Часы работы</h4><p>Пн–Пт · 06:30–22:30<br />Сб–Вс · 08:00–21:00</p><a className="social" href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram size={17} /> Instagram</a></div>
        </div>
        <div className="section-shell footer-bottom"><span>© 2026 FORME STUDIO</span><span>PRIVACY / TERMS</span><a href="#top">BACK TO TOP ↑</a></div>
      </footer>

      <TrialModal key={`${modalOpen}-${selectedProgram ?? "default"}`} open={modalOpen} onClose={() => setModalOpen(false)} initialProgram={selectedProgram} />
    </main>
  );
}

function Membership({ onBook }: { onBook: (program?: string) => void }) {
  const [annual, setAnnual] = useState(false);
  return (
    <section className="membership" id="membership">
      <div className="section-shell">
        <div className="membership-head">
          <div><p className="eyebrow">MEMBERSHIP, NOT JUST ACCESS</p><h2>Ритуал, который<br /><em>остаётся с вами.</em></h2></div>
          <div className="billing-toggle" aria-label="Период оплаты"><button className={!annual ? "active" : ""} onClick={() => setAnnual(false)}>Месяц</button><button className={annual ? "active" : ""} onClick={() => setAnnual(true)}>Год <span>−10%</span></button></div>
        </div>
        <div className="plan-grid">
          {memberships.map((plan, index) => {
            const amount = Number(plan.price.replace(" ", ""));
            const shown = annual ? Math.round(amount * 0.9).toLocaleString("ru-RU") : plan.price;
            return <motion.article className={plan.featured ? "plan-card featured" : "plan-card"} key={plan.name} initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
              {plan.featured && <div className="plan-badge">MOST LOVED</div>}
              <div className="plan-top"><p>{plan.note}</p><h3>{plan.name}</h3><span>{plan.sessions}</span></div>
              <div className="plan-price"><strong>{shown}</strong><span>₽ / {annual ? "мес. при оплате за год" : "месяц"}</span></div>
              <ul>{plan.features.map((feature) => <li key={feature}><Check size={15} /> {feature}</li>)}</ul>
              <button onClick={() => onBook("Помогите выбрать")}>Выбрать план <ArrowUpRight size={17} /></button>
            </motion.article>;
          })}
        </div>
        <p className="plan-footnote">Все membership-планы включают welcome-сессию и доступ в lounge-зону. <button onClick={() => onBook("Помогите выбрать")}>Сравнить условия →</button></p>
      </div>
    </section>
  );
}
