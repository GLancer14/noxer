import styles from "./MenuNav.module.scss";

export function MenuNav({ searchFocused, handleBackBtnClick, setVisibleProducts }: { searchFocused: boolean }) {
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
        <button className={styles.tg}>наш tg-канал</button>
        <button className={styles.more}></button>
      </header>
    </>
  );
}