import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import noPhoto from "../../../assets/no-photo.svg";
import styles from "./PhotoSwiper.module.scss";

import "swiper/css";
import "swiper/css/pagination";

export function PhotoSwiper({ productData }) {
  return (
    <div className={styles.imageWrp}>
      {(productData.images.length > 0) ? 
        <Swiper
          className={styles.swiper}
          style={{
            "--swiper-pagination-color": "#292928",
            "--swiper-pagination-bullet-size": "3px",
            "--swiper-pagination-bullet-width": "3px",
            "--swiper-pagination-bullet-horizontal-gap": "2px",
            "--swiper-pagination-bullet-inactive-color": "rgba(29, 29, 28,     0.3)",
            "--swiper-pagination-bullet-active-color": "#292928",
          }}
          initialSlide={0}
          pagination={{ clickable: true }}
          modules={[ Pagination ]}
        >
          {productData.images.map((image, index) => {
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
          })}
        </Swiper>
       : (
        <img
          className={styles.mockImage}
          src={noPhoto}
          alt="Нет фото"
        />
      )}
    </div>
  );
}