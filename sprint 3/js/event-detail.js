import { events } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("detay-icerik");
  const baslikEl = document.getElementById("detay-baslik");
  if (!container) return;

  // URL'den ?id=event-... parametresini al
  const params = new URLSearchParams(window.location.search);
  const eventId = params.get("id");

  // Etkinliği bul
  const event = events.find(e => e.id === eventId);

  // Etkinlik bulunamadıysa veya id yoksa kırmızı hata kutusu göster
  if (!event) {
    if (baslikEl) baslikEl.textContent = "Etkinlik bulunamadı";
    document.title = "Etkinlik bulunamadı";

    container.innerHTML = `
      <div style="border: 2px solid #e74c3c; background-color: #fde8e8; color: #c0392b; padding: 1.5rem; border-radius: 8px; margin: 2rem 0;">
        <p style="margin: 0 0 1rem 0; font-weight: bold;">
          "${eventId || 'Geçersiz'}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.
        </p>
        <a href="etkinlikler.html" style="display: inline-block; padding: 0.5rem 1rem; background-color: #27ae60; color: white; text-decoration: none; border-radius: 4px;">&larr; Listeye dön</a>
      </div>
    `;
    return;
  }

  // Etkinlik bulunduysa başlığı ve sekme adını güncelle
  if (baslikEl) baslikEl.textContent = event.title;
  document.title = event.title;

  // Künye ve detay içeriğini oluştur
  container.innerHTML = `
    <article class="detay-kart">
      <section style="background: #f9f9f9; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
        <h2 style="margin-top: 0;">Etkinlik Künyesi</h2>
        <dl>
          <dt><strong>Tarih:</strong></dt>
          <dd>${event.date}, ${event.time}</dd>
          
          <dt><strong>Yer:</strong></dt>
          <dd>${event.location}</dd>
          
          <dt><strong>Kategori:</strong></dt>
          <dd>${event.category}</dd>
          
          <dt><strong>Kontenjan:</strong></dt>
          <dd>${event.capacity} kişi</dd>
        </dl>
      </section>

      <section style="margin-bottom: 2rem;">
        <h2>Açıklama</h2>
        <p>${event.description}</p>
      </section>

      <div style="display: flex; gap: 1rem;">
        <a href="etkinlikler.html" style="display: inline-block; padding: 0.6rem 1.2rem; background-color: #2c3e50; color: white; text-decoration: none; border-radius: 4px;">&larr; Listeye dön</a>
        <a href="etkinlik-guncelle.html?id=${event.id}" style="display: inline-block; padding: 0.6rem 1.2rem; background-color: #27ae60; color: white; text-decoration: none; border-radius: 4px;">Bu etkinliği güncelle</a>
      </div>
    </article>
  `;
});