import { ShoppingCart, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import CartItemRow from "../components/CartItemRow";
import CartSummary from "../components/CartSummary";
import {
  clearCart,
  removeFromCart,
  selectCartItems,
  selectCartOriginalTotal,
  selectCartTotal,
} from "../slices/cartSlice";
import styles from "./CartPage.module.scss";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const originalTotal = useAppSelector(selectCartOriginalTotal);

  function handleRemove(id: number) {
    dispatch(removeFromCart(id));
  }

  function handleClear() {
    dispatch(clearCart());
  }

  function handleCheckout() {
    // Route not ready
    navigate("/checkout");
  }

  if (items.length === 0) {
    return (
      <section className={styles.empty}>
        <ShoppingCart className={styles.emptyIcon} size={56} aria-hidden="true" />
        <h1 className={styles.emptyTitle}>Giỏ hàng của bạn đang trống</h1>
        <p className={styles.emptyText}>
          Hãy khám phá thêm những tựa game hấp dẫn trên GameVault.
        </p>
        <Link className={styles.emptyButton} to="/games">
          Khám phá Games
        </Link>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Giỏ hàng ({items.length})</h1>
        <button className={styles.clearButton} type="button" onClick={handleClear}>
          <Trash2 size={16} aria-hidden="true" />
          Xóa tất cả
        </button>
      </div>

      <div className={styles.layout}>
        <div className={styles.list}>
          {items.map((item) => (
            <CartItemRow key={item.id} item={item} onRemove={handleRemove} />
          ))}
        </div>

        <CartSummary
          count={items.length}
          originalTotal={originalTotal}
          total={total}
          onCheckout={handleCheckout}
        />
      </div>
    </section>
  );
}
