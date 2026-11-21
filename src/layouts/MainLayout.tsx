import { ShoppingCart } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { selectCartCount } from "../features/cart";
import { useAppSelector } from "../store/hooks";
import styles from "./MainLayout.module.scss";

const navLinks = [
  { label: "Trang chủ", to: "/" },
  { label: "Games", to: "/games" },
  { label: "Wishlist", to: "/wishlist" },
];

export default function MainLayout() {
  const cartCount = useAppSelector(selectCartCount);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.headerGroup}>
            <Link className={styles.brand} to="/">
              <span className={styles.brandMark} aria-hidden="true" />
              GameVault
            </Link>

            <nav className={styles.nav} aria-label="Điều hướng chính">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.navLink} ${styles.navLinkActive}`
                      : styles.navLink
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <Link className={styles.cartLink} to="/cart" aria-label="Giỏ hàng">
            <ShoppingCart size={20} aria-hidden="true" />
            {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <span>GameVault</span>
        <span>© {new Date().getFullYear()} GameVault. Mọi quyền được bảo lưu.</span>
      </footer>
    </div>
  );
}
