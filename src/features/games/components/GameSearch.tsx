import {Search} from "lucide-react";
import styles from "./GameSearch.module.scss";

type Props = {
    value: string
    onChange: (value: string) => void
}

export default function GameSearch({value, onChange}: Props) {
    return (
        <label className={styles.search}>
            <Search size={18} className={styles.icon}/>
            <input
                type="search"
                className={styles.input}
                placeholder="Tìm theo tên game, nhà phát hành..."
                aria-label="Tìm game"
                value={value}
                onChange={event => onChange(event.target.value)}
            />
        </label>
    )
}