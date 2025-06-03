// // import React from "react";

// // const OutdoorActivities = () => {
// //   const activities = [
// //     {
// //       title: "Fine Dining & Local Cuisine",
// //       description:
// //         "Experience top-tier restaurants and explore local food trucks offering delicious meals.",
// //       image:
// //         "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1500&auto=format&fit=crop",
// //     },
// //     {
// //       title: "Boat & Kayak Rentals",
// //       description:
// //         "Enjoy the open water with a variety of boat rental services, including kayaks and canoes.",
// //       image:
// //         "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1500&auto=format&fit=crop",
// //     },
// //     {
// //       title: "Fishing & Swimming Spots",
// //       description:
// //         "Find the best lakes and rivers for fishing, plus safe swimming areas for all ages.",
// //       image:
// //         "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1500&auto=format&fit=crop",
// //     },
// //     {
// //       title: "Scenic Hiking & Nature Trails",
// //       description:
// //         "Discover breathtaking trails with varying difficulty levels, from easy walks to advanced hikes.",
// //       image:
// //         "https://images.unsplash.com/photo-1521334884684-d80222895322?q=80&w=1500&auto=format&fit=crop",
// //     },
// //   ];

// //   return (
// //     <div className="py-12 px-4 bg-white">
// //       <div className="max-w-7xl mx-auto">
// //         {/* Heading */}
// //         <h2 className="text-4xl font-serif font-bold text-center mb-10 text-gray-800">
// //           Discover Outdoor Adventures & Activities
// //         </h2>

// //         {/* Grid Layout */}
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// //           {activities.map((activity, index) => (
// //             <div
// //               key={index}
// //               className="bg-white shadow-md flex flex-col transform transition-transform duration-300 hover:scale-105 hover:shadow-lg border border-gray-200"
// //             >
// //               <div className="w-full h-48">
// //                 <img
// //                   src={activity.image}
// //                   alt={activity.title}
// //                   className="w-full h-full object-cover"
// //                 />
// //               </div>
// //               <div className="p-4 flex flex-col flex-grow">
// //                 <h3 className="text-lg font-semibold mb-2 text-gray-900">
// //                   {activity.title}
// //                 </h3>
// //                 <p className="text-sm text-gray-600 mb-4 flex-grow">
// //                   {activity.description}
// //                 </p>
// //                 <button className="bg-yellow-500 text-white px-4 py-2 hover:bg-yellow-600">
// //                   Book Now
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default OutdoorActivities;

// import React from "react";
// import { Link } from "react-router-dom";

// const OutdoorActivities = ({ campsite }) => {
//   const activities = [
//     {
//       title: "Table Rock Lake Adventures",
//       description:
//         "Boat, fish, or swim at Table Rock Lake, just 2 miles from A Step Above RV Park.",
//       image:
//         "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1500&auto=format&fit=crop",
//       path: "/attractions/table-rock-lake",
//     },
//     {
//       title: "Silver Dollar City",
//       description:
//         "Enjoy rides and entertainment 15 miles away in Branson, a short drive from Shell Knob.",
//       image:
//         "https://images.unsplash.com/photo-1521334884684-d80222895322?q=80&w=1500&auto=format&fit=crop",
//       path: "/attractions/silver-dollar-city",
//     },
//     {
//       title: "Shell Knob Bridge Views",
//       description:
//         "Take in scenic beauty at this local landmark, only 1 mile from your RV.",
//       image:
//         "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1500&auto=format&fit=crop",
//       path: "/attractions/shell-knob-bridge",
//     },
//     {
//       title: "Local Dining in Shell Knob",
//       description:
//         "Explore nearby eateries offering a taste of Missouri, close to A Step Above.",
//       image:
//         "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1500&auto=format&fit=crop",
//       path: "/attractions/shell-knob-dining",
//     },
//   ];

//   return (
//     <div className="py-12 px-4 bg-white">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-4xl font-serif font-bold text-center mb-10 text-gray-800">
//           Discover Attractions Near A Step Above RV Park
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {activities.map((activity, index) => (
//             <Link
//               to={activity.path}
//               key={index}
//               className="bg-white shadow-md flex flex-col transform transition-transform duration-300 hover:scale-105 hover:shadow-lg border border-gray-200"
//             >
//               <div className="w-full h-48">
//                 <img
//                   src={activity.image}
//                   alt={activity.title}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="p-4 flex flex-col flex-grow">
//                 <h3 className="text-lg font-semibold mb-2 text-gray-900">
//                   {activity.title}
//                 </h3>
//                 <p className="text-sm text-gray-600 mb-4 flex-grow">
//                   {activity.description}
//                 </p>
//                 <button className="bg-yellow-500 text-white px-4 py-2 hover:bg-yellow-600">
//                   Learn More
//                 </button>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OutdoorActivities;
import { Spin } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { useGetLocalAttractionsQuery } from "../../../services/api/pages/localAttractionsSlice";

const OutdoorActivities = ({ campsite }) => {
  const { data: localAttraction, isLoading } = useGetLocalAttractionsQuery();
  const localAttractionData = localAttraction?.payload;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[30vh]">
        <Spin />
      </div>
    );
  }

  return (
    <div className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-12 text-gray-800">
          Outdoor Activities Near {campsite.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {localAttractionData?.map((localAttraction, index) => (
            <Link
              to={`/attractions/${localAttraction?._id}`}
              key={index}
              className="group bg-white shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            >
              <div className="w-full h-64">
                <img
                  src={localAttraction?.image}
                  alt={localAttraction?.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {localAttraction?.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {localAttraction?.description}
                </p>
                <span className="text-yellow-500 font-medium group-hover:underline">
                  Learn More
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OutdoorActivities;
