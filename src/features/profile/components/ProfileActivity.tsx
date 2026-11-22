import { ShoppingCart, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../../utils/formatCurrency";
import styles from "./ProfileActivity.module.scss";

type Props = {
  cartCount: number;
  cartTotal: number;
};

export default function ProfileActivity({ cartCount, cartTotal }: Props) {
  return (
    <aside className={styles.activity}>
      <h2 className={styles.title}>Hoạt động</h2>

      <div className={styles.tile}>
        <ShoppingCart className={styles.icon} size={22} aria-hidden="true" />
        <div>
          <p className={styles.label}>Game trong giỏ hàng</p>
          <strong className={styles.value}>{cartCount}</strong>
        </div>
      </div>

      <div className={styles.tile}>
        <Wallet className={styles.icon} size={22} aria-hidden="true" />
        <div>
          <p className={styles.label}>Giá trị giỏ hàng</p>
          <strong className={styles.value}>{formatCurrency(cartTotal)}</strong>
        </div>
      </div>

      <Link className={styles.link} to="/cart">
        Xem giỏ hàng
      </Link>
    </aside>
  );
}
