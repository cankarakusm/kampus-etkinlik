interface EventFormProps {
  onSubmit: () => void;
}

export default function EventForm({ onSubmit }: EventFormProps) {
  return (
    <>
      <p className="form-bilgi">
        Bu sprintte form sadece görünür, kayıt yapılmaz.
      </p>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="form-grup">
          <label>Etkinlik Adı</label>
          <input type="text" placeholder="Örn: Kariyer Günleri 2026" />
        </div>
        <div className="form-grup">
          <label>Kategori</label>
          <select defaultValue="">
            <option value="" disabled>Seçiniz</option>
            <option value="Seminer">Seminer</option>
            <option value="Atölye">Atölye</option>
          </select>
        </div>
        <div className="form-grup">
          <label>Tarih</label>
          <input type="date" />
        </div>
        <div className="form-grup">
          <label>Saat</label>
          <input type="time" />
        </div>
        <div className="form-grup">
          <label>Yer</label>
          <input type="text" placeholder="Örn: A Blok Konferans Salonu" />
        </div>
        <div className="form-grup">
          <label>Kontenjan</label>
          <input type="number" />
        </div>
        <div className="form-grup">
          <label>Açıklama</label>
          <textarea rows={4}></textarea>
        </div>
        <button type="submit" className="btn-submit">Kaydet</button>
      </form>
    </>
  );
}