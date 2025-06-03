import { Spin } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetLocalAttractionsQuery } from "../../../services/api/pages/localAttractionsSlice";
import { useGetRvCampsitesQuery } from "../../../services/api/pages/rvCampsitesSlice";

const RVOptions = ({ campsites }) => {
  const navigate = useNavigate();
  const campsite = campsites[0]; // Only A Step Above RV Park

  const { data: reservation, isLoading: reservationLoading } =
    useGetRvCampsitesQuery();
  const reservationData = reservation?.payload;

  const { data: localAttraction, isLoading } = useGetLocalAttractionsQuery();
  const localAttractionData = localAttraction?.payload;

  if (isLoading || reservationLoading) {
    return (
      <div className="flex justify-center items-center min-h-[30vh]">
        <Spin />
      </div>
    );
  }

  return (
    <div className="py-16 px-4 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-serif font-bold text-center mb-12 text-gray-900 border-b-4 border-yellow-500 pb-4">
          Plan Your Stay at {campsite.title}
        </h2>

        {/* RV Campsite Section */}
        <div className="mb-16">
          {reservationData?.map((reservation) => {
            return (
              <div
                key={reservation?._id}
                className="flex flex-col md:flex-row bg-white shadow-lg border-2 border-gray-300"
              >
                <div className="w-full md:w-1/2">
                  <img
                    src={reservation?.image}
                    alt={reservation?.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-yellow-500 pb-2">
                      {reservation?.title}
                    </h3>
                    <p className="text-gray-700 mb-4">
                      {reservation?.description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="font-medium text-gray-900">
                          Amenities:
                        </span>
                        <ul className="list-disc list-inside text-gray-600">
                          {reservation?.amenities?.map((amenity, index) => (
                            <li key={index}>{amenity}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">
                          Rules:
                        </span>
                        <ul className="list-disc list-inside text-gray-600">
                          {reservation?.rules?.map((rule, index) => (
                            <li key={index}>{rule}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <span className="font-medium text-gray-900">
                        Proximity:
                      </span>
                      <ul className="list-disc list-inside text-gray-600">
                        {reservation?.proximity?.map((proxi, index) => (
                          <li key={index}>{proxi}</li>
                        ))}
                      </ul>
                    </div>
                    {/* <p className="text-gray-600 mb-4">
                      <span className="font-medium text-gray-900">Nearby:</span>{" "}
                      {reservation?.proximity?.map((proxi) => proxi).join(", ")}
                    </p> */}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold text-gray-900">
                      ${reservation?.price} / per {reservation?.type}
                    </span>
                    <button
                      onClick={() =>
                        navigate(`/reservation-details/${reservation?._id}`)
                      }
                      className="bg-yellow-500 text-white px-6 py-2 font-medium hover:bg-yellow-600 transition-colors duration-200 border-2 border-yellow-500"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Local Attractions Section */}
        <div>
          <h3 className="text-3xl font-bold text-gray-900 mb-10 text-center border-b-4 border-yellow-500 pb-3">
            Nearby Attractions
          </h3>
          {localAttractionData?.map((localAttraction, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center gap-6 mb-12 ${
                index % 2 === 0 ? "" : "md:flex-row-reverse"
              }`}
            >
              <div className="w-full md:w-1/2">
                <img
                  src={localAttraction?.image}
                  alt={localAttraction?.title}
                  className="w-full h-72 object-cover border-2 border-gray-300 shadow-md"
                />
              </div>
              <div className="w-full md:w-1/2 p-6 bg-white border-2 border-gray-300 shadow-lg">
                <h4 className="text-2xl font-bold text-gray-900 mb-3 border-b-2 border-yellow-500 pb-2">
                  {localAttraction?.title}
                </h4>
                <p className="text-gray-700 mb-3">
                  {localAttraction?.description}
                </p>
                <p className="text-gray-600 mb-4">
                  <span className="font-medium text-gray-900">Distance:</span>{" "}
                  {localAttraction?.distanceFrom}
                </p>
                <Link
                  to={`/attractions/${localAttraction?._id}`}
                  className="inline-block bg-yellow-500 text-white px-5 py-2 font-medium hover:bg-yellow-600 transition-colors duration-200 border-2 border-yellow-500"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RVOptions;
