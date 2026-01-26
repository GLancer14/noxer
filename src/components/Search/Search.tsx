import styles from "./Search.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { updateFocusedState, updateSearchValue } from "../../store/reducers/searchSlice";
import { resetProducts } from "../../store/reducers/productsSlice";

export function Search() {
  const dispatch = useAppDispatch();
  const searchState = useAppSelector(state => state.searchReducer);

  return (
    <>
      <form className={styles.form}>
        <label className={styles.inputWrp}>
          <input
            className={styles.input}
            type="text"
            placeholder="Найти товары"
            onFocus={() => dispatch(updateFocusedState(true))}
            onInput={e => {
              dispatch(updateSearchValue(e.currentTarget.value));
            }}
            value={searchState.value}
          />
        </label>
        
        {(searchState.value !== "" && searchState.isFocused) && (
          <button
            className={styles.goBtn}
            onClick={() => {
              dispatch(resetProducts());
              dispatch(updateFocusedState(false));
            }}
            type="button"
          >
            Перейти
          </button>
        )}
      </form>
    </>
  );
}