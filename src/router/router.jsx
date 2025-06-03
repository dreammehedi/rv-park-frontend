// // import { createBrowserRouter } from "react-router-dom";
// // import RootLayout from "../layouts/RootLayout";
// // import Home from "../pages/Home/Home";
// // import ErrorPage from "../pages/ErrorPage/ErrorPage";
// // import ReservationPage from "../pages/Reservation/ReservationPage";
// // import AttractionPage from "../pages/Attractions/AttractionPage";
// // import ContactPage from "../pages/Contact/ContactPage";
// // import AboutPage from "../pages/About/AboutPage";
// // import RVDetails from "../pages/RVdetails/RVDetails";
// // import RVCheckout from "../pages/RVcheckout/RVCheckout";
// // const campsites = [
// //   {
// //     id: 1,
// //     title: "Serene Lakefront Escape",
// //     description:
// //       "Wake up to breathtaking lake views and enjoy peaceful mornings surrounded by nature.",
// //     price: "$55 / per night",
// //     image:
// //       "https://images.unsplash.com/photo-1525811902-f2342640856e?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
// //     amenities: [
// //       "Lake access",
// //       "Fire pit",
// //       "Picnic table",
// //       "Water hookup",
// //       "Electric hookup",
// //     ],
// //     rules: ["No pets", "Quiet hours 10PM-7AM", "Max 6 people", "No smoking"],
// //     location: "Lake Harmony, PA",
// //     proximity: [
// //       "Jet ski rental: 1/4 mile",
// //       "Boat dock: 1/4 mile",
// //       "Boat store: 1/4 mile (lots of water toys available)",
// //       "Silver Dollar City: 1 hour",
// //       "Golf cart or walk around the neighborhood and to the lake",
// //     ],
// //   },
// //   {
// //     id: 2,
// //     title: "Woodland Retreat",
// //     description:
// //       "Nestled in a lush forest, this campsite offers the perfect balance of seclusion and adventure.",
// //     price: "$60 / per night",
// //     image:
// //       "https://images.unsplash.com/photo-1526779259212-939e64788e3c?auto=format&fit=crop&w=800&q=80",
// //     amenities: ["Hiking trails", "Fire pit", "Picnic table", "Shaded sites"],
// //     rules: ["No loud music", "Quiet hours 11PM-6AM", "Max 6 people"],
// //     location: "Forest Hills, TN",
// //     proximity: [
// //       "Nature trails: 1/2 mile",
// //       "Wildlife observation point: 3/4 mile",
// //       "Local craft market: 2 miles",
// //       "Scenic overlook: 30 minutes",
// //       "Short walk to forest picnic area",
// //     ],
// //   },
// //   {
// //     id: 3,
// //     title: "Riverside Bliss",
// //     description:
// //       "Set up camp along the gentle river and unwind to the soothing sounds of flowing water.",
// //     price: "$50 / per night",
// //     image:
// //       "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=800&q=80",
// //     amenities: ["River access", "Fire pit", "Picnic table", "Fishing spot"],
// //     rules: ["No pets", "Quiet hours 10PM-7AM", "Max 4 people"],
// //     location: "River Bend, CO",
// //     proximity: [
// //       "Kayak launch: 1/3 mile",
// //       "Fishing pier: 1/2 mile",
// //       "River trail: 1 mile",
// //       "Town center: 45 minutes",
// //       "Walkable riverside path nearby",
// //     ],
// //   },
// //   {
// //     id: 4,
// //     title: "Mountain View Hideaway",
// //     description:
// //       "Enjoy panoramic mountain views and crisp fresh air, perfect for nature lovers.",
// //     price: "$65 / per night",
// //     image:
// //       "https://images.unsplash.com/photo-1628463560285-9defe937c970?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
// //     amenities: ["Mountain views", "Fire pit", "Picnic table", "Hiking nearby"],
// //     rules: ["No smoking", "Quiet hours 10PM-7AM", "Max 6 people"],
// //     location: "Rocky Peak, MT",
// //     proximity: [
// //       "Hiking trailhead: 1/2 mile",
// //       "Ski lift: 5 miles (seasonal)",
// //       "Mountain lookout: 1 mile",
// //       "Visitor center: 20 minutes",
// //       "Golf cart access to nearby ridge",
// //     ],
// //   },
// // ];

// // export default campsites;
// // export const router = createBrowserRouter([
// //   {
// //     path: "/",
// //     element: <RootLayout />,
// //     errorElement: <ErrorPage />,
// //     children: [
// //       { index: true, element: <Home campsites={campsites} /> },
// //       {
// //         path: "/reservation",
// //         element: <ReservationPage campsites={campsites} />,
// //       },
// //       { path: "/attraction", element: <AttractionPage /> },
// //       { path: "/contact", element: <ContactPage /> },
// //       { path: "/about", element: <AboutPage /> },
// //       { path: "/details/:id", element: <RVDetails campsites={campsites} /> },
// //       { path: "/checkout/:id", element: <RVCheckout campsites={campsites} /> },
// //     ],
// //   },
// // ]);
// import { createBrowserRouter } from "react-router-dom";
// import RootLayout from "../layouts/RootLayout";
// import Home from "../pages/Home/Home";
// import ErrorPage from "../pages/ErrorPage/ErrorPage";
// import ReservationPage from "../pages/Reservation/ReservationPage";
// import AttractionPage from "../pages/Attractions/AttractionPage";
// import ContactPage from "../pages/Contact/ContactPage";
// import AboutPage from "../pages/About/AboutPage";
// import RVDetails from "../pages/RVdetails/RVDetails";
// import RVCheckout from "../pages/RVcheckout/RVCheckout";

// // Define campsites with only A Step Above RV Park
// const campsites = [
//   {
//     id: 1,
//     title: "A Step Above RV Park",
//     description:
//       "A premier RV camping experience near Table Rock Lake in Shell Knob, MO, with full hookups and scenic views.",
//     price: "$55 / per night",
//     image:
//       "https://images.unsplash.com/photo-1525811902-f2342640856e?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     amenities: [
//       "Lake access",
//       "Fire pit",
//       "Picnic table",
//       "Water hookup",
//       "Electric hookup",
//     ],
//     rules: ["No pets", "Quiet hours 10PM-7AM", "Max 6 people", "No smoking"],
//     location: "Shell Knob, MO",
//     proximity: [
//       "Table Rock Lake: 2 miles",
//       "Silver Dollar City: 15 miles",
//       "Shell Knob Bridge: 1 mile",
//     ],
//   },
// ];

// export default campsites;

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     errorElement: <ErrorPage />,
//     children: [
//       { index: true, element: <Home campsites={campsites} /> },
//       {
//         path: "/reservation",
//         element: <ReservationPage campsites={campsites} />,
//       },
//       {
//         path: "/attractions",
//         element: <AttractionPage campsites={campsites} />,
//       },
//       {
//         path: "/attractions/:attractionId",
//         element: <AttractionPage campsites={campsites} />,
//       },
//       { path: "/contact", element: <ContactPage /> },
//       { path: "/about", element: <AboutPage /> },
//       { path: "/details/:id", element: <RVDetails campsites={campsites} /> },
//       { path: "/checkout/:id", element: <RVCheckout campsites={campsites} /> },
//       { path: "/rv-park", element: <RVDetails campsites={campsites} /> }, // Specific RV park route
//     ],
//   },
// ]);

import { createBrowserRouter } from "react-router-dom";
import { campsiteData } from "../data"; // Import centralized data
import RootLayout from "../layouts/RootLayout";
import AboutPage from "../pages/About/AboutPage";
import AdminLoginPage from "../pages/AdminLoginPage";
import AdventureAndPeaceDetailsPage from "../pages/Attractions/AdventureAndPeaceDetailsPage";
import AdventureAndPeacePage from "../pages/Attractions/AdventureAndPeacePage";
import AttractionPage from "../pages/Attractions/AttractionPage";
import ContactPage from "../pages/Contact/ContactPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import ReservationPage from "../pages/Reservation/ReservationPage";
import BookingConfirmation from "../pages/RVcheckout/BookingConfirmation";
import RVCheckout from "../pages/RVcheckout/RVCheckout";
import RVDetails from "../pages/RVdetails/RVDetails";
import RVParkPage from "../pages/RVdetails/RVParkPage";

export default campsiteData;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home campsites={campsiteData} /> },
      {
        path: "/reservation",
        element: <ReservationPage campsites={campsiteData} />,
      },
      {
        path: "/attractions",
        element: <AttractionPage campsites={campsiteData} />,
      },
      {
        path: "/attractions/:attractionId",
        element: <AttractionPage campsites={campsiteData} />,
      },
      {
        path: "/adventure-and-peace",
        element: <AdventureAndPeacePage />,
      },
      {
        path: "/adventure-and-peace/:id",
        element: <AdventureAndPeaceDetailsPage />,
      },
      { path: "/contact", element: <ContactPage /> },
      { path: "/about", element: <AboutPage /> },
      {
        path: "/reservation-details/:id",
        element: <RVDetails campsites={campsiteData} />,
      },
      {
        path: "/checkout/:id",
        element: <RVCheckout />,
      },
      { path: "/rv-park", element: <RVParkPage /> },
      { path: "/booking-confirmation", element: <BookingConfirmation /> },
      {
        path: "/admin-login",
        element: <AdminLoginPage />,
      },
    ],
  },
]);
