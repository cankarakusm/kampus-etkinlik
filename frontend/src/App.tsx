import { useState, useMemo } from "react";
import type { PageName } from "./types/page";
import type { CampusEvent } from "./types/campus-event";
import { events } from "./data/events";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";
import "./App.css";

const CATEGORIES = ["Seminer", "Atölye", "Söyleşi"];

export default function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [category, setCategory] = useState<string>("Tümü");

  const go = (targetPage: PageName, id?: string) => {
    setPage(targetPage);
    if (id) setSelectedId(id);
    window.scrollTo(0, 0);
  };

  const selectedEvent = useMemo<CampusEvent | undefined>(
    () => events.find((e: CampusEvent) => e.id === selectedId),
    [selectedId]
  );

  const filteredEvents = useMemo<CampusEvent[]>(() => {
    return events.filter((e: CampusEvent) => {
      const matchText =
        e.title.toLowerCase().includes(searchText.toLowerCase()) ||
        e.description.toLowerCase().includes(searchText.toLowerCase());
      const matchCat = category === "Tümü" || e.category === category;
      return matchText && matchCat;
    });
  }, [searchText, category]);

  const upcomingEvents = useMemo<CampusEvent[]>(
    () => events.slice(0, 2),
    []
  );

  const headerConfig: Record<PageName, { title: string; text?: string }> = {
    home: {
      title: "Kampüs Etkinlikleri",
      text: "Yakındaki seminer, atölye ve söyleşileri takip edin."
    },
    events: {
      title: "Tüm Etkinlikler",
      text: "Ekim ayında kampüste düzenlenen etkinlikler."
    },
    detail: {
      title: selectedEvent ? selectedEvent.title : "Etkinlik Detayı"
    },
    add: {
      title: "Etkinlik Ekle"
    },
    update: {
      title: "Etkinlik Güncelle"
    }
  };

  return (
    <div className="app-container">
      <Header
        title={headerConfig[page].title}
        text={headerConfig[page].text}
      />
      <Navigation current={page} onNavigate={(p: PageName) => go(p)} />

      <main className="ana-icerik">
        {page === "home" && (
          <section>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <EventList
              events={upcomingEvents}
              onShowDetail={(id: string) => go("detail", id)}
            />
          </section>
        )}

        {page === "events" && (
          <section>
            <EventFilter
              searchText={searchText}
              category={category}
              categories={CATEGORIES}
              onSearchChange={(text: string) => setSearchText(text)}
              onCategoryChange={(cat: string) => setCategory(cat)}
            />
            <p className="filtre-sayac">
              {filteredEvents.length} etkinlik listeleniyor.
            </p>
            <EventList
              events={filteredEvents}
              onShowDetail={(id: string) => go("detail", id)}
              emptyText="Kriterlere uygun etkinlik bulunamadı."
            />
          </section>
        )}

        {page === "detail" && selectedEvent && (
          <EventDetail
            event={selectedEvent}
            onBack={() => go("events")}
            onEdit={(id: string) => go("update", id)}
          />
        )}

        {(page === "add" || page === "update") && (
          <EventForm onSubmit={() => window.scrollTo(0, 0)} />
        )}
      </main>

      <Footer />
    </div>
  );
}