import { useEffect, useState } from "react";
// import { getProducts } from "../../api/getProducts";
import { ProductCard } from "../ProductCard/ProductCard";
import styles from "./Goods.module.scss";
import { searchProducts } from "../../api/searchProducts";
import type Product from "../../types/Product";

interface GoodsProps {
  searchValue: string;
  visibleProducts: Product[];
  setVisibleProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export function Goods({ searchValue, visibleProducts, setVisibleProducts }: GoodsProps) {
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
      searchValue: searchValue,
      perPage: 6,
      page: currentPage,
    });

    if (loadedProducts.status === "ok") {
      if (isInitialLoad) {
        setVisibleProducts(loadedProducts.products);
        setPage(2);
      } else {
        setVisibleProducts(prevProducts => [ ...prevProducts, ...loadedProducts.products ]);
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

  }, [searchValue]);

  const handleLoadMore = () => {
    if (!loading && page <= totalPages) {
      fetchProducts(false);
    }
  }; 

  return (
    <>
      <div className={styles.list}>
        {visibleProducts.map((visibleProduct) => {
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

        {/* {loading ?
          (<div className={styles.loading} ref={loaderRef}>
            {loading && "Загрузка..."}
          </div>) : 
          (<div className={styles.more}>
            <button
              className={styles.btn}
              disabled={loading}
              onClick={() => {
                if (!loading) {
                  fetchProducts();
                }
              }}
            >
              Показать ещё
            </button>
          </div>)
        } */}
      </div>
    </>
  );
}