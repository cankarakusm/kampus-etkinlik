import { events } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("etkinlik-formu");
  const mesajKutusu = document.getElementById("form-mesaj");
  if (!form) return;

  const params = new URLSearchParams(window.location.search);
  const eventId = params.get("id");
  const isGuncelleme = form.dataset.mode === "guncelle";

  // Güncelleme modu kontrolü
  if (isGuncelleme) {
    const event = events.find(e => e.id === eventId);

    // Eğer id yoksa veya listede bulunamadıysa formu gizle, uyarı göster
    if (!event) {
      form.outerHTML = `
        <div style="border: 2px solid #e74c3c; background-color: #fde8e8; color: #c0392b; padding: 1.5rem; border-radius: 8px; margin: 2rem 0;">
          <p style="margin: 0 0 1rem 0; font-weight: bold;">
            Güncellenecek etkinlik seçilmedi veya bulunamadı. Önce listeden bir etkinlik seçin, detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.
          </p>
          <a href="etkinlikler.html" style="display: inline-block; padding: 0.5rem 1rem; background-color: #27ae60; color: white; text-decoration: none; border-radius: 4px;">Etkinliklere git</a>
        </div>
      `;
      return;
    }

    // Etkinlik bulunduysa form alanlarını doldur
    if (form.elements["ad"]) form.elements["ad"].value = event.title;
    if (form.elements["kategori"]) form.elements["kategori"].value = event.category;
    if (form.elements["tarih"]) form.elements["tarih"].value = event.date;
    if (form.elements["saat"]) form.elements["saat"].value = event.time;
    if (form.elements["yer"]) form.elements["yer"].value = event.location;
    if (form.elements["kontenjan"]) form.elements["kontenjan"].value = event.capacity || "";
    if (form.elements["aciklama"]) form.elements["aciklama"].value = event.description || "";
  }

  // Form Gönderim Dinleyicisi
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Sayfanın yenilenmesini engelle

    // Hata mesajlarını ve kırmızı kenarlıkları temizle
    document.querySelectorAll(".hata").forEach(span => span.textContent = "");
    form.querySelectorAll("input, select, textarea").forEach(el => el.removeAttribute("aria-invalid"));
    if (mesajKutusu) mesajKutusu.innerHTML = "";

    const fd = new FormData(form);
    const data = {
      title: (fd.get("ad") || "").trim(),
      category: (fd.get("kategori") || "").trim(),
      date: (fd.get("tarih") || "").trim(),
      time: (fd.get("saat") || "").trim(),
      location: (fd.get("yer") || "").trim(),
      capacity: (fd.get("kontenjan") || "").trim(),
      description: (fd.get("aciklama") || "").trim()
    };

    const errors = {};

    // Doğrulama kuralları
    if (data.title.length < 3) {
      errors["ad"] = "Etkinlik adı en az 3 karakter olmalıdır.";
    }
    if (!data.category) {
      errors["kategori"] = "Lütfen bir kategori seçiniz.";
    }
    if (!data.date) {
      errors["tarih"] = "Tarih alanı zorunludur.";
    }
    if (!data.time) {
      errors["saat"] = "Saat alanı zorunludur.";
    }
    if (!data.location) {
      errors["yer"] = "Yer alanı zorunludur.";
    }
    if (data.capacity) {
      const capNum = Number(data.capacity);
      if (isNaN(capNum) || capNum < 1 || capNum > 1000) {
        errors["kontenjan"] = "Kontenjan 1 ile 1000 arasında olmalıdır.";
      }
    }

    // Hata varsa göster ve dur
    if (Object.keys(errors).length > 0) {
      for (const [key, msg] of Object.entries(errors)) {
        const errorSpan = document.getElementById(`hata-${key}`);
        const inputEl = form.elements[key];
        if (errorSpan) {
          errorSpan.textContent = msg;
          errorSpan.style.color = "#c0392b";
          errorSpan.style.fontSize = "0.85rem";
          errorSpan.style.display = "block";
        }
        if (inputEl) {
          inputEl.setAttribute("aria-invalid", "true");
          inputEl.style.borderColor = "#c0392b";
        }
      }
      return;
    }

    // Hata yoksa: Başarılı JSON çıktısını yeşil kutuda göster
    const sonucNesnesi = {
      id: isGuncelleme ? eventId : `event-${events.length + 1}`,
      title: data.title,
      category: data.category,
      date: data.date,
      time: data.time,
      location: data.location,
      capacity: data.capacity ? Number(data.capacity) : 0,
      description: data.description
    };

    console.log("Form Başarıyla Gönderildi:", sonucNesnesi);

    if (mesajKutusu) {
      mesajKutusu.innerHTML = `
        <div style="border: 2px solid #27ae60; background-color: #eafaf1; color: #1e8449; padding: 1.5rem; border-radius: 8px; margin-top: 1.5rem;">
          <h4 style="margin-top: 0;">✓ Etkinlik ${isGuncelleme ? 'güncellendi' : 'oluşturuldu'} (Bu sprintte kaydedilmez):</h4>
          <pre style="background: white; padding: 1rem; border-radius: 4px; overflow-x: auto; color: #333;">${JSON.stringify(sonucNesnesi, null, 2)}</pre>
        </div>
      `;
    }
  });
});