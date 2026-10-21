import type { PageName } from "../../types/page";

interface NavigationProps {
  current: PageName;
  onNavigate: (page: PageName) => void;
}

const MENU_ITEMS: { name: PageName; label: string }[] = [
  { name: "home", label: "Ana Sayfa" },
  { name: "events", label: "Etkinlikler" },
  { name: "add", label: "Ekle" }
];

export default function Navigation({ current, onNavigate }: NavigationProps) {
  return (
    <nav className="site-nav">
      <ul>
        {MENU_ITEMS.map((item) => (
          <li key={item.name} className={current === item.name ? "aktif" : ""}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.name);
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}