"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Clock3, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { sessions } from "@/lib/content";

const days = [
  { short: "ВТ", date: "14", full: "Вторник" },
  { short: "СР", date: "15", full: "Среда" },
  { short: "ЧТ", date: "16", full: "Четверг" },
  { short: "ПТ", date: "17", full: "Пятница" },
  { short: "СБ", date: "18", full: "Суббота" },
  { short: "ВС", date: "19", full: "Воскресенье" },
];

const filters = [
  { value: "all", label: "Все" },
  { value: "strength", label: "Strength" },
  { value: "pilates", label: "Pilates" },
  { value: "conditioning", label: "Conditioning" },
  { value: "recovery", label: "Recovery" },
];

export function Schedule({ onBook }: { onBook: (program: string) => void }) {
  const [day, setDay] = useState(0);
  const [filter, setFilter] = useState("all");

  const visible = useMemo(
    () => sessions.filter((session) => session.day === day && (filter === "all" || session.category === filter)),
    [day, filter],
  );

  return (
    <section className="schedule-section" id="schedule">
      <div className="section-shell">
        <div className="section-heading schedule-heading">
          <div>
            <p className="eyebrow">THIS WEEK · MOSCOW</p>
            <h2>Ваше время.<br /><em>Ваш ритм.</em></h2>
          </div>
          <p className="heading-copy">16 классов ежедневно. Выберите практику под своё состояние — от высокой интенсивности до полного восстановления.</p>
        </div>

        <div className="schedule-controls">
          <div className="day-tabs" role="tablist" aria-label="Выберите день">
            {days.map((item, index) => (
              <button key={item.date} className={day === index ? "day-tab active" : "day-tab"} onClick={() => setDay(index)} role="tab" aria-selected={day === index}>
                <span>{item.short}</span><strong>{item.date}</strong>
              </button>
            ))}
          </div>
          <div className="class-filters">
            {filters.map((item) => (
              <button key={item.value} className={filter === item.value ? "active" : ""} onClick={() => setFilter(item.value)}>{item.label}</button>
            ))}
          </div>
        </div>

        <div className="schedule-list">
          <AnimatePresence mode="popLayout">
            {visible.length ? visible.map((session) => (
              <motion.article
                layout
                className={`schedule-row ${session.category}`}
                key={session.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <div className="session-time">{session.time}</div>
                <div className="session-title">
                  <span className="session-dot" />
                  <div><h3>{session.title}</h3><p>с {session.coach}</p></div>
                </div>
                <div className="session-meta"><span><Clock3 size={15} /> {session.duration} мин</span><span><Users size={15} /> {session.spots} мест</span></div>
                <button className="session-book" onClick={() => onBook(session.title)} aria-label={`Записаться на ${session.title}`}>
                  <span>Записаться</span><ArrowUpRight size={19} />
                </button>
              </motion.article>
            )) : (
              <motion.div className="schedule-empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                На {days[day].full.toLowerCase()} классов в этой категории нет — выберите другой фильтр.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <p className="schedule-note">Расписание обновляется каждую неделю · Отмена без списания за 8 часов</p>
      </div>
    </section>
  );
}
