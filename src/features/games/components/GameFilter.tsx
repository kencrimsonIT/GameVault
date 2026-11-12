import {useState} from "react";
import {ChevronDown, SlidersHorizontal} from "lucide-react";
import type {GameFilters} from "../types/game.types.ts";
import {priceRangeOptions} from "../utils/filterGames.ts";
import styles from "./GameFilter.module.scss";

type FilterOptions = {
    genres: string[]
    platforms: string[]
    features: string[]
}

type Props = {
    options: FilterOptions
    filters: GameFilters
    activeCount: number
    onChange: (filters: GameFilters) => void
    onReset: () => void
}

type CheckboxGroupProps = {
    title: string
    options: string[]
    selected: string[]
    onToggle: (value: string) => void
}

function toggleValue(list: string[], value: string): string[] {
    return list.includes(value)
        ? list.filter(item => item !== value)
        : [...list, value]
}

function CheckboxGroup({title, options, selected, onToggle}: CheckboxGroupProps) {
    return (
        <fieldset className={styles.group}>
            <legend className={styles.groupTitle}>{title}</legend>
            {options.map(option => (
                <label key={option} className={styles.option}>
                    <input
                        type="checkbox"
                        checked={selected.includes(option)}
                        onChange={() => onToggle(option)}
                    />
                    {option}
                </label>
            ))}
        </fieldset>
    )
}

export default function GameFilter({options, filters, activeCount, onChange, onReset}: Props) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <aside className={styles.panel}>
            <div className={styles.header}>
                <h2 className={styles.heading}>
                    <SlidersHorizontal size={16}/>
                    Bộ lọc
                </h2>
                <div className={styles.actions}>
                    {activeCount > 0 && (
                        <button type="button" className={styles.reset} onClick={onReset}>
                            Xóa bộ lọc ({activeCount})
                        </button>
                    )}
                    <button
                        type="button"
                        className={styles.toggle}
                        aria-expanded={isOpen}
                        aria-controls="game-filter-groups"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? 'Ẩn' : 'Hiện'}
                        <ChevronDown size={16} className={isOpen ? styles.chevronOpen : undefined}/>
                    </button>
                </div>
            </div>

            <div
                id="game-filter-groups"
                className={isOpen ? `${styles.groups} ${styles.groupsOpen}` : styles.groups}
            >
                <CheckboxGroup
                    title="Thể loại"
                    options={options.genres}
                    selected={filters.genres}
                    onToggle={value => onChange({...filters, genres: toggleValue(filters.genres, value)})}
                />

                <CheckboxGroup
                    title="Nền tảng"
                    options={options.platforms}
                    selected={filters.platforms}
                    onToggle={value => onChange({...filters, platforms: toggleValue(filters.platforms, value)})}
                />

                <fieldset className={styles.group}>
                    <legend className={styles.groupTitle}>Khoảng giá</legend>
                    {priceRangeOptions.map(option => (
                        <label key={option.value} className={styles.option}>
                            <input
                                type="radio"
                                name="priceRange"
                                checked={filters.priceRange === option.value}
                                onChange={() => onChange({...filters, priceRange: option.value})}
                            />
                            {option.label}
                        </label>
                    ))}
                    <label className={`${styles.option} ${styles.highlight}`}>
                        <input
                            type="checkbox"
                            checked={filters.onSaleOnly}
                            onChange={event => onChange({...filters, onSaleOnly: event.target.checked})}
                        />
                        Chỉ hiện đang giảm giá
                    </label>
                </fieldset>

                <CheckboxGroup
                    title="Tính năng"
                    options={options.features}
                    selected={filters.features}
                    onToggle={value => onChange({...filters, features: toggleValue(filters.features, value)})}
                />
            </div>
        </aside>
    )
}