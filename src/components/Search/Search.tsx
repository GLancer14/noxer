import type Product from "../../types/Product";
import styles from "./Search.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { updateFocusedState, updateSearchValue } from "../../store/reducers/searchSlice";

interface SearchProps {
  setVisibleProducts: React.Dispatch<React.SetStateAction<Product[]>>
}

export function Search({
  setVisibleProducts
}: SearchProps) {
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
              setVisibleProducts([]);
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