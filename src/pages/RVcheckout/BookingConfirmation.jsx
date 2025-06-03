import { CiCircleCheck } from "react-icons/ci";
import { Navigate, useLocation } from "react-router-dom";
import { useGetRvSpotsQuery } from "../../services/api/pages/rvSpotsSlice";
import dayjs from "dayjs";

const BookingConfirmation = () => {
  const location = useLocation();
  const bookingDetails = location?.state;
  const { data: rvSpots, isLoading: spotsLoading } = useGetRvSpotsQuery();
  const rvSpotsData = rvSpots?.payload || [];

  if (!bookingDetails) {
    return <Navigate to="/" replace />;
  }

  if (spotsLoading) {
    return <div className="text-center py-10">Loading booking details...</div>;
  }

  const vehicleTypeMap = {
    motorhome: "Motorhome",
    "travel-trailer": "Travel Trailer",
    "fifth-wheel": "Fifth Wheel",
    "camper-van": "Camper Van",
  };

  const selectedSpotName = bookingDetails?.selectedSpot
    ? rvSpotsData.find((spot) => spot._id === bookingDetails.selectedSpot)
        ?.title || "N/A"
    : "N/A";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl p-8 w-full max-w-2xl">
        <div className="flex justify-center mb-6">
          <CiCircleCheck className="text-green-600 w-12 h-12" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Payment Confirmed
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Thank you for your booking. A confirmation has been sent to{" "}
          <span className="font-semibold text-gray-800">
            {bookingDetails?.email || "your email"}
          </span>
          .
        </p>
        <div className="grid grid-cols-1 gap-6 text-sm bg-gray-50 p-6 border border-gray-200">
          <div className="space-y-4 bg-green-100 p-4 rounded-md">
            <h2 className="text-lg font-bold text-gray-900 border-b border-green-300 pb-2">
              Booking Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p>
                <span className="font-semibold text-gray-800">Campsite:</span>{" "}
                {bookingDetails?.title || "N/A"}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Type:</span>{" "}
                {bookingDetails?.type || "N/A"}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Address:</span>{" "}
                {bookingDetails?.address || "N/A"}
              </p>
              <p>
                <span className="font-semibold text-gray-800">
                  Price/Night:
                </span>{" "}
                ${bookingDetails?.price || "0"}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Guests:</span>{" "}
                {bookingDetails?.numberOfGuests || "N/A"}
              </p>
              <p>
                <span className="font-semibold text-gray-800">
                  Selected Spot:
                </span>{" "}
                {selectedSpotName}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Vehicle:</span>{" "}
                {bookingDetails?.RVVehicleType
                  ? vehicleTypeMap[bookingDetails.RVVehicleType] ||
                    bookingDetails.RVVehicleType
                  : "N/A"}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Length:</span>{" "}
                {bookingDetails?.vehicleLength
                  ? `${bookingDetails.vehicleLength} ft`
                  : "N/A"}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Check-in:</span>{" "}
                {bookingDetails?.checkInDate
                  ? dayjs(bookingDetails.checkInDate).format("YYYY-MM-DD")
                  : "N/A"}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Check-out:</span>{" "}
                {bookingDetails?.checkOutDate
                  ? dayjs(bookingDetails.checkOutDate).format("YYYY-MM-DD")
                  : "N/A"}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Total:</span> $
                {bookingDetails?.totalPrice
                  ? bookingDetails.totalPrice.toFixed(2)
                  : "0.00"}
              </p>
            </div>
            <p>
              <span className="font-semibold text-gray-800">Description:</span>{" "}
              {bookingDetails?.description || "N/A"}
            </p>
            <p>
              <span className="font-semibold text-gray-800">
                Special Requests:
              </span>{" "}
              {bookingDetails?.specialRequests || "None"}
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2">
              Contact Information
            </h2>
            <p>
              <span className="font-medium text-gray-700">Name:</span>{" "}
              {bookingDetails?.name || "N/A"}
            </p>
            <p>
              <span className="font-medium text-gray-700">Email:</span>{" "}
              {bookingDetails?.email || "N/A"}
            </p>
            <p>
              <span className="font-medium text-gray-700">Phone:</span>{" "}
              {bookingDetails?.phone || "N/A"}
            </p>
          </div>
          <div className="space-y-4 bg-yellow-100 p-4 rounded-md">
            <h2 className="text-lg font-bold text-gray-900 border-b border-yellow-300 pb-2">
              Payment Information
            </h2>
            <p>
              <span className="font-semibold text-gray-800">Payment ID:</span>{" "}
              {bookingDetails?.paymentId || "N/A"}
            </p>
            <p>
              <span className="font-semibold text-gray-800">Method ID:</span>{" "}
              {bookingDetails?.paymentMethod || "N/A"}
            </p>
            <p>
              <span className="font-semibold text-gray-800">Status:</span>{" "}
              {bookingDetails?.paymentStatus || "N/A"}
            </p>
            <p>
              <span className="font-semibold text-gray-800">Amount:</span> $
              {bookingDetails?.paymentAmount
                ? (bookingDetails.paymentAmount / 100).toFixed(2)
                : "0.00"}
            </p>
            <p>
              <span className="font-semibold text-gray-800">Date:</span>{" "}
              {bookingDetails?.paymentDate || "N/A"}
            </p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-8 transition-colors"
          >
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
