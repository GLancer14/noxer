import styles from "./SearchBlock.module.scss";
import magnifier from "../../assets/icons/magnifier.svg";
import noPhoto from "../../assets/no-photo.svg";
import { useEffect, useState } from "react";
import { searchProducts } from "../../api/searchProducts";
import type { ProductsDTO } from "../../types/Product";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { updateSearchValue } from "../../store/reducers/searchSlice";

const initialProductsData: ProductsDTO = {
  filters: {
    category_ids: null,
    color_ids: null,
    in_stock:  null,
    mark_ids: null,
    price: null,
    search: null,
    sort_by: "popularity",
    sort_desc: false,
    specifications: null,
  },
  pagination: {
    current_page: 1,
    has_next: false,
    has_prev: false,
    per_page: 20,
    total_pages: 1,
    total_products: 0,
  },
  products: [],
  status: "ok",
  total: 1918,
}

export function SearchBlock() {
  const dispatch = useAppDispatch();
  const [ frequentRequests, setFrequentRequests ] = useState<string[]>([]);
  const [ quickSearchResult, setQuickSearchResult ] = useState(initialProductsData);
  const searchState = useAppSelector(state => state.searchReducer);

  const findProducts = async (searchValue: string, perPage: number, page: number) => {
    const loadedProducts = await searchProducts({
      searchValue,
      perPage,
      page,
    });

    if (loadedProducts.status === "ok") {
      setQuickSearchResult(loadedProducts);
    }
  }

  useEffect(() => {
    findProducts(searchState.value, 6, 0);
  }, [searchState.value]);

  useEffect(() => {
    setFrequentRequests(["блюдо", "астра", "бан", "ангел", "ботинки", "антиквар"]);
  }, []);

  if (searchState.value === "") {
    return (
      <div className={styles.wrapper}>
        <h3 className={styles.header}>Часто ищут</h3>
        {frequentRequests.map((category) => {
          return (
            <div
              className={styles.request}
              onClick={() => {
                dispatch(updateSearchValue(category.toLowerCase()));
              }}
              key={category}
            >
              <img className={styles.searchIcon} src={magnifier} alt="icon" />
              <span className={styles.requestName}>
                {category}
              </span>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className={styles.wrapper}>
        {
          (quickSearchResult.products.length === 0) ?
            <div className={styles.noResults}>Результаты не найдены</div> :
            quickSearchResult.products.map(product => {
              return (
                <div className={styles.cardSearch} key={product.id}>
                  <div className={styles.imageWrp}>
                    {(product.images.length > 0) ? 
                      (
                        <img
                          className={styles.image}
                          src={
                            product.images.find(image => image.MainImage)?.Image_URL || noPhoto
                          }
                          alt={product?.name}
                        />
                      ) : (
                        <img
                          className={styles.mockImage}
                          src={noPhoto}
                          alt="Нет фото"
                        />
                      )
                    }
                  </div>
                  <div className={styles.description}>
                    <div className={styles.name}>{product.name}</div>
                    <div className={styles.priceWrp}>
                      <span className={styles.price}>{product.price} &#8381;</span>
                      <span className={styles.oldPrice}>
                        {product.old_price ? `${product.old_price} \u20bd` : ""}
                      </span>
                      <span className={styles.discountPercent}>
                        {
                          product.old_price ?
                            `-${100 - Math.round(100 * product.price / product.old_price)}%` :
                            ""
                        }
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
        }
      </div>
    );
  }
}