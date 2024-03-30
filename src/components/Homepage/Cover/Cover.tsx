import React from "react";
import Quality from "../../../assets/quality.png"
import FeatureItem from './FeatureItem.tsx'
import CoverImg from '../../../assets/cover_img.png'
import Swiper from "../../../composables/swiper.tsx";
const Cover = () => {

  return (
    <div className="max-w-[1500px] mx-auto z-0">
        <Swiper></Swiper>
      <div className="grid grid-cols-gridFlexible2 w-8/10 mx-auto my-[50px] gap-[20px]">
      <div className="flex flex-row justify-evenly w-full ">
        <FeatureItem
          title="Chất lượng"
          description="Đảm bảo chất lượng những dịch vụ tốt nhất"
          imageUrl={Quality}
        />
      </div>
      <div className="flex flex-row justify-evenly">
        <FeatureItem
          title="Chuyên nghiệp"
          description="Có cái tâm, cái tầm trong từng dịch vụ."
          imageUrl={Quality}
        />
      </div>
      <div className="flex flex-row justify-evenly ">
        <FeatureItem
          title="Trợ giúp"
          description="Tư vấn và trợ giúp khách hàng nhanh chóng"
          imageUrl={Quality}
        />
      </div>
      </div>
    </div>
  );
};

export default Cover;
