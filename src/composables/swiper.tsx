import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import CoverImg from '../assets/cover_img.png';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const SwiperComponent = () => {
  const swiperList = () => {
    return <img src={CoverImg} alt='cover_img' className='w-full h-full object-cover' />;
  };

  return (
    <div className="w-6/10 h-full mx-auto my-12 max-w-[1500px]">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        autoplay={{ delay: 1000 }}
        loop={true}
      >
        <SwiperSlide>{swiperList()}</SwiperSlide>
        <SwiperSlide>{swiperList()}</SwiperSlide>
        <SwiperSlide>{swiperList()}</SwiperSlide>
        <SwiperSlide>{swiperList()}</SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwiperComponent;
