export function formatDate(date: string): string {
  if (!date) return "";
  
  // Eğer tarih zaten "29 Ekim 2026" gibi Türkçe metin formatındaysa doğrudan döndür
  if (/[a-zA-ZğüşıöçĞÜŞİÖÇ]/.test(date)) {
    return date;
  }

  // YYYY-MM-DD formatında geliyorsa yerel formata çevir
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return date;
    return d.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  } catch {
    return date;
  }
}