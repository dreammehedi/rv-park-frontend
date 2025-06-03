// import { Empty } from "antd";
// import React from "react";
// import { Link, Navigate, useParams } from "react-router-dom";
// import SearchSection from "../../components/shared/SearchSection";
// import SubscribeSection from "../../components/shared/SubscribeSection";
// import { useViewAdventureAndPeaceQuery } from "../../services/api/pages/adventureAndPeaceSlice";

// const AdventureAndPeaceDetailsPage = () => {
//   const { id } = useParams();

//   const { data: adventureAndPeaceDetails, isError } =
//     useViewAdventureAndPeaceQuery({
//       id,
//     });

//   const adventureAndPeaceDetailsData = adventureAndPeaceDetails?.payload;

//   if (isError) {
//     return <Navigate to={"/adventure-and-peace"} replace />;
//   }

//   if (!id) {
//     return (
//       <div className="flex justify-center items-center h-[70vh]">
//         <Empty />
//       </div>
//     );
//   }

//   return (
//     <>
//       <SearchSection />
//       <div className="py-16 px-4 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <div className="mb-12">
//             <img
//               src={adventureAndPeaceDetailsData?.image}
//               alt={adventureAndPeaceDetailsData?.title}
//               className="w-full h-96 object-cover  shadow-md"
//             />
//           </div>
//           <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6">
//             {adventureAndPeaceDetailsData?.title}
//           </h1>
//           <p className="text-gray-600 mb-6 text-lg">
//             {adventureAndPeaceDetailsData?.description}
//           </p>
//           <p className="text-gray-500 mb-4">
//             <span className="font-medium">
//               Distance from {adventureAndPeaceDetailsData?.distanceFrom}:
//             </span>{" "}
//             {adventureAndPeaceDetailsData?.proximity?.map(
//               (proximity, index) => (
//                 <li key={index}>{`${proximity}, `}</li>
//               )
//             )}
//           </p>
//           <p className="text-gray-500 mb-8">
//             <span className="font-medium">Coordinates:</span> Lat{" "}
//             {adventureAndPeaceDetailsData?.lat}, Lng{" "}
//             {adventureAndPeaceDetailsData?.long}
//           </p>

//           <div className="mb-8">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//               Nearby Points of Interest
//             </h2>
//             <ul className="list-disc list-inside text-gray-600">
//               {adventureAndPeaceDetailsData?.nearbyPoints?.map(
//                 (point, index) => (
//                   <li key={index}>{point}</li>
//                 )
//               )}
//             </ul>
//           </div>
//           {/* <div className="mb-8">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//               Nearby Points of Interest
//             </h2>
//             <p className="text-gray-700 mb-3">
//               Located just{" "}
//               {Array.isArray(adventureAndPeaceDetailsData?.proximity)
//                 ? adventureAndPeaceDetailsData?.proximity[0]
//                 : adventureAndPeaceDetailsData?.proximity ||
//                   "a short distance"}{" "}
//               from {adventureAndPeaceDetailsData?.distanceFrom}, this attraction
//               is a must-see during your stay. Explore the surrounding area with
//               these nearby highlights and make the most of your trip!
//             </p>
//             <p className="text-gray-600">
//               <span className="font-medium text-gray-900">Pro Tip:</span> Check
//               local weather and attraction hours before heading out.
//             </p>
//           </div> */}

//           {/* Back Button */}
//           <div className="text-center">
//             <Link
//               to="/adventure-and-peace"
//               className="inline-block bg-yellow-500 text-white px-8 py-3 font-medium hover:bg-yellow-600 transition-colors duration-200 border-2 border-yellow-500"
//             >
//               Back to All Adventure and Peace
//             </Link>
//           </div>
//         </div>
//       </div>
//       <SubscribeSection />
//     </>
//   );
// };

// export default AdventureAndPeaceDetailsPage;
import { Empty } from "antd";
import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import SearchSection from "../../components/shared/SearchSection";
import SubscribeSection from "../../components/shared/SubscribeSection";
import { useViewAdventureAndPeaceQuery } from "../../services/api/pages/adventureAndPeaceSlice";

const AdventureAndPeaceDetailsPage = () => {
  const { id } = useParams();
  const { data: adventureAndPeaceDetails, isError } =
    useViewAdventureAndPeaceQuery({
      id,
    });
  const adventureAndPeaceDetailsData = adventureAndPeaceDetails?.payload;

  if (isError) {
    return <Navigate to={"/adventure-and-peace"} replace />;
  }
  if (!id || !adventureAndPeaceDetailsData) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Empty />
      </div>
    );
  }

  // Convert string coordinates to numbers and provide defaults
  const lat = parseFloat(adventureAndPeaceDetailsData.lat) || 0;
  const long = parseFloat(adventureAndPeaceDetailsData.long) || 0;

  return (
    <>
      <SearchSection />
      <div className="py-16 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          {/* Header Image and Title */}
          <div className="mb-12 border-2 border-gray-300 shadow-lg">
            <img
              src={adventureAndPeaceDetailsData.image}
              alt={adventureAndPeaceDetailsData.title}
              className="w-full h-[500px] object-cover"
            />
            <div className="p-6 bg-white border-t-2 border-yellow-500">
              <h1 className="text-5xl font-serif font-bold text-gray-900 mb-4">
                {adventureAndPeaceDetailsData.title}
              </h1>
              <p className="text-gray-700 text-lg whitespace-pre-line">
                {adventureAndPeaceDetailsData.description}
              </p>
            </div>
          </div>

          {/* Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Left Column: Core Details */}
            <div className="bg-white p-6 border-2 border-gray-300 shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-yellow-500 pb-2">
                Adventure Details
              </h2>
              <p className="text-gray-700 mb-3">
                <span className="font-medium text-gray-900">
                  Distance from {adventureAndPeaceDetailsData.distanceFrom}:
                </span>{" "}
                {adventureAndPeaceDetailsData.proximity?.[0] || "Not specified"}
              </p>
              <p className="text-gray-700 mb-3">
                <span className="font-medium text-gray-900">Coordinates:</span>{" "}
                Lat {lat.toFixed(4)}, Lng {long.toFixed(4)}
              </p>
              <a
                href={`https://www.google.com/maps?q=${lat},${long}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-500 font-medium hover:underline"
              >
                View on Map
              </a>
            </div>

            {/* Right Column: Nearby Points */}
            <div className="bg-white p-6 border-2 border-gray-300 shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-yellow-500 pb-2">
                Nearby Points of Interest
              </h2>
              <ul className="list-none text-gray-700 space-y-2">
                {adventureAndPeaceDetailsData.nearbyPoints?.length > 0 ? (
                  adventureAndPeaceDetailsData.nearbyPoints.map(
                    (point, index) => <li key={index}>{point}</li>
                  )
                ) : (
                  <li>No nearby points available</li>
                )}
              </ul>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-white p-6 border-2 border-gray-300 shadow-md mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-yellow-500 pb-2">
              Plan Your Visit
            </h2>
            <p className="text-gray-700 mb-3">
              Located just{" "}
              {adventureAndPeaceDetailsData.proximity?.[0] ||
                "a short distance"}{" "}
              from {adventureAndPeaceDetailsData.distanceFrom}, this adventure
              is a must-see during your stay. Explore the surrounding area with
              these nearby highlights and make the most of your trip!
            </p>
            <p className="text-gray-600">
              <span className="font-medium text-gray-900">Pro Tip:</span> Check
              local weather and attraction hours before heading out.
            </p>
          </div>

          {/* Back Button */}
          <div className="text-center">
            <Link
              to="/adventure-and-peace"
              className="inline-block bg-yellow-500 text-white px-8 py-3 font-medium hover:bg-yellow-600 transition-colors duration-200 border-2 border-yellow-500"
            >
              Back to All Adventure and Peace
            </Link>
          </div>
        </div>
      </div>
      <SubscribeSection />
    </>
  );
};

export default AdventureAndPeaceDetailsPage;
