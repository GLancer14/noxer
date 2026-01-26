import type Product from "../../types/Product";
import styles from "./MenuNav.module.scss";

interface MenuNavProps {
  searchFocused: boolean;
  handleBackBtnClick: () => void;
  setVisibleProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export function MenuNav({ searchFocused, handleBackBtnClick, setVisibleProducts }: MenuNavProps) {
  const closeBtn = <button className={styles.close}>Закрыть</button>;
  const backBtn = (
    <button
      className={styles.back}
      onClick={() => {
        handleBackBtnClick();
        setVisibleProducts([]);
      }}
    >Назад
    </button>
  );

  return (
    <>
      <header className={styles.wrp}>
        {searchFocused ? closeBtn : backBtn}
        <a className={styles.tg} href="https://t.me/telegram">наш tg-канал</a>
        <button className={styles.more}></button>
      </header>
    </>
  );
}