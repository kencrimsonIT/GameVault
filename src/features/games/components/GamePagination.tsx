import {ChevronLeft, ChevronRight} from "lucide-react";
import styles from "./GamePagination.module.scss";

type Props = {
    page: number
    totalPages: number
    totalItems: number
    pageSize: number
    onPageChange: (page: number) => void
}

export default function GamePagination({page, totalPages, totalItems, pageSize, onPageChange}: Props) {
    const from = (page - 1) * pageSize + 1
    const to = Math.min(page * pageSize, totalItems)
    const pages = Array.from({length: totalPages}, (_, index) => index + 1)

    return (
        <nav className={styles.pagination} aria-label="Phân trang">
            <p className={styles.info}>
                Hiển thị <strong>{from} - {to}</strong> trong số <strong>{totalItems}</strong> tựa game
            </p>

            <div className={styles.buttons}>
                <button
                    type="button"
                    className={styles.button}
                    disabled={page === 1}
                    onClick={() => onPageChange(page - 1)}
                >
                    <ChevronLeft size={16}/>
                    Trước
                </button>

                {pages.map(pageNumber => (
                    <button
                        key={pageNumber}
                        type="button"
                        className={pageNumber === page ? `${styles.button} ${styles.active}` : styles.button}
                        aria-current={pageNumber === page ? 'page' : undefined}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                ))}

                <button
                    type="button"
                    className={styles.button}
                    disabled={page === totalPages}
                    onClick={() => onPageChange(page + 1)}
                >
                    Tiếp theo
                    <ChevronRight size={16}/>
                </button>
            </div>
        </nav>
    )
}