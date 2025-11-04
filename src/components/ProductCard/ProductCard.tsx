import noPhoto from "../../assets/no-photo.svg";
import heartOn from "../../assets/icons/heart/heart-on.svg"
import heartOff from "../../assets/icons/heart/heart-off.svg"
import marksData from "../../constants/marks";
import styles from "./ProductCard.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export function ProductCard({ productData }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.marks}>
          {productData.marks.map(mark => {
            return (
              <span
                className={styles.mark}
                style={{
                  backgroundColor: mark.color_code,
                  color: "white"
                }}
              >
                {mark.Mark_Name}
              </span>
            );
          })}
        </div>
        <img
          className={styles.favorite}
          src={heartOn}
          alt="Избранное"
        />
      </div>
      <div className={styles.imageWrp}>
          <Swiper
            style={{
              "--swiper-pagination-color": "#292928",
              "--swiper-pagination-bullet-size": "3px",
              "--swiper-pagination-bullet-width": "3px",
              "--swiper-pagination-bullet-horizontal-gap": "2px",
              "--swiper-pagination-bullet-inactive-color": "rgba(29, 29, 28,     0.3)",
              "--swiper-pagination-bullet-active-color": "#292928",
              width: "100%",
              height: "calc((100vw - 14px) / 2)"
            }}
            initialSlide={0}
            pagination={{
              clickable: true,
            }}
            modules={[ Pagination ]}
          >
            {(productData.images.length > 0) ? productData.images.map((image, index) => {
              return (
                <SwiperSlide key={index} style={{
                  width: "100%",
                  height: "100%"
                }}>
                  <img
                    className={styles.image}
                    src={image?.Image_URL || noPhoto}
                    alt={image?.title}
                  />
                </SwiperSlide>
              );
            }) : (<img
                    className={styles.mockImage}
                    src={noPhoto}
                    alt="Нет фото"
                  />)
          }
          </Swiper>
      </div>
      
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