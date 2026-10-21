import type { CampusEvent } from "../types/campus-event";

export const events: CampusEvent[] = [
  {
    id: "event-1",
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    capacity: 100,
    date: "12 Ekim 2026",
    time: "14:00",
    location: "A Blok Konferans Salonu",
    description: "Mezunlarla kariyer söyleşileri ve şirket stantları.",
    image: "/afis.svg"
  },
  {
    id: "event-2",
    title: "Robotik Atölyesi",
    category: "Atölye",
    capacity: 20,
    date: "20 Ekim 2026",
    time: "10:00",
    location: "Bilgisayar Laboratuvarı 2",
    description: "Arduino ile çizgi izleyen robot yapımı, başlangıç seviyesi.",
    image: "/afis.svg"
  },
  {
    id: "event-3",
    title: "Girişimcilik ve İnovasyon Zirvesi",
    category: "Söyleşi",
    capacity: 150,
    date: "25 Ekim 2026",
    time: "13:30",
    location: "Merkez Amfi",
    description: "Başarılı startup kurucularından deneyim paylaşımları."
  },
  {
    id: "event-4",
    title: "Algoritma Hackathonu",
    category: "Yarışma",
    capacity: 50,
    date: "27 Ekim 2026",
    time: "09:00",
    location: "Mühendislik Fakültesi D101",
    description: "12 saatlik kesintisiz kodlama ve problem çözme yarışması."
  },
  {
    id: "event-5",
    title: "Yapay Zeka Prompt Mühendisliği",
    category: "Atölye",
    capacity: 35,
    date: "29 Ekim 2026",
    time: "15:00",
    location: "Online (Teams)",
    description: "LLM modelleri için etkili prompt yazım teknikleri."
  },
  {
    id: "event-6",
    title: "Mobil Uygulama Tasarım Semineri",
    category: "Seminer",
    capacity: 80,
    date: "30 Ekim 2026",
    time: "11:00",
    location: "Kültür Merkezi Salon B",
    description: "Figma ile modern UI/UX tasarım temelleri."
  }
];