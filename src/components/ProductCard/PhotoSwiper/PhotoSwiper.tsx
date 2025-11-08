import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import noPhoto from "../../../assets/no-photo.svg";
import styles from "./PhotoSwiper.module.scss";

import "swiper/css";
import "swiper/css/pagination";
import type Product from "../../../types/Product";

export function PhotoSwiper({ productData }: { productData: Product }) {
  return (
    <div className={styles.imageWrp}>
      {(productData.images.length > 0) ? 
        <Swiper
          className={styles.swiper}
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