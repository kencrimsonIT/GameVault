import type {SortOption} from "../types/game.types.ts";
import {sortOptions} from "../utils/sortGames.ts";
import styles from "./GameSort.module.scss";

type Props = {
    value: SortOption
    onChange: (value: SortOption) => void
}

export default function GameSort({value, onChange}: Props) {
    return (
        <label className={styles.sort}>
            <span className={styles.label}>Sắp xếp:</span>
            <select
                className={styles.select}
                value={value}
                onChange={event => onChange(event.target.value as SortOption)}
            >
                {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    )
}