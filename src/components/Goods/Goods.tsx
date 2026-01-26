import { useEffect, useState } from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import styles from "./Goods.module.scss";
import { searchProducts } from "../../api/searchProducts";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { addProducts, updateProducts } from "../../store/reducers/productsSlice";

export function Goods() {
  const dispatch = useAppDispatch();
  const productsState = useAppSelector(state => state.productsReducer);
  const searchState = useAppSelector(state => state.searchReducer);
  const [ loading, setLoading ] = useState(false);
  const [ page, setPage ] = useState(1);
  const [ totalPages, setTotalPages ] = useState(1);
  const [ initialLoadDone, setInitialLoadDone ] = useState(false);

  const fetchProducts = async (isInitialLoad = false) => {
    if (loading) {
      return;
    }

    if (!isInitialLoad && totalPages < page) {
      return;
    }

    setLoading(true);
    const currentPage = isInitialLoad ? 0 : page;
    const loadedProducts = await searchProducts({
      searchValue: searchState.value,
      perPage: 6,
      page: currentPage,
    });

    if (loadedProducts.status === "ok") {
      if (isInitialLoad) {
        dispatch(updateProducts(loadedProducts.products));
        setPage(2);
      } else {
        dispatch(addProducts(loadedProducts.products));
        setPage(previosPage => previosPage + 1);
      }

      setTotalPages(loadedProducts.pagination.total_pages);
      setLoading(false);
    }

    if (isInitialLoad) {
      setInitialLoadDone(true);
    }
  }

  useEffect(() => {
    if (!initialLoadDone) {
      fetchProducts(true);
    }
  }, [initialLoadDone]);

  useEffect(() => {
    setPage(1);
    setTotalPages(1);
    setInitialLoadDone(false);
  }, [searchState.value]);

  const handleLoadMore = () => {
    if (!loading && page <= totalPages) {
      fetchProducts(false);
    }
  }; 

  return (
    <>
      <div className={styles.list}>
        {productsState.map((visibleProduct) => {
          return (
            <ProductCard key={visibleProduct.id} productData={visibleProduct} />
          );
        })}
        {loading ?
          (<div className={styles.loading}>
            Загрузка...
          </div>) : 
          (page <= totalPages && (<div className={styles.more}>
            <button
              className={styles.btn}
              disabled={loading}
              onClick={handleLoadMore}
            >
              Показать ещё
            </button>
          </div>))
        }
      </div>
    </>
  );
}