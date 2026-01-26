import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { resetProducts } from "../../store/reducers/productsSlice";
import { updateFocusedState, updateSearchValue } from "../../store/reducers/searchSlice";
import styles from "./MenuNav.module.scss";

export function MenuNav() {
  const dispatch = useAppDispatch();
  const searchState = useAppSelector(state => state.searchReducer);
  
  const closeBtn = <button className={styles.close}>Закрыть</button>;
  const backBtn = (
    <button
      className={styles.back}
      onClick={() => {
        dispatch(updateSearchValue(""));
        dispatch(updateFocusedState(false));
        dispatch(resetProducts());
      }}
    >
      Назад
    </button>
  );

  return (
    <>
      <header className={styles.wrp}>
        {!searchState.isFocused ? closeBtn : backBtn}
        <a className={styles.tg} href="https://t.me/telegram">наш tg-канал</a>
        <button className={styles.more}></button>
      </header>
    </>
  );
}