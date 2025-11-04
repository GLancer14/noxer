import { useEffect, useRef, useState } from "react";
import { getProducts } from "../../api/getProducts";
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

    setPage(previosPage => previosPage + 1);
    setTotalPages(loadedProducts.data.pagination.total_pages);
    setVisibleProducts(prevProducts => [ ...prevProducts, ...loadedProducts.data.products ]);
    setLoading(false);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className={styles.list}>
        {visibleProducts.map((visibleProduct, index) => {
          return (
            <ProductCard key={visibleProduct.id} productData={visibleProduct} />
          );
        })}
        {loading ?
          (<div className={styles.loading} ref={loaderRef}>
            {loading && "Загрузка..."}
          </div>) : 
          (<div className={styles.more}>
            <button
              className={styles.btn}
              onClick={() => {
                fetchProducts();
              }}
            >
              Показать ещё
            </button>
          </div>)
        }
      </div>
    </>
  );
}