import { useState } from "react";
import { getProducts } from "../../api/getProducts";
import styles from "./Search.module.scss";

export function Search({
  searchValue,
  setSearchValue,
  handleSearchInput,
  handleSearchUnfocus,
  quickSearchValue,
  setSearchFocused,
  setVisibleProducts
}) {

  return (
    <>
      <form className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="Найти товары"
          onFocus={handleSearchUnfocus}
          onInput={handleSearchInput}
          value={searchValue}
        />
        {searchValue !== "" && (
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