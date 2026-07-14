"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, LoaderCircle, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().trim().min(2, "Напишите, как к вам обращаться"),
  phone: z.string().trim().regex(/^[+\d\s()\-]{10,22}$/, "Проверьте номер телефона"),
  email: z.string().trim().email("Проверьте email"),
  program: z.string().min(2, "Выберите направление"),
  preferredTime: z.string().min(2, "Выберите удобное время"),
  consent: z.literal(true, { errorMap: () => ({ message: "Нужно согласие на обработку данных" }) }),
});

type FormData = z.infer<typeof formSchema>;
type Errors = Partial<Record<keyof FormData, string>>;

const initialData: FormData = {
  name: "",
  phone: "",
  email: "",
  program: "FORME / Sculpt",
  preferredTime: "Будни утром",
  consent: true,
};

interface TrialModalProps {
  open: boolean;
  onClose: () => void;
  initialProgram?: string;
}

export function TrialModal({ open, onClose, initialProgram }: TrialModalProps) {
  const [form, setForm] = useState<FormData>(() => ({
    ...initialData,
    program: initialProgram || initialData.program,
  }));
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const firstInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const timeout = window.setTimeout(() => firstInput.current?.focus(), 300);
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.clearTimeout(timeout);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, initialProgram, onClose]);

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    const parsed = formSchema.safeParse(form);
    if (!parsed.success) {
      const next: Errors = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof FormData;
        if (!next[key]) next[key] = issue.message;
      });
      setErrors(next);
      return;
    }

    setSending(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!response.ok) {
        if (!window.location.hostname.endsWith("github.io")) throw new Error("request failed");
        window.localStorage.setItem("forme:lastLead", JSON.stringify({ ...parsed.data, createdAt: new Date().toISOString() }));
      }
      setSuccess(true);
      setForm(initialData);
    } catch {
      if (window.location.hostname.endsWith("github.io")) {
        window.localStorage.setItem("forme:lastLead", JSON.stringify({ ...parsed.data, createdAt: new Date().toISOString() }));
        setSuccess(true);
        setForm(initialData);
      } else {
        setErrors({ name: "Не удалось отправить. Попробуйте ещё раз через минуту." });
      }
    } finally {
      setSending(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => event.currentTarget === event.target && onClose()}
        >
          <motion.div
            className="trial-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="trial-title"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            <button className="modal-close" onClick={onClose} aria-label="Закрыть форму">
              <X size={20} />
            </button>

            {success ? (
              <div className="success-state">
                <motion.div className="success-mark" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <Check size={32} strokeWidth={1.8} />
                </motion.div>
                <p className="eyebrow">YOU&apos;RE IN</p>
                <h2 id="trial-title">Первый шаг<br /><em>сделан.</em></h2>
                <p>Консьерж FORME свяжется с вами в течение 30 минут и поможет выбрать класс.</p>
                <button className="button button-dark" onClick={onClose}>Вернуться на сайт <ArrowRight size={16} /></button>
              </div>
            ) : (
              <>
                <div className="modal-heading">
                  <p className="eyebrow">FIRST SESSION · 1 500 ₽</p>
                  <h2 id="trial-title">Найдём ваш<br /><em>ритм.</em></h2>
                  <p>Оставьте контакты — наш консьерж подберёт класс и тренера под вашу цель.</p>
                </div>
                <form className="trial-form" onSubmit={submit} noValidate>
                  <div className="field full">
                    <label htmlFor="trial-name">Имя</label>
                    <input ref={firstInput} id="trial-name" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Как к вам обращаться?" aria-invalid={!!errors.name} />
                    {errors.name && <span className="field-error">{errors.name}</span>}
                  </div>
                  <div className="field">
                    <label htmlFor="trial-phone">Телефон</label>
                    <input id="trial-phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+7 999 000-00-00" aria-invalid={!!errors.phone} />
                    {errors.phone && <span className="field-error">{errors.phone}</span>}
                  </div>
                  <div className="field">
                    <label htmlFor="trial-email">Email</label>
                    <input id="trial-email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@email.com" aria-invalid={!!errors.email} />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </div>
                  <div className="field">
                    <label htmlFor="trial-program">Направление</label>
                    <select id="trial-program" value={form.program} onChange={(e) => update("program", e.target.value)}>
                      <option>FORME / Sculpt</option>
                      <option>Reform / Pilates</option>
                      <option>Pulse / Conditioning</option>
                      <option>Reset / Recover</option>
                      <option>Помогите выбрать</option>
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="trial-time">Предпочтительное время</label>
                    <select id="trial-time" value={form.preferredTime} onChange={(e) => update("preferredTime", e.target.value)}>
                      <option>Будни утром</option>
                      <option>Будни днём</option>
                      <option>Будни после 18:00</option>
                      <option>Выходные</option>
                    </select>
                  </div>
                  <label className="consent full">
                    <input type="checkbox" checked={form.consent} onChange={(e) => update("consent", e.target.checked as true)} />
                    <span>Согласен(а) на обработку данных и получение сервисных сообщений</span>
                  </label>
                  {errors.consent && <span className="field-error full">{errors.consent}</span>}
                  <button className="button button-citron submit-button full" disabled={sending}>
                    {sending ? <LoaderCircle className="spin" size={18} /> : <>Записаться на пробное <ArrowRight size={17} /></>}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
