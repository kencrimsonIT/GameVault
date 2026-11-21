import {useState} from "react";
import styles from "./GameGallery.module.scss";

type Props = {
    images: string[]
    title: string
}

export default function GameGallery({images, title}: Props) {
    const [activeIndex, setActiveIndex] = useState(0)

    if (images.length === 0) {
        return null
    }

    const activeImage = images[activeIndex] ?? images[0]

    return (
        <div className={styles.gallery}>
            <img
                className={styles.main}
                src={activeImage}
                alt={`${title} - ảnh ${activeIndex + 1}`}
            />

            {images.length > 1 && (
                <div className={styles.thumbs}>
                    {images.map((image, index) => (
                        <button
                            key={image}
                            type="button"
                            className={index === activeIndex ? `${styles.thumb} ${styles.thumbActive}` : styles.thumb}
                            aria-label={`Xem ảnh ${index + 1}`}
                            aria-pressed={index === activeIndex}
                            onClick={() => setActiveIndex(index)}
                        >
                            <img src={image} alt="" loading="lazy"/>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}