import { useEffect, useRef, useState } from "react";
import { getProducts } from "../../api/getProducts";
import { ProductCard } from "../ProductCard/ProductCard";
import styles from "./Goods.module.scss";
import { searchProducts } from "../../api/searchProducts";

export function Goods({ searchValue, visibleProducts, setVisibleProducts}) {
  const [ loading, setLoading ] = useState(false);
  const [ page, setPage ] = useState(1);
  const [ totalPages, setTotalPages ] = useState(1);
  const loaderRef = useRef(null);

  const fetchProducts = async () => {
    if (totalPages < page) {
      return;
    }
    
    setLoading(true);
    let loadedProducts;
    if (searchValue !== "") {
      loadedProducts = await searchProducts(searchValue, 10, page);
    } else {
      loadedProducts = await getProducts(6, page);
    }

    console.log(page)
    setTotalPages(loadedProducts.data.pagination.total_pages);
    setVisibleProducts(prevProducts => [ ...prevProducts, ...loadedProducts.data.products ]);
    setLoading(false);
  }

  useEffect(() => {
    fetchProducts();
  }, [ page ]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
        const target = entries[0];
        if (target.isIntersecting && !loading) {
          setPage(prevPage => prevPage + 1);
        }
      }, { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    }
  }, [ loading ]);

  return (
    <>
      <div className={styles.list}>
        {visibleProducts.map(visibleProduct => {
          return (
            <ProductCard productData={visibleProduct} />
          );
        })}
        <div className={styles.loading} ref={loaderRef}>
          {loading && "Загрузка..."}
        </div>
      </div>
    </>
  );
}