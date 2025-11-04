import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import promo1 from "../../assets/promo/promo1.png"
import promo2 from "../../assets/promo/promo2.png"
import promo3 from "../../assets/promo/promo3.png"
import styles from "./Promo.module.scss";

export function Promo() {
  const promoImages = [ promo1, promo2, promo3 ];

  return (
    <div className={styles.promo}>
      <Swiper
        style={{
          "--swiper-pagination-color": "white",
          "--swiper-pagination-bullet-size": "3px",
          "--swiper-pagination-bullet-width": "3px",
          "--swiper-pagination-bullet-horizontal-gap": "2px",
          "--swiper-pagination-bullet-inactive-color": "rgba(255, 255, 255, 0.3)",
          "--swiper-pagination-bullet-active-color": "white",
        }}
        initialSlide={0}
        pagination={{ clickable: true }}
        modules={[Pagination]}
      >
        {promoImages.map((promoImage, index) => {
          return (
            <SwiperSlide key={index}>
              <img
                src={promoImage}
                alt="Специльное предложение"
                className={styles.image}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}