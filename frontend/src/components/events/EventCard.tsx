import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
  onShowDetail: (id: string) => void;
}

export default function EventCard({ event, onShowDetail }: EventCardProps) {
  return (
    <article className="event-card">
      <div className="event-card-header">
        <h3>{event.title}</h3>
        <span className="kategori-etiket">{event.category}</span>
      </div>
      <p><strong>Tarih:</strong> {formatDate(event.date)}</p>
      <p><strong>Yer:</strong> {event.location}</p>
      <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
      <p className="ozet">{event.description}</p>
      <button
        type="button"
        className="btn-detay"
        onClick={() => onShowDetail(event.id)}
      >
        Detayları gör
      </button>
    </article>
  );
}