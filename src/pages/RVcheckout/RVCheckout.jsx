// import { Col, DatePicker, Form, message, Row } from "antd";
// import dayjs from "dayjs";
// import isBetween from "dayjs/plugin/isBetween";
// import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
// import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
// import React, { useEffect, useState } from "react";

// // Extend dayjs with the required plugins
// dayjs.extend(isSameOrAfter);
// dayjs.extend(isSameOrBefore);
// dayjs.extend(isBetween);

// const { RangePicker } = DatePicker;

// import {
//   CardElement,
//   Elements,
//   useElements,
//   useStripe,
// } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import { Card, Input, Select, Spin } from "antd";

// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { useViewRvCampsiteQuery } from "../../services/api/pages/rvCampsitesSlice";
// import { useGetRvSpotsQuery } from "../../services/api/pages/rvSpotsSlice";
// import {
//   useBookingPaymentIntentMutation,
//   useCreatePaymentIntentMutation,
//   useGetStripeConfigQuery,
// } from "../../services/api/settings/stripePaymentSlice";

// const { Option } = Select;
// const { TextArea } = Input;

// // Mapping for RV Vehicle Type display
// const vehicleTypeMap = {
//   motorhome: "Motorhome",
//   "travel-trailer": "Travel Trailer",
//   "fifth-wheel": "Fifth Wheel",
//   "camper-van": "Camper Van",
// };

// const CheckoutForm = ({ campsite, formData, onSuccess }) => {
//   const { data: configData, isLoading: configLoading } =
//     useGetStripeConfigQuery();

//   const [
//     createPaymentIntent,
//     { isLoading: paymentLoading, error: paymentError },
//   ] = useCreatePaymentIntentMutation();

//   const [bookingPaymentIntent, { isLoading: bookingLoading }] =
//     useBookingPaymentIntentMutation();

//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState(null);
//   const [processing, setProcessing] = useState(false);
//   const navigate = useNavigate();

//   const handlePayment = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) {
//       setError("Stripe.js has not loaded yet. Please try again.");
//       return;
//     }

//     setProcessing(true);
//     setError(null);

//     try {
//       const nights = Math.ceil(
//         dayjs(formData.checkOutDate).diff(dayjs(formData.checkInDate), "day")
//       );
//       const pricePerNight = parseFloat(campsite.price);
//       const totalAmount = nights * pricePerNight * 100;

//       if (totalAmount < 50) {
//         throw new Error("The total amount must be at least $0.50 USD.");
//       }

//       if (formData.numberOfGuests === "0" || !formData.numberOfGuests) {
//         message.info("Number of guests field is required!");
//         return;
//       }

//       if (!formData.name) {
//         message.info("Name field is required!");
//         return;
//       }

//       if (!formData.email) {
//         message.info("Email field is required!");
//         return;
//       }
//       if (!formData.phone) {
//         message.info("Phone field is required!");
//         return;
//       }
//       if (!formData.checkInDate) {
//         message.info("Check-in date field is required!");
//         return;
//       }
//       if (!formData.checkOutDate) {
//         message.info("Check-out date field is required!");
//         return;
//       }

//       const paymentData = {
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         checkInDate: formData.checkInDate,
//         checkOutDate: formData.checkOutDate,
//         numberOfGuests: formData.numberOfGuests,
//         RVVehicleType: formData.RVVehicleType,
//         vehicleLength: formData.vehicleLength,
//         specialRequests: formData.specialRequests,
//         selectedSpot: formData.selectedSpot,
//         title: campsite.title,
//         address: campsite.address || `${campsite.lat}, ${campsite.long}`,
//         description: campsite.description,
//         type: campsite.type,
//         price: campsite.price,
//         totalPrice: totalAmount / 100,
//         paymentStatus: "pending",
//         paymentId: "",
//         paymentMethod: "card",
//         paymentDate: new Date().toISOString(),
//         paymentAmount: totalAmount,
//       };

//       const { clientSecret } = await createPaymentIntent(paymentData).unwrap();

//       const result = await stripe?.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//           billing_details: {
//             name: formData.name,
//             email: formData.email,
//             phone: formData.phone,
//           },
//         },
//       });

//       if (result?.error) {
//         setError(result?.error.message);
//       } else if (result?.paymentIntent?.status === "succeeded") {
//         onSuccess({
//           ...paymentData,
//           paymentId: result?.paymentIntent?.id,
//           paymentStatus: result?.paymentIntent?.status,
//           paymentMethod: result?.paymentIntent?.payment_method,
//           paymentAmount: result?.paymentIntent?.amount,
//           paymentDate: new Date().toDateString(),
//         });

//         const bookingResponseData = {
//           ...paymentData,
//           paymentId: result?.paymentIntent?.id,
//           paymentMethod: result?.paymentIntent?.payment_method,
//           paymentStatus: result?.paymentIntent?.status,
//           paymentAmount: result?.paymentIntent?.amount,
//           paymentDate: new Date().toLocaleDateString(),
//         };

//         const bookingResponse = await bookingPaymentIntent(
//           bookingResponseData
//         ).unwrap();
//         if (bookingResponse?.success) {
//           navigate("/booking-confirmation", { state: bookingResponseData });
//         } else {
//           setError("An error occurred during booking processing");
//         }
//       }
//     } catch (err) {
//       setError(
//         paymentError?.data?.message ||
//           err.message ||
//           "An error occurred during payment processing. Please try again."
//       );
//     } finally {
//       setProcessing(false);
//     }
//   };

//   if (configLoading) return <div>Loading Stripe configuration...</div>;

//   return (
//     <form onSubmit={handlePayment} className="space-y-4">
//       <Card title="Payment Details" className="shadow-md border !rounded-none">
//         <CardElement
//           options={{
//             style: {
//               base: {
//                 fontSize: "16px",
//                 color: "#333",
//                 "::placeholder": { color: "#999" },
//               },
//               invalid: { color: "#dc2626" },
//             },
//           }}
//           className="p-3 bg-white border border-gray-200"
//         />
//       </Card>
//       {error && (
//         <div className="text-red-600 text-sm bg-red-50 p-2 border">{error}</div>
//       )}
//       <button
//         type="primary"
//         htmlType="submit"
//         disabled={
//           !stripe || !elements || processing || paymentLoading || bookingLoading
//         }
//         loading={processing || paymentLoading || bookingLoading}
//         block
//         className="bg-yellow-500 w-full !mt-2 text-white px-8 py-3 font-medium hover:bg-yellow-600 transition-colors duration-200 border-2 border-yellow-500"
//       >
//         {processing || paymentLoading || bookingLoading
//           ? "Processing..."
//           : "Confirm Payment"}
//       </button>
//     </form>
//   );
// };

// const RVCheckout = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const [form] = Form.useForm();
//   const [total, setTotal] = useState(0);
//   const [formValues, setFormValues] = useState({});
//   const { data: configData, isLoading: configLoading } =
//     useGetStripeConfigQuery();
//   const {
//     data: rvCampsitesDetails,
//     isLoading: campsiteLoading,
//     isError,
//   } = useViewRvCampsiteQuery({ id });
//   const { data: rvSpots, isLoading: spotsLoading } = useGetRvSpotsQuery();

//   const campsite = rvCampsitesDetails?.payload || {};
//   const rvSpotsData = rvSpots?.payload || [];
//   const selectedSpotId = location.state?.selectedSpot;

//   const [unavailableRanges, setUnavailableRanges] = useState([]);

//   useEffect(() => {
//     if (!rvSpots?.payload?.length) return;

//     const spot = rvSpots.payload.find((d) => d._id === selectedSpotId);
//     if (!spot?.availability) return;

//     const booked = spot.availability.booked.map(({ from, to }) => ({
//       start: dayjs(from),
//       end: dayjs(to),
//     }));

//     setUnavailableRanges(booked);
//   }, [rvSpots, selectedSpotId]);

//   // Utility function to check if two date ranges overlap
//   const isRangeOverlap = (start1, end1, start2, end2) => {
//     if (!start1 || !end1 || !start2 || !end2) return false;
//     // Allow checkOutDate to equal bookedStart and checkInDate to equal bookedEnd
//     return start1.isBefore(end2, "day") && start2.isBefore(end1, "day");
//   };

//   // Disable past and booked dates
//   const disabledDate = (current) => {
//     if (!current) return false;

//     const today = dayjs().startOf("day");
//     const isPast = current.isBefore(today, "day");
//     const isUnavailable = isInRangeList(current, unavailableRanges);

//     return isPast || isUnavailable;
//   };

//   const dateRender = (current) => {
//     const isBooked = isInRangeList(current, unavailableRanges);

//     const style = {};
//     if (isBooked) {
//       style.backgroundColor = "#ffa39e"; // Red
//       style.color = "#a8071a";
//     }

//     return (
//       <div className="ant-picker-cell-inner" style={style}>
//         {current.date()}
//       </div>
//     );
//   };

//   const isInRangeList = (date, ranges) =>
//     ranges.some(
//       ({ start, end }) =>
//         date.isSame(start, "day") ||
//         date.isSame(end, "day") ||
//         date.isBetween(start, end, "day", "[]")
//     );

//   const initialData = {
//     name: "",
//     email: "",
//     phone: "",
//     dateRange:
//       location.state?.checkInDate && location.state?.checkOutDate
//         ? [
//             dayjs(location.state.checkInDate),
//             dayjs(location.state.checkOutDate),
//           ]
//         : null,
//     numberOfGuests: null,
//     RVVehicleType: "",
//     vehicleLength: null,
//     specialRequests: "",
//     selectedSpot: location.state?.selectedSpot || "",
//   };

//   useEffect(() => {
//     form.setFieldsValue(initialData);
//     setFormValues({
//       ...initialData,
//       checkInDate: initialData.dateRange
//         ? initialData.dateRange[0]?.format("YYYY-MM-DD")
//         : null,
//       checkOutDate: initialData.dateRange
//         ? initialData.dateRange[1]?.format("YYYY-MM-DD")
//         : null,
//     });
//     updateTotal({
//       checkInDate: initialData.dateRange ? initialData.dateRange[0] : null,
//       checkOutDate: initialData.dateRange ? initialData.dateRange[1] : null,
//     });
//   }, [
//     form,
//     location.state?.selectedSpot,
//     location.state?.checkInDate,
//     location.state?.checkOutDate,
//   ]);

//   const updateTotal = (values) => {
//     if (
//       values.checkInDate &&
//       values.checkOutDate &&
//       campsite.price &&
//       dayjs(values.checkOutDate).isAfter(values.checkInDate, "day")
//     ) {
//       const nights = Math.ceil(
//         dayjs(values.checkOutDate).diff(dayjs(values.checkInDate), "day")
//       );
//       const pricePerNight = parseFloat(campsite.price);
//       setTotal(nights > 0 ? nights * pricePerNight : 0);
//     } else {
//       setTotal(0);
//     }
//   };

//   const handleBookingSuccess = (bookingDetails) => {
//     console.log("Booking successful:", bookingDetails);
//   };

//   const onValuesChange = (_, allValues) => {
//     const formattedValues = {
//       ...allValues,
//       checkInDate: allValues.dateRange?.[0]
//         ? allValues.dateRange[0].format("YYYY-MM-DD")
//         : null,
//       checkOutDate: allValues.dateRange?.[1]
//         ? allValues.dateRange[1].format("YYYY-MM-DD")
//         : null,
//       numberOfGuests: allValues.numberOfGuests
//         ? String(allValues.numberOfGuests)
//         : null,
//       selectedSpot: allValues.selectedSpot || initialData.selectedSpot,
//     };
//     setFormValues(formattedValues);
//     updateTotal(formattedValues);
//   };

//   if (configLoading || campsiteLoading || spotsLoading)
//     return (
//       <div className="text-center py-10">
//         <Spin />
//       </div>
//     );
//   if (isError || !campsite)
//     return (
//       <div className="text-center py-10 text-red-600">
//         Error loading campsite details
//       </div>
//     );

//   const stripeKey = configData?.payload[0]?.stripeKey;
//   if (!stripeKey)
//     return (
//       <div className="text-center py-10 text-red-600">
//         Error: Stripe key not found
//       </div>
//     );
//   const stripePromise = loadStripe(stripeKey);

//   return (
//     <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto bg-white shadow-lg overflow-hidden">
//         <div className="bg-yellow-500 p-6">
//           <h1 className="text-3xl font-bold text-white text-center">
//             Checkout - {campsite.title || "RV Campsite"}
//           </h1>
//         </div>
//         <Row gutter={[24, 24]} className="p-6">
//           <Col xs={24} lg={12}>
//             <Card
//               title="Booking Information"
//               className="shadow-md border !rounded-none"
//             >
//               <Form
//                 form={form}
//                 layout="vertical"
//                 onValuesChange={onValuesChange}
//               >
//                 <Form.Item
//                   name="name"
//                   label="Full Name"
//                   rules={[
//                     { required: true, message: "Please enter your full name" },
//                   ]}
//                 >
//                   <Input placeholder="John Doe" className="border" />
//                 </Form.Item>
//                 <Row gutter={16}>
//                   <Col span={12}>
//                     <Form.Item
//                       name="email"
//                       label="Email"
//                       rules={[
//                         {
//                           required: true,
//                           type: "email",
//                           message: "Please enter a valid email",
//                         },
//                       ]}
//                     >
//                       <Input
//                         placeholder="john@example.com"
//                         className="border"
//                       />
//                     </Form.Item>
//                   </Col>
//                   <Col span={12}>
//                     <Form.Item
//                       name="phone"
//                       label="Phone"
//                       rules={[
//                         {
//                           required: true,
//                           message: "Please enter your phone number",
//                         },
//                       ]}
//                     >
//                       <Input
//                         placeholder="+1 (555) 123-4567"
//                         className="border"
//                       />
//                     </Form.Item>
//                   </Col>
//                 </Row>

//                 <Form.Item
//                   name="dateRange"
//                   label="Check-in / Check-out Dates"
//                   rules={[
//                     {
//                       required: true,
//                       message: "Please select check-in and check-out dates",
//                     },
//                   ]}
//                 >
//                   <RangePicker
//                     format="YYYY-MM-DD"
//                     className="w-full border"
//                     disabledDate={disabledDate}
//                     dateRender={dateRender}
//                     onChange={(dates) => {
//                       if (!dates) {
//                         form.setFieldsValue({ dateRange: null });
//                         return;
//                       }

//                       const [checkInDate, checkOutDate] = dates;
//                       const today = dayjs().startOf("day");

//                       // Check for past dates
//                       if (
//                         checkInDate.isBefore(today, "day") ||
//                         checkOutDate.isBefore(today, "day")
//                       ) {
//                         message.warning("You can't select dates in the past.");
//                         form.setFieldsValue({ dateRange: null });
//                         return;
//                       }

//                       // Check if check-out is after check-in
//                       if (checkOutDate.isSameOrBefore(checkInDate, "day")) {
//                         message.warning(
//                           "Check-out date must be after check-in date."
//                         );
//                         form.setFieldsValue({ dateRange: null });
//                         return;
//                       }

//                       // Check for overlap with booked ranges
//                       const overlappingRange = unavailableRanges.find(
//                         ({ start, end }) =>
//                           isRangeOverlap(checkInDate, checkOutDate, start, end)
//                       );
//                       if (overlappingRange) {
//                         message.warning(
//                           `Selected date range overlaps with a booked period from ${overlappingRange.start.format(
//                             "MMM D, YYYY"
//                           )} to ${overlappingRange.end.format(
//                             "MMM D, YYYY"
//                           )}. Try a range before ${overlappingRange.start.format(
//                             "MMM D, YYYY"
//                           )} or after ${overlappingRange.end.format(
//                             "MMM D, YYYY"
//                           )}.`
//                         );
//                         form.setFieldsValue({ dateRange: null });
//                         return;
//                       }
//                     }}
//                   />
//                 </Form.Item>

//                 <Form.Item
//                   name="numberOfGuests"
//                   label="Number of Guests"
//                   rules={[
//                     {
//                       required: true,
//                       message: "Please enter number of guests",
//                     },
//                     {
//                       validator: (_, value) => {
//                         if (value === "0" || !value) {
//                           return Promise.reject(
//                             "Number of guests must be greater than 0"
//                           );
//                         }
//                         return Promise.resolve();
//                       },
//                     },
//                   ]}
//                 >
//                   <Input type="number" min={1} max={6} className="border" />
//                 </Form.Item>
//                 <Form.Item
//                   name="selectedSpot"
//                   label="Selected Spot"
//                   rules={[{ required: true, message: "Please select a spot" }]}
//                 >
//                   <Select
//                     placeholder="Select a spot"
//                     disabled={!!initialData.selectedSpot}
//                   >
//                     {rvSpotsData.map((spot) => (
//                       <Option key={spot._id} value={spot._id}>
//                         {spot.title} - {spot.coordination}
//                       </Option>
//                     ))}
//                   </Select>
//                 </Form.Item>
//                 <Form.Item name="RVVehicleType" label="RV Vehicle Type">
//                   <Select placeholder="Select vehicle type">
//                     <Option value="motorhome">Motorhome</Option>
//                     <Option value="travel-trailer">Travel Trailer</Option>
//                     <Option value="fifth-wheel">Fifth Wheel</Option>
//                     <Option value="camper-van">Camper Van</Option>
//                   </Select>
//                 </Form.Item>
//                 <Form.Item name="vehicleLength" label="Vehicle Length (ft)">
//                   <Input type="number" min={0} />
//                 </Form.Item>
//                 <Form.Item name="specialRequests" label="Special Requests">
//                   <TextArea
//                     rows={3}
//                     placeholder="Any special requirements or notes"
//                     className="border"
//                   />
//                 </Form.Item>
//               </Form>
//             </Card>
//           </Col>
//           <Col xs={24} lg={12}>
//             <Card
//               title="Booking Summary"
//               className="shadow-md border !rounded-none"
//             >
//               <div className="space-y-4">
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800">
//                     {campsite.title || "RV Campsite"}
//                   </h3>
//                   <p className="text-sm text-gray-600">
//                     {campsite.address || `${campsite.lat}, ${campsite.long}`}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     {campsite.description}
//                   </p>
//                 </div>
//                 <div className="border-t border-gray-200 pt-4">
//                   <div className="flex justify-between text-gray-700">
//                     <span>Price per night:</span>
//                     <span>${campsite.price || 0}</span>
//                   </div>
//                   <div className="flex justify-between text-gray-700 mt-2">
//                     <span>Number of Nights:</span>
//                     <span>
//                       {formValues.checkInDate && formValues.checkOutDate
//                         ? Math.ceil(
//                             dayjs(formValues.checkOutDate).diff(
//                               dayjs(formValues.checkInDate),
//                               "day"
//                             )
//                           )
//                         : "Not specified"}
//                     </span>
//                   </div>
//                   <div className="flex justify-between text-gray-700 mt-2">
//                     <span>Check-in Date:</span>
//                     <span>{formValues.checkInDate || "Not specified"}</span>
//                   </div>
//                   <div className="flex justify-between text-gray-700 mt-2">
//                     <span>Check-out Date:</span>
//                     <span>{formValues.checkOutDate || "Not specified"}</span>
//                   </div>
//                   <div className="flex justify-between text-gray-700 mt-2">
//                     <span>Number of Guests:</span>
//                     <span>{formValues.numberOfGuests || "Not specified"}</span>
//                   </div>
//                   <div className="flex justify-between text-gray-700 mt-2">
//                     <span>Selected Spot:</span>
//                     <span>
//                       {formValues.selectedSpot
//                         ? rvSpotsData.find(
//                             (spot) => spot._id === formValues.selectedSpot
//                           )?.title || "Not specified"
//                         : "Not specified"}
//                     </span>
//                   </div>
//                   <div className="flex justify-between text-gray-700 mt-2">
//                     <span>RV Vehicle Type:</span>
//                     <span>
//                       {formValues.RVVehicleType
//                         ? vehicleTypeMap[formValues.RVVehicleType] ||
//                           formValues.RVVehicleType
//                         : "Not specified"}
//                     </span>
//                   </div>
//                   <div className="flex justify-between text-gray-700 mt-2">
//                     <span>Vehicle Length:</span>
//                     <span>
//                       {formValues.vehicleLength
//                         ? `${formValues.vehicleLength} ft`
//                         : "Not specified"}
//                     </span>
//                   </div>
//                   {formValues.specialRequests && (
//                     <div className="mt-2">
//                       <span className="text-gray-700 font-medium">
//                         Special Requests:
//                       </span>
//                       <p className="text-gray-600 text-sm">
//                         {formValues.specialRequests}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//                 <div className="border-t border-gray-200 pt-4">
//                   <div className="flex justify-between text-lg font-semibold text-gray-800">
//                     <span>Total:</span>
//                     <span className="text-yellow-600">${total.toFixed(2)}</span>
//                   </div>
//                   <p className="text-xs text-gray-500 mt-1">
//                     Taxes and fees included
//                   </p>
//                 </div>
//               </div>
//             </Card>
//             <Elements stripe={stripePromise}>
//               <CheckoutForm
//                 campsite={campsite}
//                 formData={formValues}
//                 onSuccess={handleBookingSuccess}
//               />
//             </Elements>
//           </Col>
//         </Row>
//       </div>
//     </div>
//   );
// };

// export default RVCheckout;
"use client";

import { Col, DatePicker, Form, Row } from "antd";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useEffect, useState } from "react";

// Extend dayjs with the required plugins
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);

const { RangePicker } = DatePicker;

import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Card, Input, Select, Spin } from "antd";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useViewRvCampsiteQuery } from "../../services/api/pages/rvCampsitesSlice";
import { useGetRvSpotsQuery } from "../../services/api/pages/rvSpotsSlice";
import {
  useBookingPaymentIntentMutation,
  useCreatePaymentIntentMutation,
  useGetStripeConfigQuery,
} from "../../services/api/settings/stripePaymentSlice";

const { Option } = Select;
const { TextArea } = Input;

// Mapping for RV Vehicle Type display
const vehicleTypeMap = {
  motorhome: "Motorhome",
  "travel-trailer": "Travel Trailer",
  "fifth-wheel": "Fifth Wheel",
  "camper-van": "Camper Van",
};

const CheckoutForm = ({ campsite, formData, onSuccess, form }) => {
  const { data: configData, isLoading: configLoading } =
    useGetStripeConfigQuery();

  const [
    createPaymentIntent,
    { isLoading: paymentLoading, error: paymentError },
  ] = useCreatePaymentIntentMutation();

  const [bookingPaymentIntent, { isLoading: bookingLoading }] =
    useBookingPaymentIntentMutation();

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const handlePayment = async (e) => {
    e.preventDefault();

    // Validate the form first
    try {
      await form.validateFields();
    } catch (validationError) {
      // Form has validation errors, don't proceed
      return;
    }

    if (!stripe || !elements) {
      setError("Stripe.js has not loaded yet. Please try again.");
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const nights = Math.ceil(
        dayjs(formData.checkOutDate).diff(dayjs(formData.checkInDate), "day")
      );
      const pricePerNight = Number.parseFloat(campsite.price);
      const totalAmount = nights * pricePerNight * 100;

      if (totalAmount < 50) {
        throw new Error("The total amount must be at least $0.50 USD.");
      }

      const paymentData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        checkInDate: formData.checkInDate,
        checkOutDate: formData.checkOutDate,
        numberOfGuests: formData.numberOfGuests,
        RVVehicleType: formData.RVVehicleType,
        vehicleLength: formData.vehicleLength,
        specialRequests: formData.specialRequests,
        selectedSpot: formData.selectedSpot,
        title: campsite.title,
        address: campsite.address || `${campsite.lat}, ${campsite.long}`,
        description: campsite.description,
        type: campsite.type,
        price: campsite.price,
        totalPrice: totalAmount / 100,
        paymentStatus: "pending",
        paymentId: "",
        paymentMethod: "card",
        paymentDate: new Date().toISOString(),
        paymentAmount: totalAmount,
      };

      const { clientSecret } = await createPaymentIntent(paymentData).unwrap();

      const result = await stripe?.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
          },
        },
      });

      if (result?.error) {
        setError(result?.error.message);
      } else if (result?.paymentIntent?.status === "succeeded") {
        onSuccess({
          ...paymentData,
          paymentId: result?.paymentIntent?.id,
          paymentStatus: result?.paymentIntent?.status,
          paymentMethod: result?.paymentIntent?.payment_method,
          paymentAmount: result?.paymentIntent?.amount,
          paymentDate: new Date().toDateString(),
        });

        const bookingResponseData = {
          ...paymentData,
          paymentId: result?.paymentIntent?.id,
          paymentMethod: result?.paymentIntent?.payment_method,
          paymentStatus: result?.paymentIntent?.status,
          paymentAmount: result?.paymentIntent?.amount,
          paymentDate: new Date().toLocaleDateString(),
        };

        const bookingResponse = await bookingPaymentIntent(
          bookingResponseData
        ).unwrap();
        if (bookingResponse?.success) {
          navigate("/booking-confirmation", { state: bookingResponseData });
        } else {
          setError("An error occurred during booking processing");
        }
      }
    } catch (err) {
      setError(
        paymentError?.data?.message ||
          err.message ||
          "An error occurred during payment processing. Please try again."
      );
    } finally {
      setProcessing(false);
    }
  };

  if (configLoading) return <div>Loading Stripe configuration...</div>;

  return (
    <form onSubmit={handlePayment} className="space-y-4">
      <Card title="Payment Details" className="shadow-md border !rounded-none">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#333",
                "::placeholder": { color: "#999" },
              },
              invalid: { color: "#dc2626" },
            },
          }}
          className="p-3 bg-white border border-gray-200"
        />
      </Card>
      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-2 border">{error}</div>
      )}
      <button
        type="primary"
        htmlType="submit"
        disabled={
          !stripe || !elements || processing || paymentLoading || bookingLoading
        }
        loading={processing || paymentLoading || bookingLoading}
        block
        className="bg-yellow-500 w-full !mt-2 text-white px-8 py-3 font-medium hover:bg-yellow-600 transition-colors duration-200 border-2 border-yellow-500"
      >
        {processing || paymentLoading || bookingLoading
          ? "Processing..."
          : "Confirm Payment"}
      </button>
    </form>
  );
};

const RVCheckout = () => {
  const { id } = useParams();
  const location = useLocation();
  const [form] = Form.useForm();
  const [total, setTotal] = useState(0);
  const [formValues, setFormValues] = useState({});
  const { data: configData, isLoading: configLoading } =
    useGetStripeConfigQuery();
  const {
    data: rvCampsitesDetails,
    isLoading: campsiteLoading,
    isError,
  } = useViewRvCampsiteQuery({ id });
  const { data: rvSpots, isLoading: spotsLoading } = useGetRvSpotsQuery();

  const campsite = rvCampsitesDetails?.payload || {};
  const rvSpotsData = rvSpots?.payload || [];
  const selectedSpotId = location.state?.selectedSpot;

  const [unavailableRanges, setUnavailableRanges] = useState([]);

  useEffect(() => {
    if (!rvSpots?.payload?.length) return;

    const spot = rvSpots.payload.find((d) => d._id === selectedSpotId);
    if (!spot?.availability) return;

    const booked = spot.availability.booked.map(({ from, to }) => ({
      start: dayjs(from),
      end: dayjs(to),
    }));

    setUnavailableRanges(booked);
  }, [rvSpots, selectedSpotId]);

  // Utility function to check if two date ranges overlap
  const isRangeOverlap = (start1, end1, start2, end2) => {
    if (!start1 || !end1 || !start2 || !end2) return false;
    // Allow checkOutDate to equal bookedStart and checkInDate to equal bookedEnd
    return start1.isBefore(end2, "day") && start2.isBefore(end1, "day");
  };

  // Disable past and booked dates
  const disabledDate = (current) => {
    if (!current) return false;

    const today = dayjs().startOf("day");
    const isPast = current.isBefore(today, "day");
    const isUnavailable = isInRangeList(current, unavailableRanges);

    return isPast || isUnavailable;
  };

  const dateRender = (current) => {
    const isBooked = isInRangeList(current, unavailableRanges);

    const style = {};
    if (isBooked) {
      style.backgroundColor = "#ffa39e"; // Red
      style.color = "#a8071a";
    }

    return (
      <div className="ant-picker-cell-inner" style={style}>
        {current.date()}
      </div>
    );
  };

  const isInRangeList = (date, ranges) =>
    ranges.some(
      ({ start, end }) =>
        date.isSame(start, "day") ||
        date.isSame(end, "day") ||
        date.isBetween(start, end, "day", "[]")
    );

  const initialData = {
    name: "",
    email: "",
    phone: "",
    dateRange:
      location.state?.checkInDate && location.state?.checkOutDate
        ? [
            dayjs(location.state.checkInDate),
            dayjs(location.state.checkOutDate),
          ]
        : null,
    numberOfGuests: null,
    RVVehicleType: "",
    vehicleLength: null,
    specialRequests: "",
    selectedSpot: location.state?.selectedSpot || "",
  };

  useEffect(() => {
    form.setFieldsValue(initialData);
    setFormValues({
      ...initialData,
      checkInDate: initialData.dateRange
        ? initialData.dateRange[0]?.format("YYYY-MM-DD")
        : null,
      checkOutDate: initialData.dateRange
        ? initialData.dateRange[1]?.format("YYYY-MM-DD")
        : null,
    });
    updateTotal({
      checkInDate: initialData.dateRange ? initialData.dateRange[0] : null,
      checkOutDate: initialData.dateRange ? initialData.dateRange[1] : null,
    });
  }, [
    form,
    location.state?.selectedSpot,
    location.state?.checkInDate,
    location.state?.checkOutDate,
  ]);

  const updateTotal = (values) => {
    if (
      values.checkInDate &&
      values.checkOutDate &&
      campsite.price &&
      dayjs(values.checkOutDate).isAfter(values.checkInDate, "day")
    ) {
      const nights = Math.ceil(
        dayjs(values.checkOutDate).diff(dayjs(values.checkInDate), "day")
      );
      const pricePerNight = Number.parseFloat(campsite.price);
      setTotal(nights > 0 ? nights * pricePerNight : 0);
    } else {
      setTotal(0);
    }
  };

  const handleBookingSuccess = (bookingDetails) => {
    console.log("Booking successful:", bookingDetails);
  };

  const onValuesChange = (_, allValues) => {
    const formattedValues = {
      ...allValues,
      checkInDate: allValues.dateRange?.[0]
        ? allValues.dateRange[0].format("YYYY-MM-DD")
        : null,
      checkOutDate: allValues.dateRange?.[1]
        ? allValues.dateRange[1].format("YYYY-MM-DD")
        : null,
      numberOfGuests: allValues.numberOfGuests
        ? String(allValues.numberOfGuests)
        : null,
      selectedSpot: allValues.selectedSpot || initialData.selectedSpot,
    };
    setFormValues(formattedValues);
    updateTotal(formattedValues);
  };

  if (configLoading || campsiteLoading || spotsLoading)
    return (
      <div className="text-center py-10">
        <Spin />
      </div>
    );
  if (isError || !campsite)
    return (
      <div className="text-center py-10 text-red-600">
        Error loading campsite details
      </div>
    );

  const stripeKey = configData?.payload[0]?.stripeKey;
  if (!stripeKey)
    return (
      <div className="text-center py-10 text-red-600">
        Error: Stripe key not found
      </div>
    );
  const stripePromise = loadStripe(stripeKey);

  // Custom validator for date range
  const validateDateRange = (_, value) => {
    if (!value || !value[0] || !value[1]) {
      return Promise.resolve();
    }

    const [checkInDate, checkOutDate] = value;
    const today = dayjs().startOf("day");

    // Check for past dates
    if (
      checkInDate.isBefore(today, "day") ||
      checkOutDate.isBefore(today, "day")
    ) {
      return Promise.reject("You can't select dates in the past.");
    }

    // Check if check-out is after check-in
    if (checkOutDate.isSameOrBefore(checkInDate, "day")) {
      return Promise.reject("Check-out date must be after check-in date.");
    }

    // Check for overlap with booked ranges
    const overlappingRange = unavailableRanges.find(({ start, end }) =>
      isRangeOverlap(checkInDate, checkOutDate, start, end)
    );

    if (overlappingRange) {
      return Promise.reject(
        `Selected date range overlaps with a booked period. Please select different dates`
      );
    }

    return Promise.resolve();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white shadow-lg overflow-hidden">
        <div className="bg-yellow-500 p-6">
          <h1 className="text-3xl font-bold text-white text-center">
            Checkout - {campsite.title || "RV Campsite"}
          </h1>
        </div>
        <Row gutter={[24, 24]} className="p-6">
          <Col xs={24} lg={12}>
            <Card
              title="Booking Information"
              className="shadow-md border !rounded-none"
            >
              <Form
                form={form}
                layout="vertical"
                onValuesChange={onValuesChange}
              >
                <Form.Item
                  name="name"
                  label="Full Name"
                  rules={[
                    { required: true, message: "Please enter your full name" },
                  ]}
                >
                  <Input placeholder="John Doe" className="border" />
                </Form.Item>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        {
                          required: true,
                          type: "email",
                          message: "Please enter a valid email",
                        },
                      ]}
                    >
                      <Input
                        placeholder="john@example.com"
                        className="border"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="phone"
                      label="Phone"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your phone number",
                        },
                      ]}
                    >
                      <Input
                        placeholder="+1 (555) 123-4567"
                        className="border"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="dateRange"
                  label="Check-in / Check-out Dates"
                  rules={[
                    {
                      required: true,
                      message: "Please select check-in and check-out dates",
                    },
                    { validator: validateDateRange },
                  ]}
                >
                  <RangePicker
                    format="YYYY-MM-DD"
                    className="w-full border"
                    disabledDate={disabledDate}
                    dateRender={dateRender}
                  />
                </Form.Item>

                <Form.Item
                  name="numberOfGuests"
                  label="Number of Guests"
                  rules={[
                    {
                      required: true,
                      message: "Please enter number of guests",
                    },
                    {
                      validator: (_, value) => {
                        if (value === "0" || !value) {
                          return Promise.reject(
                            "Number of guests must be greater than 0"
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input type="number" min={1} max={6} className="border" />
                </Form.Item>
                <Form.Item
                  name="selectedSpot"
                  label="Selected Spot"
                  rules={[{ required: true, message: "Please select a spot" }]}
                >
                  <Select
                    placeholder="Select a spot"
                    disabled={!!initialData.selectedSpot}
                  >
                    {rvSpotsData.map((spot) => (
                      <Option key={spot._id} value={spot._id}>
                        {spot.title} - {spot.coordination}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="RVVehicleType" label="RV Vehicle Type">
                  <Select placeholder="Select vehicle type">
                    <Option value="motorhome">Motorhome</Option>
                    <Option value="travel-trailer">Travel Trailer</Option>
                    <Option value="fifth-wheel">Fifth Wheel</Option>
                    <Option value="camper-van">Camper Van</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="vehicleLength" label="Vehicle Length (ft)">
                  <Input type="number" min={0} />
                </Form.Item>
                <Form.Item name="specialRequests" label="Special Requests">
                  <TextArea
                    rows={3}
                    placeholder="Any special requirements or notes"
                    className="border"
                  />
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card
              title="Booking Summary"
              className="shadow-md border !rounded-none"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {campsite.title || "RV Campsite"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {campsite.address || `${campsite.lat}, ${campsite.long}`}
                  </p>
                  <p className="text-sm text-gray-600">
                    {campsite.description}
                  </p>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-gray-700">
                    <span>Price per night:</span>
                    <span>${campsite.price || 0}</span>
                  </div>
                  <div className="flex justify-between text-gray-700 mt-2">
                    <span>Number of Nights:</span>
                    <span>
                      {formValues.checkInDate && formValues.checkOutDate
                        ? Math.ceil(
                            dayjs(formValues.checkOutDate).diff(
                              dayjs(formValues.checkInDate),
                              "day"
                            )
                          )
                        : "Not specified"}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700 mt-2">
                    <span>Check-in Date:</span>
                    <span>{formValues.checkInDate || "Not specified"}</span>
                  </div>
                  <div className="flex justify-between text-gray-700 mt-2">
                    <span>Check-out Date:</span>
                    <span>{formValues.checkOutDate || "Not specified"}</span>
                  </div>
                  <div className="flex justify-between text-gray-700 mt-2">
                    <span>Number of Guests:</span>
                    <span>{formValues.numberOfGuests || "Not specified"}</span>
                  </div>
                  <div className="flex justify-between text-gray-700 mt-2">
                    <span>Selected Spot:</span>
                    <span>
                      {formValues.selectedSpot
                        ? rvSpotsData.find(
                            (spot) => spot._id === formValues.selectedSpot
                          )?.title || "Not specified"
                        : "Not specified"}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700 mt-2">
                    <span>RV Vehicle Type:</span>
                    <span>
                      {formValues.RVVehicleType
                        ? vehicleTypeMap[formValues.RVVehicleType] ||
                          formValues.RVVehicleType
                        : "Not specified"}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700 mt-2">
                    <span>Vehicle Length:</span>
                    <span>
                      {formValues.vehicleLength
                        ? `${formValues.vehicleLength} ft`
                        : "Not specified"}
                    </span>
                  </div>
                  {formValues.specialRequests && (
                    <div className="mt-2">
                      <span className="text-gray-700 font-medium">
                        Special Requests:
                      </span>
                      <p className="text-gray-600 text-sm">
                        {formValues.specialRequests}
                      </p>
                    </div>
                  )}
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-semibold text-gray-800">
                    <span>Total:</span>
                    <span className="text-yellow-600">${total.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Taxes and fees included
                  </p>
                </div>
              </div>
            </Card>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                campsite={campsite}
                formData={formValues}
                onSuccess={handleBookingSuccess}
                form={form}
              />
            </Elements>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default RVCheckout;
