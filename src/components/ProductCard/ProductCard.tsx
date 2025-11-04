import { useState } from "react";
import heartOn from "../../assets/icons/heart/heart-on.svg"
import heartOff from "../../assets/icons/heart/heart-off.svg"
import marksData from "../../constants/marks";
import styles from "./ProductCard.module.scss";

import "swiper/css";
import "swiper/css/pagination";
import { PhotoSwiper } from "./PhotoSwiper/PhotoSwiper";
import type Product from "../../types/Product";

export function ProductCard({ productData }: {productData: Product}) {
  const [ favorite, setFavorite ] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.marks}>
          {productData.marks.map((mark, index) => {
            return (
              <span
                className={styles.mark}
                style={{
                  backgroundColor: mark.color_code,
                  color: "white"
                }}
                key={index}
              >
                {marksData[mark.Mark_Name]?.visibleName || mark.Mark_Name}
              </span>
            );
          })}
        </div>
        <img
          className={styles.favorite}
          src={favorite ? heartOn : heartOff}
          alt="Избранное"
          onClick={() => {
            setFavorite(!favorite);
          }}
        />
      </div>
      <PhotoSwiper productData={productData} />
      <div className={styles.description}>
        <div className={styles.priceWrp}>
          <span className={styles.price}>{productData.price} &#8381;</span>
          <span className={styles.oldPrice}>
            {productData.old_price ? `${productData.old_price} \u20bd` : ""}
          </span>
          <span className={styles.discountPercent}>
            {
              productData.old_price ?
                `-${100 - Math.round(100 * productData.price / productData.old_price)}%` :
                ""
            }
          </span>
        </div>
        <div className={styles.name}>{productData.name}</div>
      </div>
      <button className={styles.chooseBtn}>Выбрать</button>
    </div>
  );
}