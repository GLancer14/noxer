import styles from "./SearchBlock.module.scss";
import magnifier from "../../assets/icons/magnifier.svg";
import noPhoto from "../../assets/no-photo.svg";
import { useEffect, useState } from "react";
import { getProducts } from "../../api/getProducts";
import { searchProducts } from "../../api/searchProducts";

export function SearchBlock({ searchValue, categories, handleQuickSearchValueSelect }) {
  const [ frequentRequests, setFrequentRequests ] = useState([]);
  const [ quickSearchResult, setQuickSearchResult ] = useState(null);

  const findProducts = async (searchValue, prevPage, page) => {
    const loadedProducts = await searchProducts(searchValue, prevPage, page);
    setQuickSearchResult(loadedProducts);
  }

  useEffect(() => {
    findProducts(searchValue, 1, 1);
  }, [ searchValue ]);

  useEffect(() => {
    const sortedCategories = categories.sort((categoryA, categoryB) => {
      const categoryAImageURL = categoryA.Category_Image || categoryA.category_images?.[0]?.url;
      const categoryBImageURL = categoryB.Category_Image || categoryB.category_images?.[0]?.url;

      if (categoryAImageURL && categoryBImageURL) {
        return categoryA.sort_order - categoryB.sort_order;
      } else if (categoryAImageURL && !categoryBImageURL) {
        return -1;
      } else if (!categoryAImageURL && categoryBImageURL) {
        return 1;
      } else {
        return categoryA.sort_order - categoryB.sort_order;
      }
    }).slice(0, 10);

    setFrequentRequests(sortedCategories);
  }, []);

  if (searchValue === "") {
    return (
      <div className={styles.wrapper}>
        <h3 className={styles.header}>Часто ищут</h3>
        {frequentRequests.map((category) => {
          return (
            <div
              className={styles.request}
              onClick={() => {
                handleQuickSearchValueSelect(category.Category_Name);
              }}
            >
              <img className={styles.searchIcon} src={magnifier} alt="icon" />
              <span className={styles.requestName}>
                {category.Category_Name}
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
            (quickSearchResult === null || quickSearchResult.total === 0) ?
              "Результаты не найдены" :
              quickSearchResult.data.products.map(product => {
                return (
                  <div className={styles.cardSearch}>
                    <div className={styles.imageWrp}>
                      {(product.images.length > 0) ? 
                        (
                          <img
                            className={styles.image}
                            src={
                              product?.images.find(image => image.MainImage).Image_URL || noPhoto
                            }
                            alt={product?.title}
                          />
                        ) : (
                          <img
                            className={styles.mockImage}
                            src={noPhoto}
                            alt="Нет фото"
                          />
                      )}
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