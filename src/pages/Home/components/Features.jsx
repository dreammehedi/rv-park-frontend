// import React from "react";
// import {
//   GiPineTree,
//   GiWaveCrest,
//   GiFishing,
//   GiSailboat,
//   GiCampfire,
// } from "react-icons/gi";
// import { FaArrowRight } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const Features = ({ campsites }) => {
//   const campsite = campsites[0]; // Only A Step Above RV Park

//   const features = [
//     {
//       icon: <GiPineTree className="text-yellow-500 text-5xl" />,
//       title: "Shaded RV Sites",
//       description:
//         "Relax in serene, wooded sites at A Step Above RV Park in Shell Knob, MO.",
//     },
//     {
//       icon: <GiWaveCrest className="text-yellow-500 text-5xl" />,
//       title: "Table Rock Lake Access",
//       description:
//         "Enjoy stunning lake views and easy access just 2 miles from your RV.",
//     },
//     {
//       icon: <GiFishing className="text-yellow-500 text-5xl" />,
//       title: "Fishing Nearby",
//       description:
//         "Cast your line at Table Rock Lake, minutes from A Step Above RV Park.",
//     },
//     {
//       icon: <GiSailboat className="text-yellow-500 text-5xl" />,
//       title: "Boating Adventures",
//       description:
//         "Launch or rent a boat to explore Table Rock Lake near Shell Knob.",
//     },
//     {
//       icon: <GiCampfire className="text-yellow-500 text-5xl" />,
//       title: "Campfire Evenings",
//       description:
//         "Gather around cozy fire pits for memorable nights at your RV site.",
//     },
//   ];

//   return (
//     <div className="py-16 px-4 bg-gray-50">
//       <div className="max-w-[1260px] mx-auto">
//         <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-12 text-gray-800">
//           Your RV Experience at A Step Above
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className="bg-white p-8 flex flex-col items-center text-center shadow-md hover:shadow-lg transition-shadow duration-300"
//             >
//               <div className="mb-6 transform transition-transform duration-300 hover:scale-110">
//                 {feature.icon}
//               </div>
//               <h3 className="text-xl font-semibold mb-3 text-gray-800">
//                 {feature.title}
//               </h3>
//               <p className="text-sm text-gray-600 leading-relaxed">
//                 {feature.description}
//               </p>
//             </div>
//           ))}

//           <div className="flex items-center justify-center mt-8">
//             <Link
//               to="/rv-park"
//               className="bg-yellow-500 text-white px-8 py-3 flex items-center gap-3 hover:bg-yellow-600 transition-colors duration-300 text-base font-medium"
//             >
//               Explore More <FaArrowRight />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Features;
import { Spin } from "antd";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetRvExperienceQuery } from "../../../services/api/pages/rvExperienceSlice";

const Features = ({ campsites }) => {
  const campsite = campsites[0]; // Only A Step Above RV Park

  const { data: rvExperience, isLoading } = useGetRvExperienceQuery();
  const rvExperienceData = rvExperience?.payload;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[30vh]">
        <Spin />
      </div>
    );
  }

  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="max-w-[1260px] mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-12 text-gray-800">
          Your RV Experience at {campsite?.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rvExperienceData?.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 flex flex-col items-center text-center shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-6 transform transition-transform duration-300 hover:scale-110">
                <img
                  src={feature?.image}
                  alt={feature?.title}
                  className="w-14 h-14"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {feature?.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature?.description}
              </p>
            </div>
          ))}

          <div className="flex items-center justify-center mt-8">
            <Link
              to="/rv-park"
              className="bg-yellow-500 text-white px-8 py-3 flex items-center gap-3 hover:bg-yellow-600 transition-colors duration-300 text-base font-medium"
            >
              Explore More <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
