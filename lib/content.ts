import type { ClassSession } from "./types";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;

export const programs = [
  {
    index: "01",
    title: "FORME / SCULPT",
    eyebrow: "Signature strength",
    description: "Силовой метод в темпе: малые группы, точная техника и нагрузка, которую чувствует всё тело.",
    meta: "50 мин · до 10 гостей",
    image: asset("/images/forme-sculpt.png"),
    tone: "dark",
  },
  {
    index: "02",
    title: "REFORM / PILATES",
    eyebrow: "Controlled intensity",
    description: "Athletic reformer Pilates для сильного центра, мобильности и собранной, выразительной осанки.",
    meta: "55 мин · до 8 гостей",
    image: asset("/images/forme-hero.png"),
    tone: "citron",
  },
  {
    index: "03",
    title: "RESET / RECOVER",
    eyebrow: "Nervous system downshift",
    description: "Mobility flow, дыхательные практики и глубокое восстановление после насыщенной недели.",
    meta: "45 мин · до 12 гостей",
    image: asset("/images/forme-reset.png"),
    tone: "light",
  },
] as const;

export const sessions: ClassSession[] = [
  { id: "mon-0700", day: 0, time: "07:00", title: "FORME / Sculpt", coach: "Майя", category: "strength", duration: 50, spots: 3 },
  { id: "mon-0930", day: 0, time: "09:30", title: "Reform / Pilates", coach: "Леа", category: "pilates", duration: 55, spots: 2 },
  { id: "mon-1830", day: 0, time: "18:30", title: "Pulse / Conditioning", coach: "Элиас", category: "conditioning", duration: 45, spots: 5 },
  { id: "tue-0800", day: 1, time: "08:00", title: "Reform / Pilates", coach: "Леа", category: "pilates", duration: 55, spots: 4 },
  { id: "tue-1300", day: 1, time: "13:00", title: "Reset / Recover", coach: "Саша", category: "recovery", duration: 45, spots: 7 },
  { id: "tue-1900", day: 1, time: "19:00", title: "FORME / Sculpt", coach: "Майя", category: "strength", duration: 50, spots: 1 },
  { id: "wed-0700", day: 2, time: "07:00", title: "Pulse / Conditioning", coach: "Элиас", category: "conditioning", duration: 45, spots: 6 },
  { id: "wed-1000", day: 2, time: "10:00", title: "FORME / Sculpt", coach: "Майя", category: "strength", duration: 50, spots: 3 },
  { id: "wed-1830", day: 2, time: "18:30", title: "Reform / Pilates", coach: "Леа", category: "pilates", duration: 55, spots: 2 },
  { id: "thu-0800", day: 3, time: "08:00", title: "FORME / Sculpt", coach: "Майя", category: "strength", duration: 50, spots: 4 },
  { id: "thu-1230", day: 3, time: "12:30", title: "Reset / Recover", coach: "Саша", category: "recovery", duration: 45, spots: 8 },
  { id: "thu-1930", day: 3, time: "19:30", title: "Pulse / Conditioning", coach: "Элиас", category: "conditioning", duration: 45, spots: 3 },
  { id: "fri-0700", day: 4, time: "07:00", title: "Reform / Pilates", coach: "Леа", category: "pilates", duration: 55, spots: 5 },
  { id: "fri-1800", day: 4, time: "18:00", title: "FORME / Sculpt", coach: "Элиас", category: "strength", duration: 50, spots: 2 },
  { id: "sat-1000", day: 5, time: "10:00", title: "Weekend / Circuit", coach: "Майя", category: "conditioning", duration: 60, spots: 4 },
  { id: "sat-1200", day: 5, time: "12:00", title: "Reset / Recover", coach: "Саша", category: "recovery", duration: 45, spots: 6 },
];

export const memberships = [
  { name: "ESSENTIAL", sessions: "4 класса / месяц", price: "12 900", note: "Для устойчивого ритма", features: ["Любые групповые классы", "Recovery lounge", "Заморозка 7 дней"] },
  { name: "RITUAL", sessions: "8 классов / месяц", price: "19 900", note: "Выбор большинства", features: ["Приоритетная запись", "1 guest pass в месяц", "Заморозка 14 дней"], featured: true },
  { name: "ALL ACCESS", sessions: "Безлимитный доступ", price: "29 900", note: "Полное погружение", features: ["Неограниченные классы", "2 guest pass в месяц", "Ежемесячный body check-in"] },
];
