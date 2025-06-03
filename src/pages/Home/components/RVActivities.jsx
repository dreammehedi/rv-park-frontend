// // "use client";
// // import { useState } from "react";

// // const RVActivities = () => {
// //   const activities = [
// //     {
// //       title: "Dining Recommendations",
// //       description:
// //         "Discover local culinary delights from cozy diners to gourmet restaurants near your RV spot.",
// //       image:
// //         "https://images.unsplash.com/photo-1630218838755-3e4677793759?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
// //       alt: "Elegant outdoor dining setup",
// //     },
// //     {
// //       title: "Boat Rentals",
// //       description:
// //         "Experience the water with easy boat rentals for a day of adventure or relaxation.",
// //       image:
// //         "https://images.unsplash.com/photo-1697643570883-194066cb8a05?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
// //       alt: "Boat cruising on calm lake",
// //     },
// //     {
// //       title: "Fishing & Swimming Spots",
// //       description:
// //         "Cast a line or take a dip in pristine lakes and rivers perfect for water enthusiasts.",
// //       image:
// //         "https://images.unsplash.com/photo-1609859682240-6860cf3d99d5?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
// //       alt: "Person fishing by serene lake",
// //     },
// //     {
// //       title: "Hiking Trails",
// //       description:
// //         "Explore scenic trails through forests and mountains for all skill levels.",
// //       image:
// //         "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
// //       alt: "Hiker on mountain trail",
// //     },
// //   ];

// //   return (
// //     <div className="">
// //       <div className="  max-w-7xl mx-auto px-4 py-14">
// //         <div className="text-center mb-12">
// //           <h1 className="text-4xl font-serif font-bold mb-1 text-gray-800">
// //             Crafted for Adventure & Peace
// //           </h1>
// //           <h1 className="text-4xl font-serif font-bold text-green-700">
// //             Tree RV
// //           </h1>
// //         </div>

// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
// //           {activities.map((activity, index) => (
// //             <div key={index} className="flex flex-col group">
// //               <div className="mb-3 overflow-hidden  shadow-md transform transition-all duration-300 group-hover:scale-105">
// //                 <img
// //                   src={activity.image}
// //                   alt={activity.alt}
// //                   className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
// //                 />
// //               </div>
// //               <h3 className="font-serif font-bold text-xl my-5 text-gray-800 group-hover:text-green-600 transition-colors duration-300">
// //                 {activity.title}
// //               </h3>
// //               <p className="text-sm text-gray-600 leading-relaxed">
// //                 {activity.description}
// //               </p>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default RVActivities;
// "use client";
// import { useState } from "react";
// import { Link } from "react-router-dom";

// const RVActivities = ({ campsites }) => {
//   const campsite = campsites[0]; // Only A Step Above RV Park

//   const activities = [
//     {
//       title: "Table Rock Lake Boating",
//       description:
//         "Rent a boat or bring your own to explore Table Rock Lake, just 2 miles from A Step Above RV Park.",
//       image:
//         "https://images.unsplash.com/photo-1697643570883-194066cb8a05?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       alt: "Boat cruising on calm lake",
//       link: "/attractions/table-rock-lake",
//     },
//     {
//       title: "Fishing at Table Rock",
//       description:
//         "Cast a line at one of the best fishing spots near Shell Knob, minutes from your RV.",
//       image:
//         "https://images.unsplash.com/photo-1609859682240-6860cf3d99d5?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       alt: "Person fishing by serene lake",
//       link: "/attractions/table-rock-lake",
//     },
//     {
//       title: "Silver Dollar City Fun",
//       description:
//         "Enjoy thrilling rides and family entertainment, a short 15-mile drive from A Step Above.",
//       image:
//         "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
//       alt: "Theme park excitement",
//       link: "/attractions/silver-dollar-city",
//     },
//     {
//       title: "Shell Knob Dining",
//       description:
//         "Savor local flavors at nearby eateries, offering everything from casual to fine dining.",
//       image:
//         "https://images.unsplash.com/photo-1630218838755-3e4677793759?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       alt: "Elegant outdoor dining setup",
//       link: "/attractions/shell-knob-dining",
//     },
//   ];

//   return (
//     <div className="">
//       <div className="max-w-7xl mx-auto px-4 py-14">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-serif font-bold mb-1 text-gray-800">
//             Crafted for Adventure & Peace
//           </h1>
//           <h1 className="text-4xl font-serif font-bold text-green-700">
//             A Step Above RV Park
//           </h1>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {activities.map((activity, index) => (
//             <Link
//               to={activity.link}
//               key={index}
//               className="flex flex-col group"
//             >
//               <div className="mb-3 overflow-hidden shadow-md transform transition-all duration-300 group-hover:scale-105">
//                 <img
//                   src={activity.image}
//                   alt={activity.alt}
//                   className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
//                 />
//               </div>
//               <h3 className="font-serif font-bold text-xl my-5 text-gray-800 group-hover:text-green-600 transition-colors duration-300">
//                 {activity.title}
//               </h3>
//               <p className="text-sm text-gray-600 leading-relaxed">
//                 {activity.description}
//               </p>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RVActivities;
import React from "react";
import { Link } from "react-router-dom";
import { useGetAdventureAndPeaceQuery } from "../../../services/api/pages/adventureAndPeaceSlice";

import { Spin } from "antd";

const RVActivities = () => {
  const { data: adventureAndPeace, isLoading } = useGetAdventureAndPeaceQuery();

  const adventureAndPeaceData = adventureAndPeace?.payload;
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[40vh]">
        <Spin />
      </div>
    );
  }

  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold mb-1 text-gray-800">
            Crafted for Adventure & Peace
          </h1>
          <h1 className="text-4xl font-serif font-bold text-green-700">
            A Step Above RV Park
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {adventureAndPeaceData?.map((adventureAndPeace, index) => (
            <Link
              to={`/adventure-and-peace/${adventureAndPeace?._id}`}
              key={index}
              className="flex flex-col group"
            >
              <div className="mb-3 overflow-hidden shadow-md transform transition-all duration-300 group-hover:scale-105">
                <img
                  src={adventureAndPeace?.image}
                  alt={adventureAndPeace?.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="font-serif font-bold text-xl my-5 text-gray-800 group-hover:text-green-600 transition-colors duration-300">
                {adventureAndPeace?.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {adventureAndPeace?.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RVActivities;
