import { events } from "./data.js";

const listeKapsayici = document.getElementById("etkinlik-listesi");
const aramaGirdisi = document.getElementById("arama");
const kategoriSecimi = document.getElementById("kategori-filtre");
const sonucMetni = document.getElementById("sonuc-metni");

// Kart HTML şablonu oluşturan fonksiyon
function kartOlustur(etkinlik) {
  const article = document.createElement("article");
  article.className = "kart";

  article.innerHTML = `
    <h3>${etkinlik.title}</h3>
    <span class="etiket">${etkinlik.category}</span>
    <p><strong>Tarih:</strong> ${etkinlik.date}, ${etkinlik.time}</p>
    <p><strong>Yer:</strong> ${etkinlik.location}</p>
    <p><strong>Kontenjan:</strong> ${etkinlik.capacity} kişi</p>
    <p>${etkinlik.description}</p>
    <a href="etkinlik-detay.html?id=${etkinlik.id}" class="detay-link">Detayları gör</a>
  `;
  return article;
}

// Etkinlikleri ekrana basan fonksiyon
function etkinlikleriGoster(liste) {
  if (!listeKapsayici) return;
  listeKapsayici.innerHTML = "";

  if (liste.length === 0) {
    listeKapsayici.innerHTML = "<p>Aramanıza uygun etkinlik bulunamadı.</p>";
    return;
  }

  liste.forEach(etk => {
    listeKapsayici.appendChild(kartOlustur(etk));
  });
}

// Sayfa yüklendiğinde çalışacak ana mantık
document.addEventListener("DOMContentLoaded", () => {
  if (!listeKapsayici) return;

  // Ana sayfa için data-limit kontrolü (en yakın 2 etkinlik)
  const limit = listeKapsayici.dataset.limit;
  if (limit) {
    const sirali = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
    etkinlikleriGoster(sirali.slice(0, parseInt(limit, 10)));
    return; // Ana sayfada filtre/arama yok, burada bitir
  }

  // Etkinlikler sayfası: Kategorileri dinamik doldur
  if (kategoriSecimi) {
    const kategoriler = [...new Set(events.map(e => e.category))];
    kategoriler.forEach(kat => {
      const opt = document.createElement("option");
      opt.value = kat;
      opt.textContent = kat;
      kategoriSecimi.appendChild(opt);
    });
  }

  // Filtreleme ve arama fonksiyonu
  function filtrele() {
    const aramaMetni = aramaGirdisi ? aramaGirdisi.value.trim().toLowerCase() : "";
    const secilenKategori = kategoriSecimi ? kategoriSecimi.value : "";

    const sonuclar = events.filter(etk => {
      const baslikUygun = etk.title.toLowerCase().includes(aramaMetni);
      const aciklamaUygun = etk.description.toLowerCase().includes(aramaMetni);
      const yerUygun = etk.location.toLowerCase().includes(aramaMetni);
      const metinUygun = baslikUygun || aciklamaUygun || yerUygun;

      const kategoriUygun = secilenKategori === "" || etk.category === secilenKategori;

      return metinUygun && kategoriUygun;
    });

    etkinlikleriGoster(sonuclar);

    // Sonuç satırını güncelle
    if (sonucMetni) {
      if (sonuclar.length > 0) {
        sonucMetni.textContent = `${sonuclar.length} etkinlik listeleniyor.`;
      } else {
        sonucMetni.textContent = "Aramanıza uygun etkinlik bulunamadı.";
      }
    }
  }

  // İlk açılışta tümünü göster
  filtrele();

  // Olay dinleyicileri (input ve change)
  if (aramaGirdisi) {
    aramaGirdisi.addEventListener("input", filtrele);
  }
  if (kategoriSecimi) {
    kategoriSecimi.addEventListener("change", filtrele);
  }
});