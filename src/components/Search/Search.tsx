import type { ChangeEvent } from "react";
import type Product from "../../types/Product";
import styles from "./Search.module.scss";

interface SearchProps {
  searchFocused: boolean,
  searchValue: string,
  handleSearchInput: (e: ChangeEvent<HTMLInputElement>) => void,
  handleSearchUnfocus: () => void,
  setSearchFocused: React.Dispatch<React.SetStateAction<boolean>>,
  setVisibleProducts: React.Dispatch<React.SetStateAction<Product[]>>
}

export function Search({
  searchFocused,
  searchValue,
  handleSearchInput,
  handleSearchUnfocus,
  setSearchFocused,
  setVisibleProducts
}: SearchProps) {

  return (
    <>
      <form className={styles.form}>
        <label className={styles.inputWrp}>
          <input
            className={styles.input}
            type="text"
            placeholder="Найти товары"
            onFocus={handleSearchUnfocus}
            onInput={(handleSearchInput)}
            value={searchValue}
          />
        </label>
        
        {(searchValue !== "" && !searchFocused) && (
          <button
            className={styles.goBtn}
            onClick={() => {
              setVisibleProducts([]);
              setSearchFocused(true);
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