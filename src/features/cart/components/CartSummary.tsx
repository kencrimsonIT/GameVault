import { formatCurrency } from "../../../utils/formatCurrency";
import styles from "./CartSummary.module.scss";

type Props = {
  count: number;
  originalTotal: number;
  total: number;
  onCheckout: () => void;
};

export default function CartSummary({
  count,
  originalTotal,
  total,
  onCheckout,
}: Props) {
  const savings = originalTotal - total;

  return (
    <aside className={styles.summary}>
      <h2 className={styles.title}>Tóm tắt đơn hàng</h2>

      <div className={styles.row}>
        <span>Tạm tính ({count} game)</span>
        <span>{formatCurrency(originalTotal)}</span>
      </div>

      {savings > 0 && (
        <div className={styles.row}>
          <span>Giảm giá</span>
          <span className={styles.savings}>-{formatCurrency(savings)}</span>
        </div>
      )}

      <div className={styles.totalRow}>
        <span>Tổng cộng</span>
        <strong className={styles.total}>{formatCurrency(total)}</strong>
      </div>

      <button className={styles.checkoutButton} type="button" onClick={onCheckout}>
        Thanh toán
      </button>
    </aside>
  );
}
