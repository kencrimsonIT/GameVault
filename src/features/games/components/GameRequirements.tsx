import type {Game, Requirement} from "../types/game.types.ts";
import styles from "./GameRequirements.module.scss";

type Props = {
    requirements: Game['requirements']
}

type ColumnProps = {
    title: string
    items: Requirement[]
    highlight?: boolean
}

function RequirementColumn({title, items, highlight = false}: ColumnProps) {
    return (
        <div className={highlight ? `${styles.column} ${styles.highlight}` : styles.column}>
            <h3 className={styles.columnTitle}>{title}</h3>
            <dl className={styles.list}>
                {items.map(item => (
                    <div key={item.label} className={styles.row}>
                        <dt>{item.label}</dt>
                        <dd>{item.value}</dd>
                    </div>
                ))}
            </dl>
        </div>
    )
}

export default function GameRequirements({requirements}: Props) {
    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Yêu cầu hệ thống</h2>

            {requirements ? (
                <div className={styles.columns}>
                    <RequirementColumn title="Cấu hình tối thiểu" items={requirements.minimum}/>
                    <RequirementColumn title="Cấu hình đề nghị" items={requirements.recommended} highlight/>
                </div>
            ) : (
                <p className={styles.empty}>Chưa có thông tin cấu hình cho game này.</p>
            )}
        </section>
    )
}