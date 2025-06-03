import { Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { register } from "swiper/element/bundle";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGetLocalWondersQuery } from "../../../services/api/pages/localWonderSlice";

register();

const LocalAttractionSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data: localWonders, isLoading, isError } = useGetLocalWondersQuery();

  const localWondersData = localWonders?.payload;

  const handleDotClick = (index) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[40vh]">
        <Spin />
      </div>
    );
  }

  if (!isMounted || isError) {
    return null;
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-serif font-bold text-center mb-12 text-gray-800 tracking-tight">
          Explore Local Wonders
        </h1>

        <Swiper
          ref={swiperRef}
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          pagination={false}
          className="attraction-swiper"
        >
          {localWondersData?.map((localWonder, index) => (
            <SwiperSlide key={index}>
              <div className="relative group overflow-hidden shadow-lg m-2 transform transition-all duration-300 hover:scale-105">
                <img
                  src={localWonder?.image}
                  alt={localWonder?.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">
                    {localWonder?.title}
                  </h3>
                  <p className="text-sm opacity-90 mb-2">
                    {localWonder?.description}
                  </p>
                  <p className="text-xs font-medium text-green-300">
                    {localWonder?.type}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex justify-center mt-8 gap-2">
          {localWondersData?.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 mx-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "bg-green-600 w-8 shadow-md"
                  : "bg-gray-300 w-2 hover:bg-gray-400"
              }`}
              aria-label={`Go to attraction ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocalAttractionSlider;
