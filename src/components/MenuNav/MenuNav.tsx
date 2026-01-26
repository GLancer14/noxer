import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { searchSlice, updateFocusedState, updateSearchValue } from "../../store/reducers/searchSlice";
import type Product from "../../types/Product";
import styles from "./MenuNav.module.scss";

interface MenuNavProps {
  // searchFocused: boolean;
  // handleBackBtnClick: () => void;
  setVisibleProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export function MenuNav({ setVisibleProducts }: MenuNavProps) {
  const dispatch = useAppDispatch();
  const searchState = useAppSelector(state => state.searchReducer);
  
  const closeBtn = <button className={styles.close}>Закрыть</button>;
  const backBtn = (
    <button
      className={styles.back}
      onClick={() => {
        dispatch(updateSearchValue(""));
        dispatch(updateFocusedState(false));
        // handleBackBtnClick();
        setVisibleProducts([]);
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