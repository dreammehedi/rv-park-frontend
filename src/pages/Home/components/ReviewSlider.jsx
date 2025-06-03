import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { register } from "swiper/element/bundle";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Register Swiper custom elements
register();

const ReviewSlider = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const swiperRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const reviews = [
    [
      {
        id: 1,
        name: "RV Manufacturer",
        role: "Guest",
        rating: 5,
        text: "Curabitur magna nisi, egestas quis est in, finib Nunc vitae amet do sollicitudin gone interdum, maximusneiri orfen doloremkam quis, ullamcor arciubl pellentesque.",
        avatar: "/heroimg.png",
      },
      {
        id: 2,
        name: "RV Manufacturer",
        role: "Guest",
        rating: 5,
        text: "Curabitur magna nisi, egestas quis est in, finib Nunc vitae amet do sollicitudin gone interdum, maximusneiri orfen doloremkam quis, ullamcor arciubl pellentesque.",
        avatar: "/heroimg.png",
      },
      {
        id: 3,
        name: "RV Manufacturer",
        role: "Guest",
        rating: 5,
        text: "Curabitur magna nisi, egestas quis est in, finib Nunc vitae amet do sollicitudin gone interdum, maximusneiri orfen doloremkam quis, ullamcor arciubl pellentesque.",
        avatar: "/heroimg.png",
      },
    ],
    [
      {
        id: 4,
        name: "RV Manufacturer",
        role: "Guest",
        rating: 5,
        text: "Curabitur magna nisi, egestas quis est in, finib Nunc vitae amet do sollicitudin gone interdum, maximusneiri orfen doloremkam quis, ullamcor arciubl pellentesque.",
        avatar: "/heroimg.png",
      },
      {
        id: 5,
        name: "RV Manufacturer",
        role: "Guest",
        rating: 5,
        text: "Curabitur magna nisi, egestas quis est in, finib Nunc vitae amet do sollicitudin gone interdum, maximusneiri orfen doloremkam quis, ullamcor arciubl pellentesque.",
        avatar: "/heroimg.png",
      },
      {
        id: 6,
        name: "RV Manufacturer",
        role: "Guest",
        rating: 5,
        text: "Curabitur magna nisi, egestas quis est in, finib Nunc vitae amet do sollicitudin gone interdum, maximusneiri orfen doloremkam quis, ullamcor arciubl pellentesque.",
        avatar: "/heroimg.png",
      },
    ],
    [
      {
        id: 7,
        name: "RV Manufacturer",
        role: "Guest",
        rating: 5,
        text: "Curabitur magna nisi, egestas quis est in, finib Nunc vitae amet do sollicitudin gone interdum, maximusneiri orfen doloremkam quis, ullamcor arciubl pellentesque.",
        avatar: "/heroimg.png",
      },
      {
        id: 8,
        name: "RV Manufacturer",
        role: "Guest",
        rating: 5,
        text: "Curabitur magna nisi, egestas quis est in, finib Nunc vitae amet do sollicitudin gone interdum, maximusneiri orfen doloremkam quis, ullamcor arciubl pellentesque.",
        avatar: "/heroimg.png",
      },
      {
        id: 9,
        name: "RV Manufacturer",
        role: "Guest",
        rating: 5,
        text: "Curabitur magna nisi, egestas quis est in, finib Nunc vitae amet do sollicitudin gone interdum, maximusneiri orfen doloremkam quis, ullamcor arciubl pellentesque.",
        avatar: "/heroimg.png",
      },
    ],
  ];

  const renderStars = (count) => {
    return Array(count)
      .fill()
      .map((_, i) => (
        <span key={i} className="text-yellow-400 text-xl">
          ★
        </span>
      ));
  };

  const handleDotClick = (index) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  if (!isMounted) {
    return null; // Return null on server-side
  }

  return (
    <div className="bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-serif font-bold text-center mb-10">
          Inspired by Thousand Trails
        </h1>

        <Swiper
          ref={swiperRef}
          modules={[Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          pagination={false}
          className="review-swiper"
          initialSlide={1}
        >
          {reviews.map((group, groupIndex) => (
            <SwiperSlide key={groupIndex}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {group.map((review) => (
                  <div key={review.id} className="bg-white p-6 ">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <img
                          src={review.avatar || "/placeholder.svg"}
                          alt={review.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      </div>
                      <div className="flex">{renderStars(review.rating)}</div>
                    </div>
                    <div className=" py-4">
                      <h3 className="font-medium text-sm">{review.name}</h3>
                      <p className="text-gray-500 text-xs">{review.role}</p>
                    </div>

                    <p className="text-gray-600 text-sm">{review.text}</p>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex justify-center mt-8">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 mx-1 rounded-full transition-all duration-300 ${
                activeIndex === index ? "bg-green-800 w-6" : "bg-gray-400 w-2 "
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewSlider;
