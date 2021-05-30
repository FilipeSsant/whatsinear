import styles from "./styles.module.scss";

interface CardProps {
  handleClick?: () => void;
  cover?: string;
  coverText?: string;
  title: string;
  description?: string;
  position?: number;
}

export function Card({
  cover,
  coverText,
  title,
  description,
  position,
  handleClick = () => {},
}: CardProps) {
  return (
    <div onClick={() => handleClick()} className={styles.cardContainer}>
      {position && (
        <div className={styles.positionBadge}>
          <span>#{position}</span>
        </div>
      )}
      {coverText ? (
        <div className={styles.cardCoverTextContainer}>
          <strong>{coverText}</strong>
        </div>
      ) : (
        <div className={styles.cardCoverContainer}>
          <img src={cover} alt="artist" />
        </div>
      )}

      <div className={styles.cardInformationContainer}>
        <strong>{title}</strong>
        <span>{description}</span>
      </div>
    </div>
  );
}
