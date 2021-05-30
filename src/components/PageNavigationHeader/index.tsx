import { useRouter } from "next/router";
import { MdChevronLeft } from "react-icons/md";
import styles from "./styles.module.scss";

interface PageNavigationHeaderProps {
  title: string;
  hideNavigation?: boolean;
}

export function PageNavigationHeader({
  title,
  hideNavigation,
}: PageNavigationHeaderProps) {
  const router = useRouter();

  return (
    <header className={styles.pageNavigationHeader}>
      {!hideNavigation && (
        <div className={styles.pageNavigationActions}>
          <button
            onClick={() => router.back()}
            className={styles.pageNavigationButton}>
            <MdChevronLeft color="#FFFFFF" size={24} />
          </button>
        </div>
      )}
      <h3>{title}</h3>
    </header>
  );
}
