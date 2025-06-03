// import React, { useState } from "react";
// import { Navigate, useNavigate, useParams } from "react-router-dom";
// import { Modal, Row, Col, Card } from "antd";
// import { useViewRvCampsiteQuery } from "../../services/api/pages/rvCampsitesSlice";
// import { useGetLocalAttractionsQuery } from "../../services/api/pages/localAttractionsSlice";

// const RVDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedSpot, setSelectedSpot] = useState(null);

//   const { data: rvCampsitesDetails, isError } = useViewRvCampsiteQuery({ id });
//   const { data: localAttractions, isLoading: attractionsLoading } =
//     useGetLocalAttractionsQuery();

//   const rvCampsitesDetailsData = rvCampsitesDetails?.payload;
//   const localAttractionData = localAttractions?.payload || [];

//   const handleBookSpot = (spot) => {
//     setSelectedSpot(spot);
//     setIsModalVisible(true);
//   };

//   const handleModalClose = () => {
//     setIsModalVisible(false);
//     setSelectedSpot(null);
//   };

//   const handleContinueBooking = () => {
//     setIsModalVisible(false);
//     navigate(`/checkout/${rvCampsitesDetailsData._id}`, {
//       state: { selectedSpot: selectedSpot._id },
//     });
//   };

//   if (isError) {
//     return <Navigate to={"/reservation"} replace />;
//   }
//   if (!id) {
//     return (
//       <div className="flex justify-center items-center h-[70vh]">
//         <Empty />
//       </div>
//     );
//   }

//   return (
//     <div className="py-16 px-4 bg-gray-100">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Image and Title */}
//         <div className="mb-12 border-2 border-gray-300 shadow-lg">
//           <img
//             src={rvCampsitesDetailsData?.image}
//             alt={rvCampsitesDetailsData?.title}
//             className="w-full h-[500px] object-cover"
//           />
//           <div className="p-6 bg-white border-t-2 border-yellow-500">
//             <h1 className="text-5xl font-serif font-bold text-gray-900 mb-4">
//               {rvCampsitesDetailsData?.title}
//             </h1>
//             <p className="text-gray-700 text-lg">
//               {rvCampsitesDetailsData?.description}
//             </p>
//           </div>
//         </div>

//         {/* Details Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 h-fit">
//           {/* Left Column: Amenities and Rules */}
//           <div className="bg-white p-6 border-2 border-gray-300 shadow-md h-fit">
//             <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-yellow-500 pb-2">
//               Amenities & Rules
//             </h2>
//             <div className="grid grid-cols-1 gap-6">
//               <div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                   Amenities
//                 </h3>
//                 <ul className="list-none text-gray-700 space-y-1">
//                   {rvCampsitesDetailsData?.amenities?.map((amenity, index) => (
//                     <li key={index} className="flex items-center">
//                       <span className="w-2 h-2 bg-yellow-500 mr-2 inline-block"></span>
//                       {amenity}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               <div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                   Rules
//                 </h3>
//                 <ul className="list-none text-gray-700 space-y-1">
//                   {rvCampsitesDetailsData?.rules?.map((rule, index) => (
//                     <li key={index} className="flex items-center">
//                       <span className="w-2 h-2 bg-yellow-500 mr-2 inline-block"></span>
//                       {rule}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>

//           {/* Right Column: Location Info */}
//           <div className="bg-white p-6 border-2 border-gray-300 shadow-md">
//             <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-yellow-500 pb-2">
//               Location Details
//             </h2>
//             <p className="text-gray-700 mb-3">
//               <span className="font-medium text-gray-900">Price:</span> $
//               {rvCampsitesDetailsData?.price}
//             </p>
//             <p className="text-gray-700 mb-3">
//               <span className="font-medium text-gray-900">Coordinates:</span>{" "}
//               Lat {rvCampsitesDetailsData?.lat}, Lng{" "}
//               {rvCampsitesDetailsData?.long}
//             </p>
//             <a
//               href={`https://www.google.com/maps?q=${rvCampsitesDetailsData?.lat},${rvCampsitesDetailsData?.long}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-yellow-500 font-medium hover:underline mb-4 block"
//             >
//               View on Map
//             </a>
//             <div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                 Proximity to Attractions
//               </h3>
//               <ul className="list-none text-gray-700 space-y-1">
//                 {rvCampsitesDetailsData?.proximity?.map((proxi, index) => (
//                   <li key={index} className="flex items-center">
//                     <span className="w-2 h-2 bg-yellow-500 mr-2 inline-block"></span>
//                     {proxi}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white p-6 border-2 border-gray-300 shadow-md mb-12 h-fit">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-yellow-500 pb-2">
//             Available Spots
//           </h2>
//           {attractionsLoading ? (
//             <p>Loading spots...</p>
//           ) : localAttractionData.length > 0 ? (
//             <Row gutter={[16, 16]}>
//               {localAttractionData.map((spot) => (
//                 <Col xs={24} sm={12} key={spot._id}>
//                   <Card
//                     title={spot.title}
//                     style={{ border: "2px solid #d1d5db" }}
//                     headStyle={{ borderBottom: "2px solid #d1d5db" }}
//                     bodyStyle={{ padding: "16px" }}
//                   >
//                     <p className="text-gray-700 mb-2">
//                       <strong>Proximity:</strong> {spot.proximity[0]}
//                     </p>
//                     <p className="text-gray-700 mb-4">
//                       <strong>Description:</strong> {spot.description}
//                     </p>
//                     <button
//                       onClick={() => handleBookSpot(spot)}
//                       className="bg-yellow-500 text-white px-4 py-2 font-medium hover:bg-yellow-600 transition-colors duration-200 border-2 border-yellow-500 w-full"
//                     >
//                       Book Spot
//                     </button>
//                   </Card>
//                 </Col>
//               ))}
//             </Row>
//           ) : (
//             <p>No spots available.</p>
//           )}
//         </div>
//         {/* Additional Info */}
//         <div className="bg-white p-6 border-2 border-gray-300 shadow-md mb-12 h-fit">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-yellow-500 pb-2">
//             Why Stay Here?
//           </h2>
//           <p className="text-gray-700 mb-3">
//             Enjoy a perfect blend of comfort and adventure at{" "}
//             {rvCampsitesDetailsData?.title}. With easy access to nearby
//             attractions and top-notch amenities, your RV getaway starts here.
//           </p>
//           <p className="text-gray-600">
//             <span className="font-medium text-gray-900">Pro Tip:</span> Book
//             early to secure your spot during peak seasons!
//           </p>
//         </div>

//         {/* Book Now Button */}
//         {/* <div className="text-center">
//           <button
//             onClick={() => navigate(`/checkout/${rvCampsitesDetailsData._id}`)}
//             className="bg-yellow-500 text-white px-8 py-3 font-medium hover:bg-yellow-600 transition-colors duration-200 border-2 border-yellow-500"
//           >
//             Book Now
//           </button>
//         </div> */}
//       </div>

//       {/* Spot Details Modal */}
//       <Modal
//         title={selectedSpot?.title || "Spot Details"}
//         open={isModalVisible}
//         onCancel={handleModalClose}
//         footer={[
//           <button
//             key="cancel"
//             onClick={handleModalClose}
//             className="bg-gray-300 text-gray-800 px-4 py-2 font-medium hover:bg-gray-400 transition-colors duration-200 border-2 border-gray-300 mr-2"
//           >
//             Cancel
//           </button>,
//           <button
//             key="continue"
//             onClick={handleContinueBooking}
//             className="bg-yellow-500 text-white px-4 py-2 font-medium hover:bg-yellow-600 transition-colors duration-200 border-2 border-yellow-500"
//           >
//             Continue Booking
//           </button>,
//         ]}
//       >
//         {selectedSpot ? (
//           <div className="space-y-4">
//             <img
//               src={selectedSpot.image}
//               alt={selectedSpot.title}
//               className="w-full h-48 object-cover"
//             />
//             <p>
//               <strong>Description:</strong> {selectedSpot.description}
//             </p>
//             <p>
//               <strong>Proximity:</strong> {selectedSpot.proximity[0]}
//             </p>
//             <p>
//               <strong>Coordinates:</strong> Lat {selectedSpot.lat}, Lng{" "}
//               {selectedSpot.long}
//             </p>
//           </div>
//         ) : (
//           <p>No details available.</p>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default RVDetails;
import { Card, Col, DatePicker, Modal, Row, Tag } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useViewRvCampsiteQuery } from "../../services/api/pages/rvCampsitesSlice";
import { useGetRvSpotsQuery } from "../../services/api/pages/rvSpotsSlice";

const { RangePicker } = DatePicker;

const RVDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);

  const { data: rvCampsitesDetails, isError } = useViewRvCampsiteQuery({ id });
  const { data: rvSpots, isLoading: spotsLoading } = useGetRvSpotsQuery();

  const rvCampsitesDetailsData = rvCampsitesDetails?.payload;
  const rvSpotsData = rvSpots?.payload || [];

  // Function to check if a spot is available for the selected date range
  const isSpotAvailable = (spot, checkIn, checkOut) => {
    if (!checkIn || !checkOut) return true; // No dates selected, assume bookable
    const checkInDate = dayjs(checkIn);
    const checkOutDate = dayjs(checkOut);

    // Check if the selected range overlaps with any booked periods
    const isBooked = spot.availability.booked.some(
      (booking) =>
        checkOutDate.isAfter(dayjs(booking.from)) &&
        checkInDate.isBefore(dayjs(booking.to))
    );
    if (isBooked) return false;

    // Check if the selected range falls within available periods
    const isAvailable = spot.availability.available.some((avail) => {
      const fromDate = dayjs(avail.from);
      const toDate =
        avail.to === "future" ? dayjs("2100-01-01") : dayjs(avail.to);
      return (
        checkInDate.isSameOrAfter(fromDate) &&
        checkOutDate.isSameOrBefore(toDate)
      );
    });

    return isAvailable;
  };

  const handleBookSpot = (spot) => {
    setSelectedSpot(spot);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedSpot(null);
  };

  const handleContinueBooking = () => {
    setIsModalVisible(false);
    navigate(`/checkout/${rvCampsitesDetailsData._id}`, {
      state: {
        selectedSpot: selectedSpot._id,
        checkInDate: dateRange[0],
        checkOutDate: dateRange[1],
      },
    });
  };

  if (isError) {
    return <Navigate to={"/reservation"} replace />;
  }
  if (!id) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div>No campsite ID provided</div>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header Image and Title */}
        <div className="mb-12 border-2 border-gray-300 shadow-lg">
          <img
            src={rvCampsitesDetailsData?.image}
            alt={rvCampsitesDetailsData?.title}
            className="w-full h-[500px] object-cover"
          />
          <div className="p-6 bg-white border-t-2 border-yellow-500">
            <h1 className="text-5xl font-serif font-bold text-gray-900 mb-4">
              {rvCampsitesDetailsData?.title}
            </h1>
            <p className="text-gray-700 text-lg">
              {rvCampsitesDetailsData?.description}
            </p>
          </div>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 h-fit">
          {/* Left Column: Amenities and Rules */}
          <div className="bg-white p-6 border-2 border-gray-300 shadow-md h-fit">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-yellow-500 pb-2">
              Amenities & Rules
            </h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Amenities
                </h3>
                <ul className="list-none text-gray-700 space-y-1">
                  {rvCampsitesDetailsData?.amenities?.map((amenity, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-500 mr-2 inline-block"></span>
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Rules
                </h3>
                <ul className="list-none text-gray-700 space-y-1">
                  {rvCampsitesDetailsData?.rules?.map((rule, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-500 mr-2 inline-block"></span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Location Info */}
          <div className="bg-white p-6 border-2 border-gray-300 shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-yellow-500 pb-2">
              Location Details
            </h2>
            <p className="text-gray-700 mb-3">
              <span className="font-medium text-gray-900">Price:</span> $
              {rvCampsitesDetailsData?.price}
            </p>
            <p className="text-gray-700 mb-3">
              <span className="font-medium text-gray-900">Coordinates:</span>{" "}
              Lat {rvCampsitesDetailsData?.lat}, Lng{" "}
              {rvCampsitesDetailsData?.long}
            </p>
            <a
              href={`https://www.google.com/maps?q=${rvCampsitesDetailsData?.lat},${rvCampsitesDetailsData?.long}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-500 font-medium hover:underline mb-4 block"
            >
              View on Map
            </a>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Proximity to Attractions
              </h3>
              <ul className="list-none text-gray-700 space-y-1">
                {rvCampsitesDetailsData?.proximity?.map((proxi, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 mr-2 inline-block"></span>
                    {proxi}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Available Spots Section */}
        <div className="bg-white p-6 border-2 border-gray-300 shadow-md mb-12 h-fit">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-yellow-500 pb-2">
            Available Spots
          </h2>

          {spotsLoading ? (
            <p>Loading spots...</p>
          ) : rvSpotsData.length > 0 ? (
            <Row gutter={[16, 16]}>
              {rvSpotsData.map((spot) => (
                <Col xs={24} sm={12} key={spot._id}>
                  <Card
                    title={
                      <div className="flex justify-between items-center">
                        <span>{spot.title}</span>
                        {!isSpotAvailable(spot, dateRange[0], dateRange[1]) && (
                          <Tag color="red">Booked</Tag>
                        )}
                      </div>
                    }
                    style={{ border: "2px solid #d1d5db" }}
                    headStyle={{ borderBottom: "2px solid #d1d5db" }}
                    bodyStyle={{ padding: "16px" }}
                  >
                    <p className="text-gray-700 mb-2">
                      <strong>Location:</strong> {spot.coordination}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <strong>Description:</strong> {spot.description}
                    </p>

                    <div className="text-gray-700 mb-2">
                      <strong>Available Dates:</strong>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {spot.availability.available.length > 0 ? (
                          spot.availability.available.map((avail, index) => (
                            <Tag
                              key={`avail-${index}`}
                              className="border-2 !border-green-500 !text-green-700 !bg-green-50 !rounded-none"
                            >
                              {dayjs(avail.from).format("YYYY-MM-DD")} to{" "}
                              {avail.to === "future"
                                ? "Future"
                                : dayjs(avail.to).format("YYYY-MM-DD")}
                            </Tag>
                          ))
                        ) : (
                          <span className="text-gray-500">None</span>
                        )}
                      </div>
                    </div>
                    <div className="text-gray-700 mb-2">
                      <strong>Unavailable Dates:</strong>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {spot.availability.booked.length > 0 ? (
                          spot.availability.booked.map((booking, index) => (
                            <Tag
                              key={`booked-${index}`}
                              className="border-2 !rounded-none !border-red-500 !text-red-700 !bg-red-50"
                            >
                              {dayjs(booking.from).format("YYYY-MM-DD")} to{" "}
                              {dayjs(booking.to).format("YYYY-MM-DD")}
                            </Tag>
                          ))
                        ) : (
                          <span className="text-gray-500">None</span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        handleBookSpot(spot, rvCampsitesDetailsData._id)
                      }
                      className={`bg-yellow-500 text-white px-4 py-2 font-medium hover:bg-yellow-600 transition-colors duration-200 border-2 border-yellow-500 w-full `}
                    >
                      Book Spot
                    </button>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p>No spots available.</p>
          )}
        </div>

        {/* Additional Info */}
        <div className="bg-white p-6 border-2 border-gray-300 shadow-md mb-12 h-fit">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-yellow-500 pb-2">
            Why Stay Here?
          </h2>
          <p className="text-gray-700 mb-3">
            Enjoy a perfect blend of comfort and adventure at{" "}
            {rvCampsitesDetailsData?.title}. With easy access to nearby
            attractions and top-notch amenities, your RV getaway starts here.
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-900">Pro Tip:</span> Book
            early to secure your spot during peak seasons!
          </p>
        </div>

        {/* Book Now Button */}
        {/* <div className="text-center">
          <button
            onClick={() => navigate(`/checkout/${rvCampsitesDetailsData._id}`)}
            className="bg-yellow-500 text-white px-8 py-3 font-medium hover:bg-yellow-600 transition-colors duration-200 border-2 border-yellow-500"
          >
            Book Now
          </button>
        </div> */}
      </div>

      {/* Spot Details Modal */}
      <Modal
        title={selectedSpot?.title || "Spot Details"}
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <button
            key="cancel"
            onClick={handleModalClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 font-medium hover:bg-gray-400 transition-colors duration-200 border-2 border-gray-300 mr-2"
          >
            Cancel
          </button>,
          <button
            key="continue"
            onClick={handleContinueBooking}
            className="bg-yellow-500 text-white px-4 py-2 font-medium hover:bg-yellow-600 transition-colors duration-200 border-2 border-yellow-500"
          >
            Continue Booking
          </button>,
        ]}
      >
        {selectedSpot ? (
          <div className="space-y-4">
            <img
              src={selectedSpot.image}
              alt={selectedSpot.title}
              className="w-full h-48 object-cover"
            />

            <p>
              <strong>Description:</strong> {selectedSpot.description}
            </p>
            <p>
              <strong>Location:</strong> {selectedSpot.coordination}
            </p>

            <div>
              <strong>Available Dates:</strong>
              <div className="mt-1 flex flex-wrap gap-2">
                {selectedSpot.availability.available.length > 0 ? (
                  selectedSpot.availability.available.map((avail, index) => (
                    <Tag
                      key={`avail-${index}`}
                      className="border-2 !rounded-none !border-green-500 !text-green-700 !bg-green-50"
                    >
                      {dayjs(avail.from).format("YYYY-MM-DD")} to{" "}
                      {avail.to === "future"
                        ? "Future"
                        : dayjs(avail.to).format("YYYY-MM-DD")}
                    </Tag>
                  ))
                ) : (
                  <span className="text-gray-500">None</span>
                )}
              </div>
            </div>
            <div>
              <strong>Unavailable Dates:</strong>
              <div className="mt-1 flex flex-wrap gap-2">
                {selectedSpot.availability.booked.length > 0 ? (
                  selectedSpot.availability.booked.map((booking, index) => (
                    <Tag
                      key={`booked-${index}`}
                      className="border-2 !rounded-none !border-red-500 !text-red-700 !bg-red-50"
                    >
                      {dayjs(booking.from).format("YYYY-MM-DD")} to{" "}
                      {dayjs(booking.to).format("YYYY-MM-DD")}
                    </Tag>
                  ))
                ) : (
                  <span className="text-gray-500">None</span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p>No details available.</p>
        )}
      </Modal>
    </div>
  );
};

export default RVDetails;
