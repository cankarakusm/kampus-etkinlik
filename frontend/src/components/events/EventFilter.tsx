interface EventFilterProps {
  searchText: string;
  category: string;
  categories: string[];
  onSearchChange: (text: string) => void;
  onCategoryChange: (category: string) => void;
}

export default function EventFilter({
  searchText,
  category,
  categories,
  onSearchChange,
  onCategoryChange
}: EventFilterProps) {
  return (
    <div className="filtre-kutusu">
      <div className="filtre-grup">
        <label htmlFor="search">Etkinlik Ara</label>
        <input
          id="search"
          type="text"
          placeholder="Örn: atölye, kariyer"
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="filtre-grup">
        <label htmlFor="category">Kategori</label>
        <select
          id="category"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="Tümü">Tümü</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}