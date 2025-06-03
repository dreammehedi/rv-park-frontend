// // import { useRef, useState, useEffect } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import "swiper/css";
// // import "swiper/css/effect-fade";
// // import "swiper/css/navigation";
// // import "swiper/css/pagination";
// // import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
// // import { Swiper, SwiperSlide } from "swiper/react";
// // import { useGetBannerSliderQuery } from "../../../services/api/pages/bannerSliderSlice";
// // import { useGetAdventureAndPeaceQuery } from "../../../services/api/pages/adventureAndPeaceSlice";
// // import { useGetLocalAttractionsQuery } from "../../../services/api/pages/localAttractionsSlice";
// // import { useGetRvCampsitesQuery } from "../../../services/api/pages/rvCampsitesSlice";

// // const HeroSlider = () => {
// //   const [activeIndex, setActiveIndex] = useState(0);
// //   const swiperRef = useRef(null);
// //   const navigate = useNavigate();

// //   const { data: bannerSliderData, isLoading: bannerSliderLoading } =
// //     useGetBannerSliderQuery();
// //   const { data: adventureData, isLoading: adventureLoading } =
// //     useGetAdventureAndPeaceQuery();
// //   const { data: attractionData, isLoading: attractionLoading } =
// //     useGetLocalAttractionsQuery();
// //   const { data: campsiteData, isLoading: campsiteLoading } =
// //     useGetRvCampsitesQuery();

// //   const isLoading =
// //     bannerSliderLoading ||
// //     adventureLoading ||
// //     attractionLoading ||
// //     campsiteLoading;

// //   // Combine all data into a single array with consistent structure
// //   const combinedData = [
// //     ...(bannerSliderData?.payload || []).map((item) => ({
// //       ...item,
// //       type: "banner",
// //       redirectPath: "rv-park",
// //     })),
// //     ...(adventureData?.payload || []).map((item) => ({
// //       ...item,
// //       shortDescription: item.description?.substring(0, 100) + "...",
// //       longDescription: item.description,
// //       type: "adventure",
// //       redirectPath: `/adventure-and-peace/${item._id}`,
// //     })),
// //     ...(attractionData?.payload || []).map((item) => ({
// //       ...item,
// //       shortDescription: item.description?.substring(0, 100) + "...",
// //       longDescription: item.description,
// //       type: "attraction",
// //       redirectPath: `/attractions/${item._id}`,
// //     })),
// //     ...(campsiteData?.payload || []).map((item) => ({
// //       ...item,
// //       shortDescription: item.description?.substring(0, 100) + "...",
// //       longDescription: item.description,
// //       type: "campsite",
// //       redirectPath: `/reservation-details/${item._id}`,
// //     })),
// //   ];

// //   // Ensure autoplay starts after data is loaded
// //   useEffect(() => {
// //     if (!isLoading && swiperRef.current && swiperRef.current.swiper) {
// //       swiperRef.current.swiper.autoplay.start();
// //     }
// //   }, [isLoading]);

// //   const handleDotClick = (index) => {
// //     if (swiperRef.current && swiperRef.current.swiper) {
// //       swiperRef.current.swiper.slideToLoop(index); // Use slideToLoop for looped slides
// //     }
// //   };

// //   const handleDestinationClick = (slideIndex, event) => {
// //     event.preventDefault();
// //     if (swiperRef.current && swiperRef.current.swiper) {
// //       swiperRef.current.swiper.slideToLoop(slideIndex);
// //     }
// //   };

// //   const handleCTAClick = (path) => {
// //     if (path.startsWith("http")) {
// //       window.location.href = path;
// //     } else {
// //       navigate(path);
// //     }
// //   };

// //   if (!combinedData.length && !isLoading) return null;

// //   return (
// //     <div className="relative w-full -mt-18 h-screen overflow-hidden">
// //       {isLoading && (
// //         <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-900">
// //           <div className="w-12 h-12 border-4 border-t-orange-500 border-gray-200 rounded-full animate-spin"></div>
// //         </div>
// //       )}

// //       <Swiper
// //         ref={swiperRef}
// //         modules={[Autoplay, EffectFade, Navigation, Pagination]}
// //         effect="fade"
// //         fadeEffect={{ crossFade: true }}
// //         autoplay={{
// //           delay: 6000,
// //           disableOnInteraction: false,
// //           pauseOnMouseEnter: false,
// //         }}
// //         speed={1000} // Smooth transition speed
// //         onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // Use realIndex for loop
// //         pagination={false}
// //         navigation={{
// //           nextEl: ".swiper-button-next",
// //           prevEl: ".swiper-button-prev",
// //         }}
// //         loop={true}
// //         className="w-full h-full"
// //       >
// //         {combinedData.map((slide, index) => (
// //           <SwiperSlide key={index}>
// //             <div className="relative w-full h-full flex items-center">
// //               <div className="absolute inset-0 bg-gray-900 animate-pulse"></div>
// //               <img
// //                 src={slide?.image || "/placeholder.svg"}
// //                 alt={slide?.title}
// //                 className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
// //                 onLoad={(e) => {
// //                   e.target.classList.remove("opacity-0");
// //                   e.target.classList.add("opacity-100");
// //                 }}
// //                 loading={index === 0 ? "eager" : "lazy"}
// //               />
// //               <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent pointer-events-none"></div>
// //               <div className="relative z-10 container mx-auto px-4">
// //                 <div
// //                   className="max-w-lg opacity-0 animate-fade-in"
// //                   style={{
// //                     animationDelay: "300ms",
// //                     animationFillMode: "forwards",
// //                   }}
// //                 >
// //                   <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white leading-tight tracking-tight">
// //                     {slide?.title}
// //                   </h1>
// //                   <p className="text-sm md:text-base lg:text-lg text-white mb-4 max-w-md tracking-wide">
// //                     {slide?.shortDescription}
// //                   </p>
// //                   <p className="text-base md:text-lg text-white mb-8 max-w-md">
// //                     {slide?.longDescription}
// //                   </p>
// //                   <button
// //                     onClick={() => handleCTAClick(slide.redirectPath)}
// //                     className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-8 py-3 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
// //                     aria-label={slide?.cta || "Learn More"}
// //                   >
// //                     {slide?.cta || "Learn More"}
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </SwiperSlide>
// //         ))}
// //       </Swiper>

// //       <div className="absolute bottom-32 md:bottom-40 right-6 md:right-12 lg:right-24 z-20 flex mb-4 gap-2">
// //         {combinedData.map((_, index) => (
// //           <button
// //             key={index}
// //             onClick={() => handleDotClick(index)}
// //             className={`w-2 h-2 mx-1.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
// //               activeIndex === index
// //                 ? "bg-yellow-600 w-8"
// //                 : "bg-white/50 hover:bg-white/70"
// //             }`}
// //             aria-label={`Go to slide ${index + 1}`}
// //             aria-current={activeIndex === index ? "true" : "false"}
// //           />
// //         ))}
// //       </div>

// //       <div className="absolute bottom-0 left-0 right-0 backdrop-blur-sm z-20 shadow-md">
// //         <div className="container mx-auto py-4">
// //           <div className="flex overflow-x-auto gap-4 px-4 scrollbar-hide pt-2 justify-center">
// //             {combinedData.map((destination, index) => (
// //               <div key={index} className="flex-shrink-0 text-center group">
// //                 <div
// //                   className={`relative overflow-hidden rounded-sm ${
// //                     activeIndex === index ? "ring-2 ring-orange-500" : ""
// //                   }`}
// //                   onClick={(e) => handleDestinationClick(index, e)}
// //                 >
// //                   <img
// //                     src={destination?.image || "/placeholder.svg"}
// //                     alt={destination?.title}
// //                     className="w-48 h-24 object-cover transition-transform duration-500 group-hover:scale-110"
// //                   />
// //                   <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
// //                 </div>
// //                 <p
// //                   className={`text-xs font-medium mt-1 ${
// //                     activeIndex === index ? "text-yellow-500" : "text-slate-200"
// //                   } group-hover:text-yellow-500 transition-colors duration-300`}
// //                 >
// //                   {destination?.type}
// //                 </p>
// //               </div>
// //             ))}
// //             <Link
// //               to="/attractions"
// //               className="flex-shrink-0 flex items-center justify-center group"
// //             >
// //               <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full group-hover:bg-orange-100 transition-colors duration-300">
// //                 <svg
// //                   xmlns="http://www.w3.org/2000/svg"
// //                   className="h-5 w-5 text-gray-600 group-hover:text-yellow-500 transition-colors duration-300"
// //                   viewBox="0 0 20 20"
// //                   fill="currentColor"
// //                 >
// //                   <path
// //                     fillRule="evenodd"
// //                     d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
// //                     clipRule="evenodd"
// //                   />
// //                 </svg>
// //               </div>
// //               <span className="ml-2 text-xs font-medium text-gray-800 group-hover:text-yellow-500 transition-colors duration-300">
// //                 VIEW ALL
// //               </span>
// //             </Link>
// //           </div>
// //         </div>
// //       </div>

// //       <style jsx>{`
// //         @keyframes fade-in {
// //           from {
// //             opacity: 0;
// //             transform: translateY(20px);
// //           }
// //           to {
// //             opacity: 1;
// //             transform: translateY(0);
// //           }
// //         }
// //         .animate-fade-in {
// //           animation: fade-in 0.8s ease-out forwards;
// //         }
// //         .scrollbar-hide {
// //           -ms-overflow-style: none;
// //           scrollbar-width: none;
// //         }
// //         .scrollbar-hide::-webkit-scrollbar {
// //           display: none;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default HeroSlider;
// import { useRef, useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "swiper/css";
// import "swiper/css/effect-fade";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { useGetRvCampsitesQuery } from "../../../services/api/pages/rvCampsitesSlice";
// import { useGetBannerSliderQuery } from "../../../services/api/pages/bannerSliderSlice";
// import { useGetAdventureAndPeaceQuery } from "../../../services/api/pages/adventureAndPeaceSlice";
// import { useGetLocalAttractionsQuery } from "../../../services/api/pages/localAttractionsSlice";

// const HeroSlider = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const swiperRef = useRef(null);
//   const navigate = useNavigate();

//   // Reordered: RV Campsites first
//   const { data: campsiteData, isLoading: campsiteLoading } =
//     useGetRvCampsitesQuery();
//   const { data: bannerSliderData, isLoading: bannerSliderLoading } =
//     useGetBannerSliderQuery();
//   const { data: adventureData, isLoading: adventureLoading } =
//     useGetAdventureAndPeaceQuery();
//   const { data: attractionData, isLoading: attractionLoading } =
//     useGetLocalAttractionsQuery();

//   const isLoading =
//     campsiteLoading ||
//     bannerSliderLoading ||
//     adventureLoading ||
//     attractionLoading;

//   // Combine all data into a single array with consistent structure
//   const combinedData = [
//     ...(campsiteData?.payload || []).map((item) => ({
//       id: item._id,
//       title: item.title,
//       shortDescription: item.description?.substring(0, 100) + "...",
//       longDescription: item.description,
//       image: item.image || "/placeholder.svg", // Use API-provided image or fallback
//       type: "campsite",
//       redirectPath: `/reservation-details/${item._id}`,
//       cta: item.cta || "Book Now",
//     })),
//     ...(bannerSliderData?.payload || []).map((item) => ({
//       id: item._id,
//       title: item.title,
//       shortDescription: item.shortDescription,
//       longDescription: item.longDescription,
//       image: item.image || "/placeholder.svg",
//       type: "banner",
//       redirectPath: item.redirectPath || "rv-park",
//       cta: item.cta || "Learn More",
//     })),
//     ...(adventureData?.payload || []).map((item) => ({
//       id: item._id,
//       title: item.title,
//       shortDescription: item.description?.substring(0, 100) + "...",
//       longDescription: item.description,
//       image: item.image || "/placeholder.svg",
//       type: "adventure",
//       redirectPath: `/adventure-and-peace/${item._id}`,
//       cta: item.cta || "Explore",
//     })),
//     ...(attractionData?.payload || []).map((item) => ({
//       id: item._id,
//       title: item.title,
//       shortDescription: item.description?.substring(0, 100) + "...",
//       longDescription: item.description,
//       image: item.image || "/placeholder.svg",
//       type: "attraction",
//       redirectPath: `/attractions/${item._id}`,
//       cta: item.cta || "Visit",
//     })),
//   ];

//   // Ensure autoplay starts after data is loaded
//   useEffect(() => {
//     if (!isLoading && swiperRef.current?.swiper) {
//       swiperRef.current.swiper.autoplay.start();
//     }
//   }, [isLoading]);

//   // Sync active index with Swiper
//   const handleSlideChange = (swiper) => {
//     setActiveIndex(swiper.realIndex);
//   };

//   const handleDotClick = (index) => {
//     if (swiperRef.current?.swiper) {
//       swiperRef.current.swiper.slideToLoop(index);
//     }
//   };

//   const handleThumbnailClick = (index) => {
//     if (swiperRef.current?.swiper) {
//       swiperRef.current.swiper.slideToLoop(index);
//     }
//   };

//   const handleCTAClick = (path) => {
//     if (path.startsWith("http")) {
//       window.location.href = path;
//     } else {
//       navigate(path);
//     }
//   };

//   if (!combinedData.length && !isLoading) return null;

//   return (
//     <div className="relative w-full -mt-18 h-screen overflow-hidden">
//       {isLoading && (
//         <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-900">
//           <div className="w-12 h-12 border-4 border-t-orange-500 border-gray-200 rounded-full animate-spin"></div>
//         </div>
//       )}

//       <Swiper
//         ref={swiperRef}
//         modules={[Autoplay, EffectFade, Navigation, Pagination]}
//         effect="fade"
//         fadeEffect={{ crossFade: true }}
//         autoplay={{
//           delay: 6000,
//           disableOnInteraction: false,
//           pauseOnMouseEnter: false,
//         }}
//         speed={1000}
//         onSlideChange={handleSlideChange}
//         pagination={false}
//         navigation={{
//           nextEl: ".swiper-button-next",
//           prevEl: ".swiper-button-prev",
//         }}
//         loop={true}
//         className="w-full h-full"
//       >
//         {combinedData.map((slide, index) => (
//           <SwiperSlide key={slide.id || index}>
//             <div className="relative w-full h-full flex items-center">
//               <div className="absolute inset-0 bg-gray-900 animate-pulse"></div>
//               <img
//                 src={slide.image}
//                 alt={slide.title}
//                 className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
//                 onLoad={(e) => {
//                   e.target.classList.remove("opacity-0");
//                   e.target.classList.add("opacity-100");
//                 }}
//                 loading={index === 0 ? "eager" : "lazy"}
//               />
//               <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent pointer-events-none"></div>
//               <div className="relative z-10 container mx-auto px-4">
//                 <div
//                   className="max-w-lg opacity-0 animate-fade-in"
//                   style={{
//                     animationDelay: "300ms",
//                     animationFillMode: "forwards",
//                   }}
//                 >
//                   <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white leading-tight tracking-tight">
//                     {slide.title}
//                   </h1>
//                   <p className="text-sm md:text-base lg:text-lg text-white mb-4 max-w-md tracking-wide">
//                     {slide.shortDescription}
//                   </p>
//                   <p className="text-base md:text-lg text-white mb-8 max-w-md">
//                     {slide.longDescription}
//                   </p>
//                   <button
//                     onClick={() => handleCTAClick(slide.redirectPath)}
//                     className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-8 py-3 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
//                     aria-label={slide.cta}
//                   >
//                     {slide.cta}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       <div className="absolute bottom-32 md:bottom-40 right-6 md:right-12 lg:right-24 z-20 flex mb-4 gap-2">
//         {combinedData.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => handleDotClick(index)}
//             className={`w-2 h-2 mx-1.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
//               activeIndex === index
//                 ? "bg-yellow-600 w-8"
//                 : "bg-white/50 hover:bg-white/70"
//             }`}
//             aria-label={`Go to slide ${index + 1}`}
//             aria-current={activeIndex === index ? "true" : "false"}
//           />
//         ))}
//       </div>

//       <div className="absolute bottom-0 left-0 right-0 z-20">
//         <div className="container mx-auto py-4">
//           <div className="relative flex items-center">
//             <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-900/50 to-transparent z-10 pointer-events-none"></div>
//             <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-900/50 to-transparent z-10 pointer-events-none"></div>
//             <div className="flex overflow-x-auto gap-4 px-6 scrollbar-custom">
//               {combinedData.map((destination, index) => (
//                 <div
//                   key={destination.id || index}
//                   className="flex-shrink-0 text-center group cursor-pointer"
//                   onClick={() => handleThumbnailClick(index)}
//                 >
//                   <div
//                     className={`relative overflow-hidden rounded-lg shadow-md transition-all duration-300 ${
//                       activeIndex === index
//                         ? "ring-2 ring-yellow-500 scale-105"
//                         : "hover:scale-105"
//                     }`}
//                   >
//                     <img
//                       src={destination.image}
//                       alt={destination.title}
//                       className="w-32 h-20 md:w-40 md:h-24 object-cover transition-transform duration-500 group-hover:scale-110"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                     <p className="absolute bottom-2 left-2 right-2 text-xs md:text-sm font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                       {destination.title}
//                     </p>
//                   </div>
//                   <p
//                     className={`text-xs font-medium mt-2 capitalize ${
//                       activeIndex === index ? "text-yellow-500" : "text-white"
//                     } group-hover:text-yellow-500 transition-colors duration-300`}
//                   >
//                     {destination.type}
//                   </p>
//                 </div>
//               ))}
//               <Link
//                 to="/attractions"
//                 className="flex-shrink-0 flex items-center justify-center group"
//               >
//                 <div className="flex items-center justify-center w-12 h-12 bg-white/90 rounded-full shadow-md group-hover:bg-yellow-500 transition-all duration-300">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6 text-gray-700 group-hover:text-white transition-colors duration-300"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </div>
//                 <span className="ml-2 text-sm font-semibold text-white group-hover:text-yellow-500 transition-colors duration-300">
//                   View All
//                 </span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fade-in {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fade-in {
//           animation: fade-in 0.8s ease-out forwards;
//         }
//         .scrollbar-custom {
//           -ms-overflow-style: none;
//           scrollbar-width: thin;
//           scrollbar-color: rgba(255, 255, 255, 0.5) transparent;
//         }
//         .scrollbar-custom::-webkit-scrollbar {
//           height: 6px;
//         }
//         .scrollbar-custom::-webkit-scrollbar-track {
//           background: transparent;
//         }
//         .scrollbar-custom::-webkit-scrollbar-thumb {
//           background: rgba(255, 255, 255, 0.5);
//           border-radius: 3px;
//         }
//         .scrollbar-custom::-webkit-scrollbar-thumb:hover {
//           background: rgba(255, 255, 255, 0.7);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default HeroSlider;
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGetRvCampsitesQuery } from "../../../services/api/pages/rvCampsitesSlice";
import { useGetBannerSliderQuery } from "../../../services/api/pages/bannerSliderSlice";
import { useGetAdventureAndPeaceQuery } from "../../../services/api/pages/adventureAndPeaceSlice";
import { useGetLocalAttractionsQuery } from "../../../services/api/pages/localAttractionsSlice";

const HeroSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  const { data: campsiteData, isLoading: campsiteLoading } =
    useGetRvCampsitesQuery();

  const { data: adventureData, isLoading: adventureLoading } =
    useGetAdventureAndPeaceQuery();
  const { data: attractionData, isLoading: attractionLoading } =
    useGetLocalAttractionsQuery();

  const isLoading = campsiteLoading || adventureLoading || attractionLoading;

  const combinedData = [
    ...(campsiteData?.payload || []).map((item) => ({
      id: item._id,
      title: item.title,
      shortDescription: item.description?.substring(0, 100) + "...",
      longDescription: item.description,
      image: item.image || "/placeholder.svg",
      type: "campsite",
      redirectPath: `/reservation-details/${item._id}`,
      cta: item.cta || "Book Now",
    })),
    // ...(bannerSliderData?.payload || []).map((item) => ({
    //   id: item._id,
    //   title: item.title,
    //   shortDescription: item.shortDescription,
    //   longDescription: item.longDescription,
    //   image: item.image || "/placeholder.svg",
    //   type: "banner",
    //   redirectPath: item.redirectPath || "rv-park",
    //   cta: item.cta || "Learn More",
    // })),
    ...(adventureData?.payload || []).map((item) => ({
      id: item._id,
      title: item.title,
      shortDescription: item.description?.substring(0, 100) + "...",
      longDescription: item.description,
      image: item.image || "/placeholder.svg",
      type: "adventure",
      redirectPath: `/adventure-and-peace/${item._id}`,
      cta: item.cta || "Explore",
    })),
    ...(attractionData?.payload || []).map((item) => ({
      id: item._id,
      title: item.title,
      shortDescription: item.description?.substring(0, 100) + "...",
      longDescription: item.description,
      image: item.image || "/placeholder.svg",
      type: "attraction",
      redirectPath: `/attractions/${item._id}`,
      cta: item.cta || "Visit",
    })),
  ];

  useEffect(() => {
    if (!isLoading && swiperRef.current?.swiper) {
      swiperRef.current.swiper.autoplay.start();
    }
  }, [isLoading]);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  const handleDotClick = (index) => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slideToLoop(index);
    }
  };

  const handleThumbnailClick = (index) => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slideToLoop(index);
    }
  };

  const handleCTAClick = (path) => {
    if (path.startsWith("http")) {
      window.location.href = path;
    } else {
      navigate(path);
    }
  };

  if (!combinedData.length && !isLoading) return null;

  return (
    <div className="relative w-full -mt-18 h-screen overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-900">
          <div className="w-12 h-12 border-4 border-t-orange-500 border-gray-200 rounded-full animate-spin"></div>
        </div>
      )}

      <Swiper
        ref={swiperRef}
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        speed={1000}
        onSlideChange={handleSlideChange}
        pagination={false}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        loop={true}
        className="w-full h-full"
      >
        {combinedData.map((slide, index) => (
          <SwiperSlide key={slide.id || index}>
            <div className="relative w-full h-full flex items-center">
              <div className="absolute inset-0 bg-gray-900 animate-pulse"></div>
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                onLoad={(e) => {
                  e.target.classList.remove("opacity-0");
                  e.target.classList.add("opacity-100");
                }}
                loading={index === 0 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent pointer-events-none"></div>
              <div className="relative z-10 container mx-auto px-4">
                <div
                  className="max-w-lg opacity-0 animate-fade-in"
                  style={{
                    animationDelay: "300ms",
                    animationFillMode: "forwards",
                  }}
                >
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white leading-tight tracking-tight">
                    {slide.title}
                  </h1>
                  <p className="text-sm md:text-base lg:text-lg text-white mb-4 max-w-md tracking-wide">
                    {slide.shortDescription}
                  </p>
                  {/* <p className="text-base md:text-lg text-white mb-8 max-w-md">
                    {slide.longDescription}
                  </p> */}
                  <button
                    onClick={() => handleCTAClick(slide.redirectPath)}
                    className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-8 py-3 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                    aria-label={slide.cta}
                  >
                    {slide.cta}
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute bottom-32 md:bottom-40 right-6 md:right-12 lg:right-24 z-20 flex mb-4 gap-2">
        {combinedData.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-2 h-2 mx-1.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
              activeIndex === index
                ? "bg-yellow-600 w-8"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={activeIndex === index ? "true" : "false"}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gray-900/30 backdrop-blur-md border-t border-white/10">
        <div className="container mx-auto py-4 px-6 w-full">
          <div className="relative flex items-center">
            {/* <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-900/50 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-900/50 to-transparent z-10 pointer-events-none"></div> */}
            <div className="flex overflow-x-auto gap-4 scrollbar-custom w-full">
              {combinedData.map((destination, index) => (
                <div
                  key={destination.id || index}
                  className="flex-shrink-0 text-center group cursor-pointer"
                  onClick={() => handleThumbnailClick(index)}
                >
                  <div
                    className={`relative overflow-hidden rounded-lg mt-2 shadow-md transition-all duration-300 ${
                      activeIndex === index
                        ? "ring-2 ring-yellow-500 scale-105"
                        : "hover:scale-105"
                    }`}
                  >
                    <img
                      src={destination.image}
                      alt={destination.title}
                      className="w-32 h-20 md:w-40 md:h-24 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <p className="absolute bottom-2 left-2 right-2 text-xs md:text-sm font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {destination.title}
                    </p>
                  </div>
                  <p
                    className={`text-xs font-medium mt-2 capitalize ${
                      activeIndex === index ? "text-yellow-500" : "text-white"
                    } group-hover:text-yellow-500 transition-colors duration-300`}
                  >
                    {destination.type}
                  </p>
                </div>
              ))}
              <Link
                to="/attractions"
                className="flex-shrink-0 flex items-center justify-center group"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-white/90 rounded-full shadow-md group-hover:bg-yellow-500 transition-all duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-700 group-hover:text-white transition-colors duration-300"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="ml-2 text-sm font-semibold text-white group-hover:text-yellow-500 transition-colors duration-300">
                  View All
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;
