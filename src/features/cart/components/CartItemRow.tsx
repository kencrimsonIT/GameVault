import { Trash2 } from "lucide-react";
import { formatCurrency } from "../../../utils/formatCurrency";
import type { CartItem } from "../types/cart.types";
import styles from "./CartItemRow.module.scss";

type Props = {
  item: CartItem;
  onRemove: (id: number) => void;
};

export default function CartItemRow({ item, onRemove }: Props) {
  const hasDiscount = item.originalPrice > item.price;
  const discountPercent = Math.round(
    ((item.originalPrice - item.price) / item.originalPrice) * 100,
  );

  return (
    <article className={styles.item}>
      <img
        className={styles.cover}
        src={item.cover}
        alt={`Ảnh bìa ${item.title}`}
        loading="lazy"
      />

      <div className={styles.info}>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.developer}>{item.developer}</p>
      </div>

      <div className={styles.priceBox}>
        {hasDiscount && (
          <span className={styles.discount}>-{discountPercent}%</span>
        )}
        <div className={styles.prices}>
          {hasDiscount && (
            <span className={styles.originalPrice}>
              {formatCurrency(item.originalPrice)}
            </span>
          )}
          <strong className={styles.price}>{formatCurrency(item.price)}</strong>
        </div>
      </div>

      <button
        className={styles.removeButton}
        type="button"
        aria-label={`Xóa ${item.title} khỏi giỏ hàng`}
        onClick={() => onRemove(item.id)}
      >
        <Trash2 size={18} aria-hidden="true" />
      </button>
    </article>
  );
}
