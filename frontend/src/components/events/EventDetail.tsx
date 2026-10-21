import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

export default function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <div className="event-detail-container">
      <div className="detail-kunye">
        <h3>Etkinlik Künyesi</h3>
        <p><strong>Tarih:</strong> {formatDate(event.date)}, {(event as any).time || "14:00"}</p>
        <p><strong>Yer:</strong> {event.location}</p>
        <p><strong>Kategori:</strong> {event.category}</p>
        <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
      </div>

      <div className="detail-aciklama">
        <h3>Açıklama</h3>
        <p>{event.description}</p>
      </div>

      <div className="detail-butonlar">
        <button type="button" className="btn-secondary" onClick={onBack}>
          Listeye dön
        </button>
        <button type="button" className="btn-primary" onClick={() => onEdit(event.id)}>
          Bu etkinliği güncelle
        </button>
      </div>
    </div>
  );
}