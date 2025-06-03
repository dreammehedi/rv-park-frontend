// // import {
// //   CalendarOutlined,
// //   CheckOutlined,
// //   EnvironmentOutlined,
// //   MinusOutlined,
// //   PlusOutlined,
// //   SearchOutlined,
// //   UserOutlined,
// // } from "@ant-design/icons";
// // import {
// //   DirectionsRenderer,
// //   GoogleMap,
// //   LoadScript,
// //   Marker,
// // } from "@react-google-maps/api";
// // import {
// //   Breadcrumb,
// //   Checkbox,
// //   DatePicker,
// //   Drawer,
// //   Input,
// //   List,
// //   Modal,
// //   Popover,
// //   Spin,
// // } from "antd";
// // import dayjs from "dayjs";
// // import { useCallback, useEffect, useRef, useState } from "react";
// // import { Link } from "react-router-dom";
// // import { useGetContactQuery } from "../../services/api/settings/contactSlice";

// // const { RangePicker } = DatePicker;

// // const SearchSection = ({ contact = false }) => {
// //   const [searchType, setSearchType] = useState("destination");
// //   const [isSticky, setIsSticky] = useState(false);
// //   const [guestPopoverVisible, setGuestPopoverVisible] = useState(false);
// //   const [guests, setGuests] = useState({
// //     adults: 0,
// //     children: 0,
// //     pets: 0,
// //   });

// //   const [destinationInput, setDestinationInput] = useState("");
// //   const [startingLocationInput, setStartingLocationInput] = useState("");
// //   const [whereToInput, setWhereToInput] = useState("");
// //   const [roadtripPinCount, setRoadtripPinCount] = useState(0);
// //   const [directionsService, setDirectionsService] = useState(null);
// //   const [directions, setDirections] = useState(null);
// //   const [directionsSteps, setDirectionsSteps] = useState([]);
// //   const [showDirections, setShowDirections] = useState(false);
// //   const [completedSteps, setCompletedSteps] = useState([]);
// //   const [modalVisible, setModalVisible] = useState(false);
// //   const [markerToRemove, setMarkerToRemove] = useState(null);
// //   const [mapLoaded, setMapLoaded] = useState(false);
// //   const [map, setMap] = useState(null);
// //   const [zoom, setZoom] = useState(10);
// //   const [mapType, setMapType] = useState("terrain");

// //   // Updated locations: Only the main RV park and nearby attractions
// //   const [locations, setLocations] = useState([
// //     {
// //       id: 1,
// //       name: "A Step Above RV Park",
// //       lat: 36.6259,
// //       lng: -93.6485,
// //       path: "/rv-park",
// //     }, // Main RV Park
// //     {
// //       id: 2,
// //       name: "Table Rock Lake",
// //       lat: 36.5959,
// //       lng: -93.5708,
// //       path: "/attractions/table-rock-lake",
// //     }, // Nearby attraction
// //     {
// //       id: 3,
// //       name: "Silver Dollar City",
// //       lat: 36.6672,
// //       lng: -93.2978,
// //       path: "/attractions/silver-dollar-city",
// //     }, // Nearby attraction
// //     {
// //       id: 4,
// //       name: "Shell Knob Bridge",
// //       lat: 36.6321,
// //       lng: -93.6342,
// //       path: "/attractions/shell-knob-bridge",
// //     }, // Nearby attraction
// //   ]);

// //   const [resetKey, setResetKey] = useState(0);
// //   const [directionsModalVisible, setDirectionsModalVisible] = useState(false);

// //   const guestInputRef = useRef(null);
// //   const dateFormat = "MMM D";

// //   const mapContainerStyle = {
// //     width: "100%",
// //     height: "400px",
// //     borderRadius: "8px",
// //     overflow: "hidden",
// //   };

// //   const center = {
// //     lat: 36.6259,
// //     lng: -93.6485,
// //   };

// //   const totalGuests =
// //     guests.adults + guests.children + (guests.pets > 0 ? 1 : 0);

// //   const updateGuestCount = (type, increment) => {
// //     setGuests((prev) => ({
// //       ...prev,
// //       [type]: Math.max(0, prev[type] + increment),
// //     }));
// //   };

// //   const formatDateRange = (dates) => {
// //     if (!dates || dates.length !== 2) return "";
// //     return `${dayjs(dates[0]).format(dateFormat)} – ${dayjs(dates[1]).format(
// //       dateFormat
// //     )}`;
// //   };

// //   useEffect(() => {
// //     const handleScroll = () => {
// //       setIsSticky(window.scrollY > 100);
// //     };
// //     window.addEventListener("scroll", handleScroll);
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);

// //   const onLoad = useCallback((map) => {
// //     setMapLoaded(true);
// //     setMap(map);
// //     if (window.google) {
// //       setDirectionsService(new window.google.maps.DirectionsService());
// //     }
// //   }, []);

// //   const handleMapClick = (event) => {
// //     const lat = event.latLng.lat();
// //     const lng = event.latLng.lng();
// //     const newLocation = {
// //       id: locations.length + 1,
// //       name: `New Location ${locations.length + 1}`,
// //       lat: lat,
// //       lng: lng,
// //       path: `/attractions/new-location-${locations.length + 1}`,
// //     };

// //     const geocoder = new window.google.maps.Geocoder();
// //     geocoder.geocode({ location: { lat, lng } }, (results, status) => {
// //       if (status === "OK" && results[0]) {
// //         const locationName = results[0].formatted_address;
// //         newLocation.name = locationName;

// //         if (searchType === "destination") {
// //           setDestinationInput(locationName);
// //         } else if (searchType === "roadtrip") {
// //           if (roadtripPinCount === 0) {
// //             setStartingLocationInput(locationName);
// //             setRoadtripPinCount(1);
// //           } else {
// //             setWhereToInput(locationName);
// //             setRoadtripPinCount(0);
// //             if (startingLocationInput && locationName && directionsService) {
// //               calculateDirections(startingLocationInput, locationName);
// //             }
// //           }
// //         }
// //         setLocations([...locations, newLocation]);
// //       }
// //     });
// //   };

// //   const calculateDirections = (origin, destination) => {
// //     if (!directionsService) return;
// //     directionsService.route(
// //       {
// //         origin: origin,
// //         destination: destination,
// //         travelMode: window.google.maps.TravelMode.DRIVING,
// //         provideRouteAlternatives: true,
// //       },
// //       (result, status) => {
// //         if (status === window.google.maps.DirectionsStatus.OK) {
// //           setDirections(result);
// //           if (
// //             result.routes &&
// //             result.routes.length > 0 &&
// //             result.routes[0].legs &&
// //             result.routes[0].legs.length > 0
// //           ) {
// //             setDirectionsSteps(result.routes[0].legs[0].steps);
// //             setCompletedSteps([]);
// //           }
// //         } else {
// //           console.error(`Directions request failed: ${status}`);
// //         }
// //       }
// //     );
// //   };

// //   useEffect(() => {
// //     setDestinationInput("");
// //     setStartingLocationInput("");
// //     setWhereToInput("");
// //     setRoadtripPinCount(0);
// //     setDirectionsSteps([]);
// //     setShowDirections(false);
// //     setDirections(null);
// //     setCompletedSteps([]);
// //   }, [searchType]);

// //   const handleMarkerDrag = (event, id) => {
// //     const lat = event.latLng.lat();
// //     const lng = event.latLng.lng();
// //     setLocations((prevLocations) =>
// //       prevLocations.map((loc) =>
// //         loc.id === id ? { ...loc, lat: lat, lng: lng } : loc
// //       )
// //     );

// //     const geocoder = new window.google.maps.Geocoder();
// //     geocoder.geocode({ location: { lat, lng } }, (results, status) => {
// //       if (status === "OK" && results[0]) {
// //         const locationName = results[0].formatted_address;
// //         setLocations((prevLocations) =>
// //           prevLocations.map((loc) =>
// //             loc.id === id ? { ...loc, name: locationName } : loc
// //           )
// //         );

// //         const isLastDestinationMarker =
// //           searchType === "destination" &&
// //           id ===
// //             Math.max(
// //               ...locations.filter((loc) => loc.id > 4).map((loc) => loc.id)
// //             );
// //         const isStartingLocationMarker =
// //           searchType === "roadtrip" &&
// //           id ===
// //             Math.max(
// //               ...locations.filter((loc) => loc.id > 4).map((loc) => loc.id)
// //             ) -
// //               1;
// //         const isWhereToMarker =
// //           searchType === "roadtrip" &&
// //           id ===
// //             Math.max(
// //               ...locations.filter((loc) => loc.id > 4).map((loc) => loc.id)
// //             );

// //         if (isLastDestinationMarker) {
// //           setDestinationInput(locationName);
// //         } else if (isStartingLocationMarker) {
// //           setStartingLocationInput(locationName);
// //           if (locationName && whereToInput && directionsService) {
// //             calculateDirections(locationName, whereToInput);
// //           }
// //         } else if (isWhereToMarker) {
// //           setWhereToInput(locationName);
// //           if (startingLocationInput && locationName && directionsService) {
// //             calculateDirections(startingLocationInput, locationName);
// //           }
// //         }
// //       }
// //     });
// //   };

// //   const resetAllPins = () => {
// //     setLocations([
// //       {
// //         id: 1,
// //         name: "A Step Above RV Park",
// //         lat: 36.6259,
// //         lng: -93.6485,
// //         path: "/rv-park",
// //       },
// //       {
// //         id: 2,
// //         name: "Table Rock Lake",
// //         lat: 36.5959,
// //         lng: -93.5708,
// //         path: "/attractions/table-rock-lake",
// //       },
// //       {
// //         id: 3,
// //         name: "Silver Dollar City",
// //         lat: 36.6672,
// //         lng: -93.2978,
// //         path: "/attractions/silver-dollar-city",
// //       },
// //       {
// //         id: 4,
// //         name: "Shell Knob Bridge",
// //         lat: 36.6321,
// //         lng: -93.6342,
// //         path: "/attractions/shell-knob-bridge",
// //       },
// //     ]);
// //     setDestinationInput("");
// //     setStartingLocationInput("");
// //     setWhereToInput("");
// //     setRoadtripPinCount(0);
// //     setDirections(null);
// //     setDirectionsSteps([]);
// //     setShowDirections(false);
// //     setCompletedSteps([]);
// //     setResetKey((prevKey) => prevKey + 1);
// //   };

// //   const showRemoveMarkerModal = (id) => {
// //     if (id > 4) {
// //       const marker = locations.find((loc) => loc.id === id);
// //       if (marker) {
// //         setMarkerToRemove(marker);
// //         setModalVisible(true);
// //       }
// //     }
// //   };

// //   const handleRemoveMarkerConfirm = () => {
// //     if (markerToRemove) {
// //       setLocations(locations.filter((loc) => loc.id !== markerToRemove.id));
// //       if (
// //         searchType === "destination" &&
// //         destinationInput === markerToRemove.name
// //       ) {
// //         setDestinationInput("");
// //       } else if (searchType === "roadtrip") {
// //         if (startingLocationInput === markerToRemove.name) {
// //           setStartingLocationInput("");
// //           setDirections(null);
// //           setDirectionsSteps([]);
// //           setShowDirections(false);
// //           setCompletedSteps([]);
// //         } else if (whereToInput === markerToRemove.name) {
// //           setWhereToInput("");
// //           setDirections(null);
// //           setDirectionsSteps([]);
// //           setShowDirections(false);
// //           setCompletedSteps([]);
// //         }
// //       }
// //       setModalVisible(false);
// //       setMarkerToRemove(null);
// //     }
// //   };

// //   const handleRemoveMarkerCancel = () => {
// //     setModalVisible(false);
// //     setMarkerToRemove(null);
// //   };

// //   const toggleDirections = () => {
// //     setDirectionsModalVisible(!directionsModalVisible);
// //   };

// //   const toggleStepCompletion = (index) => {
// //     setCompletedSteps((prev) =>
// //       prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
// //     );
// //   };

// //   const markPreviousStepsCompleted = (index) => {
// //     const newCompletedSteps = [];
// //     for (let i = 0; i <= index; i++) {
// //       if (!completedSteps.includes(i)) newCompletedSteps.push(i);
// //     }
// //     setCompletedSteps((prev) => [...prev, ...newCompletedSteps]);
// //   };

// //   const guestPopoverContent = (
// //     <div className="p-2 w-64">
// //       <div className="flex justify-between items-center py-2">
// //         <div>
// //           <div className="font-medium text-gray-800">ADULTS</div>
// //           <div className="text-sm text-gray-600">Ages 13 or above</div>
// //         </div>
// //         <div className="flex items-center gap-3">
// //           <button
// //             className={`w-8 h-8 rounded-full flex items-center justify-center border ${
// //               guests.adults > 0
// //                 ? "border-gray-400 text-gray-600"
// //                 : "border-gray-200 text-gray-300"
// //             }`}
// //             onClick={() => updateGuestCount("adults", -1)}
// //             disabled={guests.adults === 0}
// //           >
// //             <MinusOutlined />
// //           </button>
// //           <span className="w-4 text-center">{guests.adults}</span>
// //           <button
// //             className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-400 text-gray-600"
// //             onClick={() => updateGuestCount("adults", 1)}
// //           >
// //             <PlusOutlined />
// //           </button>
// //         </div>
// //       </div>
// //       <div className="border-t border-gray-200 my-2"></div>
// //       <div className="flex justify-between items-center py-2">
// //         <div>
// //           <div className="font-medium text-gray-800">CHILDREN</div>
// //           <div className="text-sm text-gray-600">Ages 12 or below</div>
// //         </div>
// //         <div className="flex items-center gap-3">
// //           <button
// //             className={`w-8 h-8 rounded-full flex items-center justify-center border ${
// //               guests.children > 0
// //                 ? "border-gray-400 text-gray-600"
// //                 : "border-gray-200 text-gray-300"
// //             }`}
// //             onClick={() => updateGuestCount("children", -1)}
// //             disabled={guests.children === 0}
// //           >
// //             <MinusOutlined />
// //           </button>
// //           <span className="w-4 text-center">{guests.children}</span>
// //           <button
// //             className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-400 text-gray-600"
// //             onClick={() => updateGuestCount("children", 1)}
// //           >
// //             <PlusOutlined />
// //           </button>
// //         </div>
// //       </div>
// //       <div className="border-t border-gray-200 my-2"></div>
// //       <div className="flex justify-between items-center py-2">
// //         <div>
// //           <div className="font-medium text-gray-800">Any pets?</div>
// //         </div>
// //         <div className="flex items-center gap-3">
// //           <button
// //             className={`w-8 h-8 rounded-full flex items-center justify-center border ${
// //               guests.pets > 0
// //                 ? "border-gray-400 text-gray-600"
// //                 : "border-gray-200 text-gray-300"
// //             }`}
// //             onClick={() => updateGuestCount("pets", -1)}
// //             disabled={guests.pets === 0}
// //           >
// //             <MinusOutlined />
// //           </button>
// //           <span className="w-4 text-center">{guests.pets}</span>
// //           <button
// //             className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-400 text-gray-600"
// //             onClick={() => updateGuestCount("pets", 1)}
// //           >
// //             <PlusOutlined />
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   const drawerStyles = {
// //     header: {
// //       background: "#f9fafb",
// //       borderBottom: "1px solid #e5e7eb",
// //       padding: "16px 24px",
// //     },
// //     body: { padding: "0" },
// //     mask: { backgroundColor: "rgba(0, 0, 0, 0.45)" },
// //     content: {
// //       boxShadow:
// //         "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
// //     },
// //     wrapper: { borderRadius: "0" },
// //   };

// //   const { data: contactInformation, isLoading: contactInformationLoading } =
// //     useGetContactQuery();
// //   const contactInformationData = contactInformation?.payload[0];

// //   const mapKey =
// //     contactInformationData?.googleApiKey || import.meta.env.VITE_MAP_KEY;

// //   return (
// //     <div
// //       className="z-50 w-full py-4 bg-cover bg-center"
// //       style={{
// //         backgroundImage:
// //           'url("https://images.unsplash.com/photo-1515876305430-f06edab8282a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
// //       }}
// //     >
// //       <div className="relative z-10 px-4 md:px-8 max-w-[1330px] mx-auto">
// //         {contact ? (
// //           <div className="flex flex-col md:flex-row items-start gap-4 max-w-7xl mx-auto bg-white/10 backdrop-blur-lg p-4 shadow-xl border border-white/20">
// //             <div className="bg-gray-100 py-3 px-6 w-full">
// //               <Breadcrumb separator="|">
// //                 <Breadcrumb.Item>
// //                   <Link to="/" className="text-gray-600 hover:text-yellow-500">
// //                     Home
// //                   </Link>
// //                 </Breadcrumb.Item>
// //                 <Breadcrumb.Item>
// //                   <span className="text-yellow-500">Contact</span>
// //                 </Breadcrumb.Item>
// //               </Breadcrumb>
// //             </div>
// //           </div>
// //         ) : (
// //           <div className="items-start gap-4 mx-auto">
// //             <div className="md:sticky top-18 z-[999] bg-white/10 backdrop-blur-lg p-4 shadow-xl border border-white/20">
// //               <div className="flex gap-2 mb-4">
// //                 <button
// //                   className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
// //                     searchType === "destination"
// //                       ? "bg-gray-100 text-gray-800 shadow-md"
// //                       : "bg-transparent text-white hover:bg-white/10"
// //                   }`}
// //                   onClick={() => setSearchType("destination")}
// //                 >
// //                   Destination
// //                 </button>
// //                 <div className="relative">
// //                   <button
// //                     className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
// //                       searchType === "roadtrip"
// //                         ? "bg-gray-100 text-gray-800 shadow-md"
// //                         : "bg-transparent text-white hover:bg-white/10"
// //                     }`}
// //                     onClick={() => setSearchType("roadtrip")}
// //                   >
// //                     Roadtrip
// //                   </button>
// //                 </div>
// //               </div>
// //               <div className="flex flex-col md:flex-row gap-4">
// //                 {searchType === "destination" ? (
// //                   <div className="flex flex-col md:flex-row gap-4 flex-1">
// //                     <div className="w-full">
// //                       <Input
// //                         placeholder="Search destinations"
// //                         value={destinationInput}
// //                         onChange={(e) => setDestinationInput(e.target.value)}
// //                         prefix={
// //                           <EnvironmentOutlined className="text-gray-400" />
// //                         }
// //                         className="h-12 border border-gray-300"
// //                         style={{ borderRadius: 0 }}
// //                       />
// //                     </div>
// //                     <div className="w-full">
// //                       <RangePicker
// //                         format={dateFormat}
// //                         placeholder={["Add dates", ""]}
// //                         separator="–"
// //                         suffixIcon={
// //                           <CalendarOutlined className="text-gray-400" />
// //                         }
// //                         className="h-12 border border-gray-300 w-full"
// //                         style={{ borderRadius: 0 }}
// //                         getPopupContainer={(trigger) => trigger.parentNode}
// //                         renderExtraFooter={() => (
// //                           <div className="text-xs text-gray-500 p-2">
// //                             Select check-in and check-out dates
// //                           </div>
// //                         )}
// //                       />
// //                     </div>
// //                     <div className="w-full">
// //                       <Popover
// //                         content={guestPopoverContent}
// //                         trigger="click"
// //                         open={guestPopoverVisible}
// //                         onOpenChange={setGuestPopoverVisible}
// //                         placement="bottomRight"
// //                         overlayClassName="guest-popover"
// //                         getPopupContainer={(trigger) => trigger.parentNode}
// //                       >
// //                         <Input
// //                           ref={guestInputRef}
// //                           placeholder="Add guests"
// //                           value={
// //                             totalGuests > 0
// //                               ? `${totalGuests} guest${
// //                                   totalGuests > 1 ? "s" : ""
// //                                 }`
// //                               : ""
// //                           }
// //                           prefix={<UserOutlined className="text-gray-400" />}
// //                           className="h-12 border border-gray-300 cursor-pointer"
// //                           style={{ borderRadius: 0 }}
// //                           readOnly
// //                           onClick={() =>
// //                             setGuestPopoverVisible(!guestPopoverVisible)
// //                           }
// //                         />
// //                       </Popover>
// //                     </div>
// //                   </div>
// //                 ) : (
// //                   <div className="flex flex-col md:flex-row gap-4 flex-1">
// //                     <div className="w-full">
// //                       <Input
// //                         placeholder="Starting location"
// //                         value={startingLocationInput}
// //                         onChange={(e) => {
// //                           setStartingLocationInput(e.target.value);
// //                           if (
// //                             e.target.value &&
// //                             whereToInput &&
// //                             directionsService
// //                           ) {
// //                             calculateDirections(e.target.value, whereToInput);
// //                           }
// //                         }}
// //                         prefix={
// //                           <EnvironmentOutlined className="text-gray-400" />
// //                         }
// //                         className="h-12 border border-gray-300"
// //                         style={{ borderRadius: 0 }}
// //                       />
// //                     </div>
// //                     <div className="w-full">
// //                       <Input
// //                         placeholder="Where to?"
// //                         value={whereToInput}
// //                         onChange={(e) => {
// //                           setWhereToInput(e.target.value);
// //                           if (
// //                             startingLocationInput &&
// //                             e.target.value &&
// //                             directionsService
// //                           ) {
// //                             calculateDirections(
// //                               startingLocationInput,
// //                               e.target.value
// //                             );
// //                           }
// //                         }}
// //                         prefix={
// //                           <EnvironmentOutlined className="text-gray-400" />
// //                         }
// //                         className="h-12 border border-gray-300"
// //                         style={{ borderRadius: 0 }}
// //                       />
// //                     </div>
// //                     <div className="w-full">
// //                       <Popover
// //                         content={guestPopoverContent}
// //                         trigger="click"
// //                         open={guestPopoverVisible}
// //                         onOpenChange={setGuestPopoverVisible}
// //                         placement="bottomRight"
// //                         overlayClassName="guest-popover"
// //                         getPopupContainer={(trigger) => trigger.parentNode}
// //                       >
// //                         <Input
// //                           ref={guestInputRef}
// //                           placeholder="Add guests"
// //                           value={
// //                             totalGuests > 0
// //                               ? `${totalGuests} guest${
// //                                   totalGuests > 1 ? "s" : ""
// //                                 }`
// //                               : ""
// //                           }
// //                           prefix={<UserOutlined className="text-gray-400" />}
// //                           className="h-12 border border-gray-300 cursor-pointer"
// //                           style={{ borderRadius: 0 }}
// //                           readOnly
// //                           onClick={() =>
// //                             setGuestPopoverVisible(!guestPopoverVisible)
// //                           }
// //                         />
// //                       </Popover>
// //                     </div>
// //                   </div>
// //                 )}
// //                 <div className="w-full md:w-auto">
// //                   <button className="w-full bg-yellow-500 text-white px-6 py-3 flex items-center justify-center gap-2 hover:bg-yellow-600 transition-colors duration-300 h-12 text-base font-medium">
// //                     Search <SearchOutlined />
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="mt-6 bg-white/10 backdrop-blur-lg p-4 shadow-xl border border-white/20">
// //               <h3 className="text-white text-lg font-medium mb-3">
// //                 Explore Our Location
// //               </h3>
// //               <LoadScript
// //                 googleMapsApiKey={mapKey}
// //                 onLoad={() => console.log("Script loaded successfully")}
// //               >
// //                 {mapLoaded || !contactInformationLoading ? (
// //                   <GoogleMap
// //                     key={resetKey}
// //                     mapContainerStyle={mapContainerStyle}
// //                     center={center}
// //                     zoom={zoom}
// //                     mapTypeId={mapType}
// //                     options={{
// //                       streetViewControl: false,
// //                       fullscreenControl: true,
// //                       zoomControl: true,
// //                       mapTypeControl: true,
// //                       draggableCursor: "pointer",
// //                     }}
// //                     onClick={handleMapClick}
// //                     onLoad={onLoad}
// //                   >
// //                     {searchType === "roadtrip" && directions && (
// //                       <DirectionsRenderer
// //                         options={{
// //                           directions: directions,
// //                           suppressMarkers: false,
// //                           polylineOptions: {
// //                             strokeColor: "#4285F4",
// //                             strokeWeight: 5,
// //                             strokeOpacity: 0.8,
// //                           },
// //                         }}
// //                       />
// //                     )}
// //                     {locations?.map((location) => (
// //                       <Marker
// //                         key={`${location.id}-${resetKey}`}
// //                         position={{ lat: location.lat, lng: location.lng }}
// //                         title={location.name}
// //                         draggable={location.id > 4} // Only user-added markers are draggable
// //                         onDragEnd={(event) =>
// //                           handleMarkerDrag(event, location.id)
// //                         }
// //                         onClick={() =>
// //                           location.id > 4
// //                             ? showRemoveMarkerModal(location.id)
// //                             : null
// //                         }
// //                         icon={{
// //                           url:
// //                             location.id === 1
// //                               ? "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
// //                               : location.id <= 4
// //                               ? "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
// //                               : searchType === "roadtrip" &&
// //                                 location.name === startingLocationInput
// //                               ? "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
// //                               : searchType === "roadtrip" &&
// //                                 location.name === whereToInput
// //                               ? "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
// //                               : "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
// //                         }}
// //                       >
// //                         {/* Wrap Marker in Link for navigation to details page */}
// //                         {location.path && (
// //                           <Link to={location.path} className="marker-link" />
// //                         )}
// //                       </Marker>
// //                     ))}
// //                   </GoogleMap>
// //                 ) : (
// //                   <div className="w-full h-[500px] bg-gray-200 rounded-lg flex items-center justify-center shadow-lg">
// //                     <p className="text-gray-600">
// //                       <Spin />
// //                     </p>
// //                   </div>
// //                 )}
// //               </LoadScript>
// //               <div className="flex justify-between mt-3">
// //                 <div className="flex gap-2">
// //                   <button
// //                     className={`px-3 py-1 text-xs rounded ${
// //                       mapType === "roadmap"
// //                         ? "bg-yellow-500 text-white"
// //                         : "bg-white/50 text-gray-800"
// //                     }`}
// //                     onClick={() => setMapType("roadmap")}
// //                   >
// //                     Road
// //                   </button>
// //                   <button
// //                     className={`px-3 py-1 text-xs rounded ${
// //                       mapType === "satellite"
// //                         ? "bg-yellow-500 text-white"
// //                         : "bg-white/50 text-gray-800"
// //                     }`}
// //                     onClick={() => setMapType("satellite")}
// //                   >
// //                     Satellite
// //                   </button>
// //                   <button
// //                     className={`px-3 py-1 text-xs rounded ${
// //                       mapType === "terrain"
// //                         ? "bg-yellow-500 text-white"
// //                         : "bg-white/50 text-gray-800"
// //                     }`}
// //                     onClick={() => setMapType("terrain")}
// //                   >
// //                     Terrain
// //                   </button>
// //                   <button
// //                     className="px-3 py-1 text-xs rounded bg-red-500 text-white"
// //                     onClick={resetAllPins}
// //                   >
// //                     Reset Pins
// //                   </button>
// //                 </div>
// //                 <div className="flex gap-2">
// //                   <button
// //                     className="px-3 py-1 text-xs rounded bg-white/50 text-gray-800"
// //                     onClick={() => setZoom(Math.min(zoom + 1, 20))}
// //                   >
// //                     Zoom +
// //                   </button>
// //                   <button
// //                     className="px-3 py-1 text-xs rounded bg-white/50 text-gray-800"
// //                     onClick={() => setZoom(Math.max(zoom - 1, 1))}
// //                   >
// //                     Zoom -
// //                   </button>
// //                 </div>
// //               </div>
// //               <div className="mt-3 text-white/80 text-sm">
// //                 <p>
// //                   Click on the map to add a marker. Drag markers to reposition
// //                   them. Click on a marker to remove it (user-added only).
// //                 </p>
// //                 <p className="mt-1">
// //                   Explore A Step Above RV Park and nearby attractions like Table
// //                   Rock Lake and Silver Dollar City.
// //                 </p>
// //               </div>
// //               {searchType === "roadtrip" && directionsSteps.length > 0 && (
// //                 <div className="mt-4">
// //                   <button
// //                     onClick={toggleDirections}
// //                     className="w-full bg-yellow-500 text-white px-4 py-2 flex items-center justify-center gap-2 hover:bg-yellow-600 transition-colors duration-300"
// //                   >
// //                     View Step-by-Step Directions
// //                   </button>
// //                 </div>
// //               )}
// //               <Drawer
// //                 title={`Directions from ${startingLocationInput} to ${whereToInput}`}
// //                 placement="right"
// //                 onClose={() => setDirectionsModalVisible(false)}
// //                 open={directionsModalVisible}
// //                 width={800}
// //                 className="directions-drawer"
// //                 styles={drawerStyles}
// //               >
// //                 {directionsSteps.length > 0 && (
// //                   <div className="directions-container">
// //                     <div className="p-4 bg-gray-50 border-b border-gray-200">
// //                       <div className="flex justify-between items-center">
// //                         <h3 className="font-medium text-lg">
// //                           Navigation Steps
// //                         </h3>
// //                         <button
// //                           className="text-yellow-500 hover:text-yellow-600 text-sm font-medium"
// //                           onClick={() => setCompletedSteps([])}
// //                         >
// //                           Reset Progress
// //                         </button>
// //                       </div>
// //                     </div>
// //                     <List
// //                       size="large"
// //                       dataSource={directionsSteps}
// //                       className="directions-list"
// //                       renderItem={(step, index) => (
// //                         <List.Item
// //                           className={`py-3 px-4 border-b border-gray-200 last:border-0 ${
// //                             completedSteps.includes(index) ? "bg-yellow-50" : ""
// //                           }`}
// //                         >
// //                           <div className="flex items-start gap-3 w-full">
// //                             <div
// //                               className={`${
// //                                 completedSteps.includes(index)
// //                                   ? "bg-yellow-500"
// //                                   : "bg-gray-500"
// //                               } text-white w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1`}
// //                               style={{ borderRadius: 0 }}
// //                             >
// //                               {completedSteps.includes(index) ? (
// //                                 <CheckOutlined />
// //                               ) : (
// //                                 index + 1
// //                               )}
// //                             </div>
// //                             <div className="flex-1">
// //                               <div
// //                                 dangerouslySetInnerHTML={{
// //                                   __html: step.instructions,
// //                                 }}
// //                                 className={`text-sm text-gray-700 ${
// //                                   completedSteps.includes(index)
// //                                     ? "line-through text-gray-500"
// //                                     : ""
// //                                 }`}
// //                               />
// //                               <div className="text-xs text-gray-500 mt-1">
// //                                 {step.distance?.text} · {step.duration?.text}
// //                               </div>
// //                               <div className="mt-2 flex justify-between items-center">
// //                                 <Checkbox
// //                                   checked={completedSteps.includes(index)}
// //                                   onChange={() => toggleStepCompletion(index)}
// //                                   className="custom-checkbox"
// //                                 >
// //                                   <span className="text-xs">
// //                                     Mark as completed
// //                                   </span>
// //                                 </Checkbox>
// //                                 {index > 0 &&
// //                                   !completedSteps.includes(index) && (
// //                                     <button
// //                                       onClick={() =>
// //                                         markPreviousStepsCompleted(index - 1)
// //                                       }
// //                                       className="text-xs text-yellow-500 hover:text-yellow-600"
// //                                     >
// //                                       Complete previous steps
// //                                     </button>
// //                                   )}
// //                               </div>
// //                             </div>
// //                           </div>
// //                         </List.Item>
// //                       )}
// //                     />
// //                     {directions?.routes[0]?.legs[0]?.distance &&
// //                       directions?.routes[0]?.legs[0]?.duration && (
// //                         <div className="p-4 border-t border-gray-300 bg-gray-50">
// //                           <div className="font-medium text-base">
// //                             Total Distance:{" "}
// //                             {directions.routes[0].legs[0].distance.text}
// //                           </div>
// //                           <div className="font-medium text-base">
// //                             Estimated Travel Time:{" "}
// //                             {directions.routes[0].legs[0].duration.text}
// //                           </div>
// //                           <div className="mt-3">
// //                             <div className="w-full bg-gray-200 h-2">
// //                               <div
// //                                 className="bg-yellow-500 h-2"
// //                                 style={{
// //                                   width: `${
// //                                     completedSteps.length > 0
// //                                       ? (completedSteps.length /
// //                                           directionsSteps.length) *
// //                                         100
// //                                       : 0
// //                                   }%`,
// //                                 }}
// //                               ></div>
// //                             </div>
// //                             <div className="text-sm text-gray-600 mt-1">
// //                               {completedSteps.length} of{" "}
// //                               {directionsSteps.length} steps completed
// //                             </div>
// //                           </div>
// //                         </div>
// //                       )}
// //                   </div>
// //                 )}
// //               </Drawer>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //       <Modal
// //         title="Remove Marker"
// //         open={modalVisible}
// //         onOk={handleRemoveMarkerConfirm}
// //         onCancel={handleRemoveMarkerCancel}
// //         okText="Remove"
// //         cancelText="Cancel"
// //         okButtonProps={{ danger: true }}
// //       >
// //         <p>
// //           Are you sure you want to remove the marker at {markerToRemove?.name}?
// //         </p>
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default SearchSection;
// import {
//   CalendarOutlined,
//   CheckOutlined,
//   EnvironmentOutlined,
//   MinusOutlined,
//   PlusOutlined,
//   SearchOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
// import {
//   DirectionsRenderer,
//   GoogleMap,
//   LoadScript,
//   Marker,
// } from "@react-google-maps/api";
// import {
//   Breadcrumb,
//   Checkbox,
//   DatePicker,
//   Drawer,
//   Input,
//   List,
//   Modal,
//   Popover,
//   Spin,
// } from "antd";
// import dayjs from "dayjs";
// import { useCallback, useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import { useGetContactQuery } from "../../services/api/settings/contactSlice";
// import { useGetAdventureAndPeaceQuery } from "../../services/api/pages/adventureAndPeaceSlice";
// import { useGetLocalAttractionsQuery } from "../../services/api/pages/localAttractionsSlice";
// import { useGetRvCampsitesQuery } from "../../services/api/pages/rvCampsitesSlice";

// const { RangePicker } = DatePicker;

// const SearchSection = ({ contact = false }) => {
//   const [searchType, setSearchType] = useState("destination");
//   const [isSticky, setIsSticky] = useState(false);
//   const [guestPopoverVisible, setGuestPopoverVisible] = useState(false);
//   const [guests, setGuests] = useState({
//     adults: 0,
//     children: 0,
//     pets: 0,
//   });

//   const [destinationInput, setDestinationInput] = useState("");
//   const [startingLocationInput, setStartingLocationInput] = useState("");
//   const [whereToInput, setWhereToInput] = useState("");
//   const [roadtripPinCount, setRoadtripPinCount] = useState(0);
//   const [directionsService, setDirectionsService] = useState(null);
//   const [directions, setDirections] = useState(null);
//   const [directionsSteps, setDirectionsSteps] = useState([]);
//   const [showDirections, setShowDirections] = useState(false);
//   const [completedSteps, setCompletedSteps] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [markerToRemove, setMarkerToRemove] = useState(null);
//   const [mapLoaded, setMapLoaded] = useState(false);
//   const [map, setMap] = useState(null);
//   const [zoom, setZoom] = useState(10);
//   const [mapType, setMapType] = useState("terrain");

//   const { data: campsiteData, isLoading: campsiteLoading } =
//     useGetRvCampsitesQuery();

//   // Combine locations from all three sources
//   const [locations, setLocations] = useState([]);

//   useEffect(() => {
//     const combinedLocations = [
//       ...(campsiteData?.payload || []).map((item, index) => ({
//         id: index + 1,
//         name: item.title,
//         lat: parseFloat(item.lat) || 36.6259, // Default to RV Park lat if missing
//         lng: parseFloat(item.long) || -93.6485, // Default to RV Park lng if missing
//         path: `/reservation-details/${item._id}`,
//         type: "campsite",
//       })),
//     ];
//     setLocations(combinedLocations);
//   }, [campsiteData]);

//   const [resetKey, setResetKey] = useState(0);
//   const [directionsModalVisible, setDirectionsModalVisible] = useState(false);

//   const guestInputRef = useRef(null);
//   const dateFormat = "MMM D";

//   const mapContainerStyle = {
//     width: "100%",
//     height: "400px",
//     borderRadius: "8px",
//     overflow: "hidden",
//   };

//   const center = {
//     lat: 36.6259, // Default center (A Step Above RV Park)
//     lng: -93.6485,
//   };

//   const totalGuests =
//     guests.adults + guests.children + (guests.pets > 0 ? 1 : 0);

//   const updateGuestCount = (type, increment) => {
//     setGuests((prev) => ({
//       ...prev,
//       [type]: Math.max(0, prev[type] + increment),
//     }));
//   };

//   const formatDateRange = (dates) => {
//     if (!dates || dates.length !== 2) return "";
//     return `${dayjs(dates[0]).format(dateFormat)} – ${dayjs(dates[1]).format(
//       dateFormat
//     )}`;
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsSticky(window.scrollY > 100);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const onLoad = useCallback((map) => {
//     setMapLoaded(true);
//     setMap(map);
//     if (window.google) {
//       setDirectionsService(new window.google.maps.DirectionsService());
//     }
//   }, []);

//   const handleMapClick = (event) => {
//     const lat = event.latLng.lat();
//     const lng = event.latLng.lng();
//     const newLocation = {
//       id: locations.length + 1,
//       name: `New Location ${locations.length + 1}`,
//       lat: lat,
//       lng: lng,
//       path: `/attractions/new-location-${locations.length + 1}`,
//       type: "user", // User-added marker
//     };

//     const geocoder = new window.google.maps.Geocoder();
//     geocoder.geocode({ location: { lat, lng } }, (results, status) => {
//       if (status === "OK" && results[0]) {
//         const locationName = results[0].formatted_address;
//         newLocation.name = locationName;

//         if (searchType === "destination") {
//           setDestinationInput(locationName);
//         } else if (searchType === "roadtrip") {
//           if (roadtripPinCount === 0) {
//             setStartingLocationInput(locationName);
//             setRoadtripPinCount(1);
//           } else {
//             setWhereToInput(locationName);
//             setRoadtripPinCount(0);
//             if (startingLocationInput && locationName && directionsService) {
//               calculateDirections(startingLocationInput, locationName);
//             }
//           }
//         }
//         setLocations([...locations, newLocation]);
//       }
//     });
//   };

//   const calculateDirections = (origin, destination) => {
//     if (!directionsService) return;
//     directionsService.route(
//       {
//         origin: origin,
//         destination: destination,
//         travelMode: window.google.maps.TravelMode.DRIVING,
//         provideRouteAlternatives: true,
//       },
//       (result, status) => {
//         if (status === window.google.maps.DirectionsStatus.OK) {
//           setDirections(result);
//           if (
//             result.routes &&
//             result.routes.length > 0 &&
//             result.routes[0].legs &&
//             result.routes[0].legs.length > 0
//           ) {
//             setDirectionsSteps(result.routes[0].legs[0].steps);
//             setCompletedSteps([]);
//           }
//         } else {
//           console.error(`Directions request failed: ${status}`);
//         }
//       }
//     );
//   };

//   useEffect(() => {
//     setDestinationInput("");
//     setStartingLocationInput("");
//     setWhereToInput("");
//     setRoadtripPinCount(0);
//     setDirectionsSteps([]);
//     setShowDirections(false);
//     setDirections(null);
//     setCompletedSteps([]);
//   }, [searchType]);

//   const handleMarkerDrag = (event, id) => {
//     const lat = event.latLng.lat();
//     const lng = event.latLng.lng();
//     setLocations((prevLocations) =>
//       prevLocations.map((loc) =>
//         loc.id === id ? { ...loc, lat: lat, lng: lng } : loc
//       )
//     );

//     const geocoder = new window.google.maps.Geocoder();
//     geocoder.geocode({ location: { lat, lng } }, (results, status) => {
//       if (status === "OK" && results[0]) {
//         const locationName = results[0].formatted_address;
//         setLocations((prevLocations) =>
//           prevLocations.map((loc) =>
//             loc.id === id ? { ...loc, name: locationName } : loc
//           )
//         );

//         const isLastDestinationMarker =
//           searchType === "destination" &&
//           id ===
//             Math.max(
//               ...locations
//                 .filter((loc) => loc.type === "user")
//                 .map((loc) => loc.id)
//             );
//         const isStartingLocationMarker =
//           searchType === "roadtrip" &&
//           id ===
//             Math.max(
//               ...locations
//                 .filter((loc) => loc.type === "user")
//                 .map((loc) => loc.id)
//             ) -
//               1;
//         const isWhereToMarker =
//           searchType === "roadtrip" &&
//           id ===
//             Math.max(
//               ...locations
//                 .filter((loc) => loc.type === "user")
//                 .map((loc) => loc.id)
//             );

//         if (isLastDestinationMarker) {
//           setDestinationInput(locationName);
//         } else if (isStartingLocationMarker) {
//           setStartingLocationInput(locationName);
//           if (locationName && whereToInput && directionsService) {
//             calculateDirections(locationName, whereToInput);
//           }
//         } else if (isWhereToMarker) {
//           setWhereToInput(locationName);
//           if (startingLocationInput && locationName && directionsService) {
//             calculateDirections(startingLocationInput, locationName);
//           }
//         }
//       }
//     });
//   };

//   const resetAllPins = () => {
//     const defaultLocations = [
//       ...(campsiteData?.payload || []).map((item, index) => ({
//         id: index + 1,
//         name: item.title,
//         lat: parseFloat(item.lat) || 36.6259,
//         lng: parseFloat(item.long) || -93.6485,
//         path: `/reservation-details/${item._id}`,
//         type: "campsite",
//       })),
//       ...(attractionData?.payload || []).map((item, index) => ({
//         id: (campsiteData?.payload?.length || 0) + index + 1,
//         name: item.title,
//         lat: parseFloat(item.lat) || 36.6259,
//         lng: parseFloat(item.long) || -93.6485,
//         path: `/attractions/${item._id}`,
//         type: "attraction",
//       })),
//       ...(adventureData?.payload || []).map((item, index) => ({
//         id:
//           (campsiteData?.payload?.length || 0) +
//           (attractionData?.payload?.length || 0) +
//           index +
//           1,
//         name: item.title,
//         lat: parseFloat(item.lat) || 36.6259,
//         lng: parseFloat(item.long) || -93.6485,
//         path: `/adventure-and-peace/${item._id}`,
//         type: "adventure",
//       })),
//     ];
//     setLocations(defaultLocations);
//     setDestinationInput("");
//     setStartingLocationInput("");
//     setWhereToInput("");
//     setRoadtripPinCount(0);
//     setDirections(null);
//     setDirectionsSteps([]);
//     setShowDirections(false);
//     setCompletedSteps([]);
//     setResetKey((prevKey) => prevKey + 1);
//   };

//   const showRemoveMarkerModal = (id) => {
//     const marker = locations.find(
//       (loc) => loc.id === id && loc.type === "user"
//     );
//     if (marker) {
//       setMarkerToRemove(marker);
//       setModalVisible(true);
//     }
//   };

//   const handleRemoveMarkerConfirm = () => {
//     if (markerToRemove) {
//       setLocations(locations.filter((loc) => loc.id !== markerToRemove.id));
//       if (
//         searchType === "destination" &&
//         destinationInput === markerToRemove.name
//       ) {
//         setDestinationInput("");
//       } else if (searchType === "roadtrip") {
//         if (startingLocationInput === markerToRemove.name) {
//           setStartingLocationInput("");
//           setDirections(null);
//           setDirectionsSteps([]);
//           setShowDirections(false);
//           setCompletedSteps([]);
//         } else if (whereToInput === markerToRemove.name) {
//           setWhereToInput("");
//           setDirections(null);
//           setDirectionsSteps([]);
//           setShowDirections(false);
//           setCompletedSteps([]);
//         }
//       }
//       setModalVisible(false);
//       setMarkerToRemove(null);
//     }
//   };

//   const handleRemoveMarkerCancel = () => {
//     setModalVisible(false);
//     setMarkerToRemove(null);
//   };

//   const toggleDirections = () => {
//     setDirectionsModalVisible(!directionsModalVisible);
//   };

//   const toggleStepCompletion = (index) => {
//     setCompletedSteps((prev) =>
//       prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
//     );
//   };

//   const markPreviousStepsCompleted = (index) => {
//     const newCompletedSteps = [];
//     for (let i = 0; i <= index; i++) {
//       if (!completedSteps.includes(i)) newCompletedSteps.push(i);
//     }
//     setCompletedSteps((prev) => [...prev, ...newCompletedSteps]);
//   };

//   const getMarkerIcon = (location) => {
//     if (location.type === "campsite") {
//       return "https://maps.google.com/mapfiles/ms/icons/green-dot.png"; // Green for RV Campsites
//     } else if (location.type === "attraction") {
//       return "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png"; // Yellow for Local Attractions
//     } else if (location.type === "adventure") {
//       return "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"; // Blue for Adventure and Peace
//     } else if (
//       searchType === "roadtrip" &&
//       location.name === startingLocationInput
//     ) {
//       return "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"; // Blue for roadtrip start
//     } else if (searchType === "roadtrip" && location.name === whereToInput) {
//       return "https://maps.google.com/mapfiles/ms/icons/red-dot.png"; // Red for roadtrip end
//     } else {
//       return "https://maps.google.com/mapfiles/ms/icons/purple-dot.png"; // Purple for user-added markers
//     }
//   };

//   const guestPopoverContent = (
//     <div className="p-2 w-64">
//       <div className="flex justify-between items-center py-2">
//         <div>
//           <div className="font-medium text-gray-800">ADULTS</div>
//           <div className="text-sm text-gray-600">Ages 13 or above</div>
//         </div>
//         <div className="flex items-center gap-3">
//           <button
//             className={`w-8 h-8 rounded-full flex items-center justify-center border ${
//               guests.adults > 0
//                 ? "border-gray-400 text-gray-600"
//                 : "border-gray-200 text-gray-300"
//             }`}
//             onClick={() => updateGuestCount("adults", -1)}
//             disabled={guests.adults === 0}
//           >
//             <MinusOutlined />
//           </button>
//           <span className="w-4 text-center">{guests.adults}</span>
//           <button
//             className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-400 text-gray-600"
//             onClick={() => updateGuestCount("adults", 1)}
//           >
//             <PlusOutlined />
//           </button>
//         </div>
//       </div>
//       <div className="border-t border-gray-200 my-2"></div>
//       <div className="flex justify-between items-center py-2">
//         <div>
//           <div className="font-medium text-gray-800">CHILDREN</div>
//           <div className="text-sm text-gray-600">Ages 12 or below</div>
//         </div>
//         <div className="flex items-center gap-3">
//           <button
//             className={`w-8 h-8 rounded-full flex items-center justify-center border ${
//               guests.children > 0
//                 ? "border-gray-400 text-gray-600"
//                 : "border-gray-200 text-gray-300"
//             }`}
//             onClick={() => updateGuestCount("children", -1)}
//             disabled={guests.children === 0}
//           >
//             <MinusOutlined />
//           </button>
//           <span className="w-4 text-center">{guests.children}</span>
//           <button
//             className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-400 text-gray-600"
//             onClick={() => updateGuestCount("children", 1)}
//           >
//             <PlusOutlined />
//           </button>
//         </div>
//       </div>
//       <div className="border-t border-gray-200 my-2"></div>
//       <div className="flex justify-between items-center py-2">
//         <div>
//           <div className="font-medium text-gray-800">Any pets?</div>
//         </div>
//         <div className="flex items-center gap-3">
//           <button
//             className={`w-8 h-8 rounded-full flex items-center justify-center border ${
//               guests.pets > 0
//                 ? "border-gray-400 text-gray-600"
//                 : "border-gray-200 text-gray-300"
//             }`}
//             onClick={() => updateGuestCount("pets", -1)}
//             disabled={guests.pets === 0}
//           >
//             <MinusOutlined />
//           </button>
//           <span className="w-4 text-center">{guests.pets}</span>
//           <button
//             className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-400 text-gray-600"
//             onClick={() => updateGuestCount("pets", 1)}
//           >
//             <PlusOutlined />
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   const drawerStyles = {
//     header: {
//       background: "#f9fafb",
//       borderBottom: "1px solid #e5e7eb",
//       padding: "16px 24px",
//     },
//     body: { padding: "0" },
//     mask: { backgroundColor: "rgba(0, 0, 0, 0.45)" },
//     content: {
//       boxShadow:
//         "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
//     },
//     wrapper: { borderRadius: "0" },
//   };

//   const { data: contactInformation, isLoading: contactInformationLoading } =
//     useGetContactQuery();
//   const contactInformationData = contactInformation?.payload[0];

//   const mapKey =
//     contactInformationData?.googleApiKey || import.meta.env.VITE_MAP_KEY;

//   return (
//     <div
//       className="z-50 w-full py-4 bg-cover bg-center"
//       style={{
//         backgroundImage:
//           'url("https://images.unsplash.com/photo-1515876305430-f06edab8282a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
//       }}
//     >
//       <div className="relative z-10 px-4 md:px-8 max-w-[1330px] mx-auto">
//         {contact ? (
//           <div className="flex flex-col md:flex-row items-start gap-4 max-w-7xl mx-auto bg-white/10 backdrop-blur-lg p-4 shadow-xl border border-white/20">
//             <div className="bg-gray-100 py-3 px-6 w-full">
//               <Breadcrumb separator="|">
//                 <Breadcrumb.Item>
//                   <Link to="/" className="text-gray-600 hover:text-yellow-500">
//                     Home
//                   </Link>
//                 </Breadcrumb.Item>
//                 <Breadcrumb.Item>
//                   <span className="text-yellow-500">Contact</span>
//                 </Breadcrumb.Item>
//               </Breadcrumb>
//             </div>
//           </div>
//         ) : (
//           <div className="items-start gap-4 mx-auto">
//             <div className="md:sticky top-18 z-[999] bg-white/10 backdrop-blur-lg p-4 shadow-xl border border-white/20">
//               <div className="flex gap-2 mb-4">
//                 <button
//                   className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
//                     searchType === "destination"
//                       ? "bg-gray-100 text-gray-800 shadow-md"
//                       : "bg-transparent text-white hover:bg-white/10"
//                   }`}
//                   onClick={() => setSearchType("destination")}
//                 >
//                   Destination
//                 </button>
//                 <div className="relative">
//                   <button
//                     className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
//                       searchType === "roadtrip"
//                         ? "bg-gray-100 text-gray-800 shadow-md"
//                         : "bg-transparent text-white hover:bg-white/10"
//                     }`}
//                     onClick={() => setSearchType("roadtrip")}
//                   >
//                     Roadtrip
//                   </button>
//                 </div>
//               </div>
//               <div className="flex flex-col md:flex-row gap-4">
//                 {searchType === "destination" ? (
//                   <div className="flex flex-col md:flex-row gap-4 flex-1">
//                     <div className="w-full">
//                       <Input
//                         placeholder="Search destinations"
//                         value={destinationInput}
//                         onChange={(e) => setDestinationInput(e.target.value)}
//                         prefix={
//                           <EnvironmentOutlined className="text-gray-400" />
//                         }
//                         className="h-12 border border-gray-300"
//                         style={{ borderRadius: 0 }}
//                       />
//                     </div>
//                     <div className="w-full">
//                       <RangePicker
//                         format={dateFormat}
//                         placeholder={["Add dates", ""]}
//                         separator="–"
//                         suffixIcon={
//                           <CalendarOutlined className="text-gray-400" />
//                         }
//                         className="h-12 border border-gray-300 w-full"
//                         style={{ borderRadius: 0 }}
//                         getPopupContainer={(trigger) => trigger.parentNode}
//                         renderExtraFooter={() => (
//                           <div className="text-xs text-gray-500 p-2">
//                             Select check-in and check-out dates
//                           </div>
//                         )}
//                       />
//                     </div>
//                     <div className="w-full">
//                       <Popover
//                         content={guestPopoverContent}
//                         trigger="click"
//                         open={guestPopoverVisible}
//                         onOpenChange={setGuestPopoverVisible}
//                         placement="bottomRight"
//                         overlayClassName="guest-popover"
//                         getPopupContainer={(trigger) => trigger.parentNode}
//                       >
//                         <Input
//                           ref={guestInputRef}
//                           placeholder="Add guests"
//                           value={
//                             totalGuests > 0
//                               ? `${totalGuests} guest${
//                                   totalGuests > 1 ? "s" : ""
//                                 }`
//                               : ""
//                           }
//                           prefix={<UserOutlined className="text-gray-400" />}
//                           className="h-12 border border-gray-300 cursor-pointer"
//                           style={{ borderRadius: 0 }}
//                           readOnly
//                           onClick={() =>
//                             setGuestPopoverVisible(!guestPopoverVisible)
//                           }
//                         />
//                       </Popover>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="flex flex-col md:flex-row gap-4 flex-1">
//                     <div className="w-full">
//                       <Input
//                         placeholder="Starting location"
//                         value={startingLocationInput}
//                         onChange={(e) => {
//                           setStartingLocationInput(e.target.value);
//                           if (
//                             e.target.value &&
//                             whereToInput &&
//                             directionsService
//                           ) {
//                             calculateDirections(e.target.value, whereToInput);
//                           }
//                         }}
//                         prefix={
//                           <EnvironmentOutlined className="text-gray-400" />
//                         }
//                         className="h-12 border border-gray-300"
//                         style={{ borderRadius: 0 }}
//                       />
//                     </div>
//                     <div className="w-full">
//                       <Input
//                         placeholder="Where to?"
//                         value={whereToInput}
//                         onChange={(e) => {
//                           setWhereToInput(e.target.value);
//                           if (
//                             startingLocationInput &&
//                             e.target.value &&
//                             directionsService
//                           ) {
//                             calculateDirections(
//                               startingLocationInput,
//                               e.target.value
//                             );
//                           }
//                         }}
//                         prefix={
//                           <EnvironmentOutlined className="text-gray-400" />
//                         }
//                         className="h-12 border border-gray-300"
//                         style={{ borderRadius: 0 }}
//                       />
//                     </div>
//                     <div className="w-full">
//                       <Popover
//                         content={guestPopoverContent}
//                         trigger="click"
//                         open={guestPopoverVisible}
//                         onOpenChange={setGuestPopoverVisible}
//                         placement="bottomRight"
//                         overlayClassName="guest-popover"
//                         getPopupContainer={(trigger) => trigger.parentNode}
//                       >
//                         <Input
//                           ref={guestInputRef}
//                           placeholder="Add guests"
//                           value={
//                             totalGuests > 0
//                               ? `${totalGuests} guest${
//                                   totalGuests > 1 ? "s" : ""
//                                 }`
//                               : ""
//                           }
//                           prefix={<UserOutlined className="text-gray-400" />}
//                           className="h-12 border border-gray-300 cursor-pointer"
//                           style={{ borderRadius: 0 }}
//                           readOnly
//                           onClick={() =>
//                             setGuestPopoverVisible(!guestPopoverVisible)
//                           }
//                         />
//                       </Popover>
//                     </div>
//                   </div>
//                 )}
//                 <div className="w-full md:w-auto">
//                   <button className="w-full bg-yellow-500 text-white px-6 py-3 flex items-center justify-center gap-2 hover:bg-yellow-600 transition-colors duration-300 h-12 text-base font-medium">
//                     Search <SearchOutlined />
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div className="mt-6 bg-white/10 backdrop-blur-lg p-4 shadow-xl border border-white/20">
//               <h3 className="text-white text-lg font-medium mb-3">
//                 Explore Our Location
//               </h3>
//               <LoadScript
//                 googleMapsApiKey={mapKey}
//                 onLoad={() => console.log("Script loaded successfully")}
//               >
//                 {mapLoaded || !contactInformationLoading ? (
//                   <GoogleMap
//                     key={resetKey}
//                     mapContainerStyle={mapContainerStyle}
//                     center={center}
//                     zoom={zoom}
//                     mapTypeId={mapType}
//                     options={{
//                       streetViewControl: false,
//                       fullscreenControl: true,
//                       zoomControl: true,
//                       mapTypeControl: true,
//                       draggableCursor: "pointer",
//                     }}
//                     onClick={handleMapClick}
//                     onLoad={onLoad}
//                   >
//                     {searchType === "roadtrip" && directions && (
//                       <DirectionsRenderer
//                         options={{
//                           directions: directions,
//                           suppressMarkers: false,
//                           polylineOptions: {
//                             strokeColor: "#4285F4",
//                             strokeWeight: 5,
//                             strokeOpacity: 0.8,
//                           },
//                         }}
//                       />
//                     )}
//                     {locations?.map((location) => (
//                       <Marker
//                         key={`${location.id}-${resetKey}`}
//                         position={{ lat: location.lat, lng: location.lng }}
//                         title={location.name}
//                         draggable={location.type === "user"} // Only user-added markers are draggable
//                         onDragEnd={(event) =>
//                           handleMarkerDrag(event, location.id)
//                         }
//                         onClick={() =>
//                           location.type === "user"
//                             ? showRemoveMarkerModal(location.id)
//                             : null
//                         }
//                         icon={{
//                           url: getMarkerIcon(location),
//                         }}
//                       >
//                         {location.path && (
//                           <Link to={location.path} className="marker-link" />
//                         )}
//                       </Marker>
//                     ))}
//                   </GoogleMap>
//                 ) : (
//                   <div className="w-full h-[500px] bg-gray-200 rounded-lg flex items-center justify-center shadow-lg">
//                     <p className="text-gray-600">
//                       <Spin />
//                     </p>
//                   </div>
//                 )}
//               </LoadScript>
//               <div className="flex justify-between flex-wrap gap-2 mt-3">
//                 <div className="flex gap-2">
//                   <button
//                     className={`px-3 py-1 text-xs rounded ${
//                       mapType === "roadmap"
//                         ? "bg-yellow-500 text-white"
//                         : "bg-white/50 text-gray-800"
//                     }`}
//                     onClick={() => setMapType("roadmap")}
//                   >
//                     Road
//                   </button>
//                   <button
//                     className={`px-3 py-1 text-xs rounded ${
//                       mapType === "satellite"
//                         ? "bg-yellow-500 text-white"
//                         : "bg-white/50 text-gray-800"
//                     }`}
//                     onClick={() => setMapType("satellite")}
//                   >
//                     Satellite
//                   </button>
//                   <button
//                     className={`px-3 py-1 text-xs rounded ${
//                       mapType === "terrain"
//                         ? "bg-yellow-500 text-white"
//                         : "bg-white/50 text-gray-800"
//                     }`}
//                     onClick={() => setMapType("terrain")}
//                   >
//                     Terrain
//                   </button>
//                   <button
//                     className="px-3 py-1 text-xs rounded bg-red-500 text-white"
//                     onClick={resetAllPins}
//                   >
//                     Reset Pins
//                   </button>
//                 </div>
//                 <div className="flex gap-2">
//                   <button
//                     className="px-3 py-1 text-xs rounded bg-white/50 text-gray-800"
//                     onClick={() => setZoom(Math.min(zoom + 1, 20))}
//                   >
//                     Zoom +
//                   </button>
//                   <button
//                     className="px-3 py-1 text-xs rounded bg-white/50 text-gray-800"
//                     onClick={() => setZoom(Math.max(zoom - 1, 1))}
//                   >
//                     Zoom -
//                   </button>
//                 </div>
//               </div>
//               <div className="mt-3 text-white/80 text-sm">
//                 <p>
//                   Click on the map to add a marker. Drag markers to reposition
//                   them. Click on a marker to remove it (user-added only).
//                 </p>
//                 <p className="mt-1">
//                   Explore RV campsites, local attractions, and adventure spots.
//                 </p>
//               </div>
//               {searchType === "roadtrip" && directionsSteps.length > 0 && (
//                 <div className="mt-4">
//                   <button
//                     onClick={toggleDirections}
//                     className="w-full bg-yellow-500 text-white px-4 py-2 flex items-center justify-center gap-2 hover:bg-yellow-600 transition-colors duration-300"
//                   >
//                     View Step-by-Step Directions
//                   </button>
//                 </div>
//               )}
//               <Drawer
//                 title={`Directions from ${startingLocationInput} to ${whereToInput}`}
//                 placement="right"
//                 onClose={() => setDirectionsModalVisible(false)}
//                 open={directionsModalVisible}
//                 width={800}
//                 className="directions-drawer"
//                 styles={drawerStyles}
//               >
//                 {directionsSteps.length > 0 && (
//                   <div className="directions-container">
//                     <div className="p-4 bg-gray-50 border-b border-gray-200">
//                       <div className="flex justify-between items-center">
//                         <h3 className="font-medium text-lg">
//                           Navigation Steps
//                         </h3>
//                         <button
//                           className="text-yellow-500 hover:text-yellow-600 text-sm font-medium"
//                           onClick={() => setCompletedSteps([])}
//                         >
//                           Reset Progress
//                         </button>
//                       </div>
//                     </div>
//                     <List
//                       size="large"
//                       dataSource={directionsSteps}
//                       className="directions-list"
//                       renderItem={(step, index) => (
//                         <List.Item
//                           className={`py-3 px-4 border-b border-gray-200 last:border-0 ${
//                             completedSteps.includes(index) ? "bg-yellow-50" : ""
//                           }`}
//                         >
//                           <div className="flex items-start gap-3 w-full">
//                             <div
//                               className={`${
//                                 completedSteps.includes(index)
//                                   ? "bg-yellow-500"
//                                   : "bg-gray-500"
//                               } text-white w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1`}
//                               style={{ borderRadius: 0 }}
//                             >
//                               {completedSteps.includes(index) ? (
//                                 <CheckOutlined />
//                               ) : (
//                                 index + 1
//                               )}
//                             </div>
//                             <div className="flex-1">
//                               <div
//                                 dangerouslySetInnerHTML={{
//                                   __html: step.instructions,
//                                 }}
//                                 className={`text-sm text-gray-700 ${
//                                   completedSteps.includes(index)
//                                     ? "line-through text-gray-500"
//                                     : ""
//                                 }`}
//                               />
//                               <div className="text-xs text-gray-500 mt-1">
//                                 {step.distance?.text} · {step.duration?.text}
//                               </div>
//                               <div className="mt-2 flex justify-between items-center">
//                                 <Checkbox
//                                   checked={completedSteps.includes(index)}
//                                   onChange={() => toggleStepCompletion(index)}
//                                   className="custom-checkbox"
//                                 >
//                                   <span className="text-xs">
//                                     Mark as completed
//                                   </span>
//                                 </Checkbox>
//                                 {index > 0 &&
//                                   !completedSteps.includes(index) && (
//                                     <button
//                                       onClick={() =>
//                                         markPreviousStepsCompleted(index - 1)
//                                       }
//                                       className="text-xs text-yellow-500 hover:text-yellow-600"
//                                     >
//                                       Complete previous steps
//                                     </button>
//                                   )}
//                               </div>
//                             </div>
//                           </div>
//                         </List.Item>
//                       )}
//                     />
//                     {directions?.routes[0]?.legs[0]?.distance &&
//                       directions?.routes[0]?.legs[0]?.duration && (
//                         <div className="p-4 border-t border-gray-300 bg-gray-50">
//                           <div className="font-medium text-base">
//                             Total Distance:{" "}
//                             {directions.routes[0].legs[0].distance.text}
//                           </div>
//                           <div className="font-medium text-base">
//                             Estimated Travel Time:{" "}
//                             {directions.routes[0].legs[0].duration.text}
//                           </div>
//                           <div className="mt-3">
//                             <div className="w-full bg-gray-200 h-2">
//                               <div
//                                 className="bg-yellow-500 h-2"
//                                 style={{
//                                   width: `${
//                                     completedSteps.length > 0
//                                       ? (completedSteps.length /
//                                           directionsSteps.length) *
//                                         100
//                                       : 0
//                                   }%`,
//                                 }}
//                               ></div>
//                             </div>
//                             <div className="text-sm text-gray-600 mt-1">
//                               {completedSteps.length} of{" "}
//                               {directionsSteps.length} steps completed
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                   </div>
//                 )}
//               </Drawer>
//             </div>
//           </div>
//         )}
//       </div>
//       <Modal
//         title="Remove Marker"
//         open={modalVisible}
//         onOk={handleRemoveMarkerConfirm}
//         onCancel={handleRemoveMarkerCancel}
//         okText="Remove"
//         cancelText="Cancel"
//         okButtonProps={{ danger: true }}
//       >
//         <p>
//           Are you sure you want to remove the marker at {markerToRemove?.name}?
//         </p>
//       </Modal>
//     </div>
//   );
// };

// export default SearchSection;
import { CheckOutlined, EnvironmentOutlined } from "@ant-design/icons";
import {
  DirectionsRenderer,
  GoogleMap,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import {
  Breadcrumb,
  Checkbox,
  Drawer,
  Input,
  List,
  message,
  Modal,
  Spin,
} from "antd";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetRvCampsitesQuery } from "../../services/api/pages/rvCampsitesSlice";
import { useGetContactQuery } from "../../services/api/settings/contactSlice";

const SearchSection = ({ contact = false }) => {
  const [searchType, setSearchType] = useState("destination");
  const [isSticky, setIsSticky] = useState(false);
  const [startingLocationInput, setStartingLocationInput] = useState("");
  const [whereToInput, setWhereToInput] = useState("");
  const [roadtripPinCount, setRoadtripPinCount] = useState(0);
  const [directionsService, setDirectionsService] = useState(null);
  const [directions, setDirections] = useState(null);
  const [directionsSteps, setDirectionsSteps] = useState([]);
  const [showDirections, setShowDirections] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [markerToRemove, setMarkerToRemove] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [map, setMap] = useState(null);
  const [zoom, setZoom] = useState(10);
  const [mapType, setMapType] = useState("terrain");
  const [destinationInput, setDestinationInput] = useState("");

  const { data: campsiteData, isLoading: campsiteLoading } =
    useGetRvCampsitesQuery();

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const combinedLocations = [
      ...(campsiteData?.payload || []).map((item, index) => ({
        id: index + 1,
        name: item.title,
        lat: parseFloat(item.lat) || 36.6259,
        lng: parseFloat(item.long) || -93.6485,
        path: `/reservation-details/${item._id}`,
        type: "campsite",
      })),
    ];
    setLocations(combinedLocations);
  }, [campsiteData]);

  const [resetKey, setResetKey] = useState(0);
  const [directionsModalVisible, setDirectionsModalVisible] = useState(false);

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "8px",
    overflow: "hidden",
  };

  const center = {
    lat: 36.6084,
    lng: -93.617378,
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onLoad = useCallback((map) => {
    setMapLoaded(true);
    setMap(map);
    if (window.google) {
      setDirectionsService(new window.google.maps.DirectionsService());
    }
  }, []);

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const newLocation = {
      id: locations.length + 1,
      name: `New Location ${locations.length + 1}`,
      lat: lat,
      lng: lng,
      path: `/attractions/new-location-${locations.length + 1}`,
      type: "user",
    };

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results[0]) {
        const locationName = results[0].formatted_address;
        newLocation.name = locationName;

        if (searchType === "destination") {
          setDestinationInput(locationName);
        } else if (searchType === "roadtrip") {
          if (roadtripPinCount === 0) {
            setStartingLocationInput(locationName);
            setRoadtripPinCount(1);
          } else {
            setWhereToInput(locationName);
            setRoadtripPinCount(0);
            if (startingLocationInput && locationName && directionsService) {
              calculateDirections(startingLocationInput, locationName);
            }
          }
        }
        setLocations([...locations, newLocation]);
      }
    });
  };

  const calculateDirections = (origin, destination) => {
    if (!directionsService) return;
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
          if (
            result.routes &&
            result.routes.length > 0 &&
            result.routes[0].legs &&
            result.routes[0].legs.length > 0
          ) {
            setDirectionsSteps(result.routes[0].legs[0].steps);
            setCompletedSteps([]);
          }
        } else {
          message.error(`Directions request failed: ${status}`);
        }
      }
    );
  };

  useEffect(() => {
    setDestinationInput("");
    setStartingLocationInput("");
    setWhereToInput("");
    setRoadtripPinCount(0);
    setDirectionsSteps([]);
    setShowDirections(false);
    setDirections(null);
    setCompletedSteps([]);
  }, [searchType]);

  const handleMarkerDrag = (event, id) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setLocations((prevLocations) =>
      prevLocations.map((loc) =>
        loc.id === id ? { ...loc, lat: lat, lng: lng } : loc
      )
    );

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results[0]) {
        const locationName = results[0].formatted_address;
        setLocations((prevLocations) =>
          prevLocations.map((loc) =>
            loc.id === id ? { ...loc, name: locationName } : loc
          )
        );

        const isLastDestinationMarker =
          searchType === "destination" &&
          id ===
            Math.max(
              ...locations
                .filter((loc) => loc.type === "user")
                .map((loc) => loc.id)
            );
        const isStartingLocationMarker =
          searchType === "roadtrip" &&
          id ===
            Math.max(
              ...locations
                .filter((loc) => loc.type === "user")
                .map((loc) => loc.id)
            ) -
              1;
        const isWhereToMarker =
          searchType === "roadtrip" &&
          id ===
            Math.max(
              ...locations
                .filter((loc) => loc.type === "user")
                .map((loc) => loc.id)
            );

        if (isLastDestinationMarker) {
          setDestinationInput(locationName);
        } else if (isStartingLocationMarker) {
          setStartingLocationInput(locationName);
          if (locationName && whereToInput && directionsService) {
            calculateDirections(locationName, whereToInput);
          }
        } else if (isWhereToMarker) {
          setWhereToInput(locationName);
          if (startingLocationInput && locationName && directionsService) {
            calculateDirections(startingLocationInput, locationName);
          }
        }
      }
    });
  };

  const resetAllPins = () => {
    const defaultLocations = [
      ...(campsiteData?.payload || []).map((item, index) => ({
        id: index + 1,
        name: item.title,
        lat: parseFloat(item.lat) || 36.6259,
        lng: parseFloat(item.long) || -93.6485,
        path: `/reservation-details/${item._id}`,
        type: "campsite",
      })),
    ];
    setLocations(defaultLocations);
    setDestinationInput("");
    setStartingLocationInput("");
    setWhereToInput("");
    setRoadtripPinCount(0);
    setDirections(null);
    setDirectionsSteps([]);
    setShowDirections(false);
    setCompletedSteps([]);
    setResetKey((prevKey) => prevKey + 1);
  };

  const showRemoveMarkerModal = (id) => {
    const marker = locations.find(
      (loc) => loc.id === id && loc.type === "user"
    );
    if (marker) {
      setMarkerToRemove(marker);
      setModalVisible(true);
    }
  };

  const handleRemoveMarkerConfirm = () => {
    if (markerToRemove) {
      setLocations(locations.filter((loc) => loc.id !== markerToRemove.id));
      if (
        searchType === "destination" &&
        destinationInput === markerToRemove.name
      ) {
        setDestinationInput("");
      } else if (searchType === "roadtrip") {
        if (startingLocationInput === markerToRemove.name) {
          setStartingLocationInput("");
          setDirections(null);
          setDirectionsSteps([]);
          setShowDirections(false);
          setCompletedSteps([]);
        } else if (whereToInput === markerToRemove.name) {
          setWhereToInput("");
          setDirections(null);
          setDirectionsSteps([]);
          setShowDirections(false);
          setCompletedSteps([]);
        }
      }
      setModalVisible(false);
      setMarkerToRemove(null);
    }
  };

  const handleRemoveMarkerCancel = () => {
    setModalVisible(false);
    setMarkerToRemove(null);
  };

  const toggleDirections = () => {
    setDirectionsModalVisible(!directionsModalVisible);
  };

  const toggleStepCompletion = (index) => {
    setCompletedSteps((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const markPreviousStepsCompleted = (index) => {
    const newCompletedSteps = [];
    for (let i = 0; i <= index; i++) {
      if (!completedSteps.includes(i)) newCompletedSteps.push(i);
    }
    setCompletedSteps((prev) => [...prev, ...newCompletedSteps]);
  };

  const getMarkerIcon = (location) => {
    if (location.type === "campsite") {
      return "https://maps.google.com/mapfiles/ms/icons/green-dot.png";
    } else if (
      searchType === "roadtrip" &&
      location.name === startingLocationInput
    ) {
      return "https://maps.google.com/mapfiles/ms/icons/blue-dot.png";
    } else if (searchType === "roadtrip" && location.name === whereToInput) {
      return "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
    } else {
      return "https://maps.google.com/mapfiles/ms/icons/purple-dot.png";
    }
  };

  const drawerStyles = {
    header: {
      background: "#f9fafb",
      borderBottom: "1px solid #e5e7eb",
      padding: "16px 24px",
    },
    body: { padding: "0" },
    mask: { backgroundColor: "rgba(0, 0, 0, 0.45)" },
    content: {
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    },
    wrapper: { borderRadius: "0" },
  };

  const { data: contactInformation, isLoading: contactInformationLoading } =
    useGetContactQuery();
  const contactInformationData = contactInformation?.payload[0];

  const mapKey =
    contactInformationData?.googleApiKey || import.meta.env.VITE_MAP_KEY;

  return (
    <div
      className="z-50 w-full py-4 bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1515876305430-f06edab8282a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      }}
    >
      <div className="relative z-10 px-4 md:px-8 max-w-[1330px] mx-auto">
        {contact ? (
          <div className="flex flex-col md:flex-row items-start gap-4 max-w-7xl mx-auto bg-white/10 backdrop-blur-lg p-4 shadow-xl border border-white/20">
            <div className="bg-gray-100 py-3 px-6 w-full">
              <Breadcrumb separator="|">
                <Breadcrumb.Item>
                  <Link to="/" className="text-gray-600 hover:text-yellow-500">
                    Home
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <span className="text-yellow-500">Contact</span>
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
        ) : (
          <div className="items-start gap-4 mx-auto">
            <div className="md:sticky top-18 z-[999] bg-white/10 backdrop-blur-lg p-4 shadow-xl border border-white/20">
              <div className="flex gap-2 mb-4">
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    searchType === "destination"
                      ? "bg-gray-100 !text-gray-800 shadow-md"
                      : "bg-transparent !text-white hover:bg-white/10"
                  }`}
                  onClick={() => setSearchType("destination")}
                >
                  Destination
                </button>
                <div className="relative">
                  <button
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      searchType === "roadtrip"
                        ? "bg-gray-100 !text-gray-800 shadow-md"
                        : "bg-transparent !text-white hover:bg-white/10"
                    }`}
                    onClick={() => setSearchType("roadtrip")}
                  >
                    Roadtrip
                  </button>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                {searchType === "destination" ? (
                  <div className="flex flex-col md:flex-row gap-4 flex-1">
                    <div className="w-full">
                      <Input
                        placeholder="Destinations"
                        value={destinationInput}
                        onChange={(e) => setDestinationInput(e.target.value)}
                        prefix={
                          <EnvironmentOutlined className="text-gray-400" />
                        }
                        className="h-12 border border-gray-300"
                        style={{ borderRadius: 0 }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row gap-4 flex-1">
                    <div className="w-full">
                      <Input
                        placeholder="Starting location"
                        value={startingLocationInput}
                        onChange={(e) => {
                          setStartingLocationInput(e.target.value);
                          if (
                            e.target.value &&
                            whereToInput &&
                            directionsService
                          ) {
                            calculateDirections(e.target.value, whereToInput);
                          }
                        }}
                        prefix={
                          <EnvironmentOutlined className="text-gray-400" />
                        }
                        className="h-12 border border-gray-300"
                        style={{ borderRadius: 0 }}
                      />
                    </div>
                    <div className="w-full">
                      <Input
                        placeholder="Where to?"
                        value={whereToInput}
                        onChange={(e) => {
                          setWhereToInput(e.target.value);
                          if (
                            startingLocationInput &&
                            e.target.value &&
                            directionsService
                          ) {
                            calculateDirections(
                              startingLocationInput,
                              e.target.value
                            );
                          }
                        }}
                        prefix={
                          <EnvironmentOutlined className="text-gray-400" />
                        }
                        className="h-12 border border-gray-300"
                        style={{ borderRadius: 0 }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-6 bg-white/10 backdrop-blur-lg p-4 shadow-xl border border-white/20">
              <h3 className="text-white text-lg font-medium mb-3">
                Explore Our Location
              </h3>
              <LoadScript
                googleMapsApiKey={mapKey}
                onLoad={() => console.log("Script loaded successfully")}
              >
                {mapLoaded || !contactInformationLoading ? (
                  <GoogleMap
                    key={resetKey}
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={zoom}
                    mapTypeId={mapType}
                    options={{
                      streetViewControl: false,
                      fullscreenControl: true,
                      zoomControl: true,
                      mapTypeControl: false,
                      draggableCursor: "pointer",
                    }}
                    onClick={handleMapClick}
                    onLoad={onLoad}
                  >
                    {searchType === "roadtrip" && directions && (
                      <DirectionsRenderer
                        options={{
                          directions: directions,
                          suppressMarkers: false,
                          polylineOptions: {
                            strokeColor: "#4285F4",
                            strokeWeight: 5,
                            strokeOpacity: 0.8,
                          },
                        }}
                      />
                    )}
                    {locations?.map((location) => (
                      <Marker
                        key={`${location.id}-${resetKey}`}
                        position={{ lat: location.lat, lng: location.lng }}
                        title={location.name}
                        draggable={location.type === "user"}
                        onDragEnd={(event) =>
                          handleMarkerDrag(event, location.id)
                        }
                        onClick={() =>
                          location.type === "user"
                            ? showRemoveMarkerModal(location.id)
                            : null
                        }
                        icon={{
                          url: getMarkerIcon(location),
                        }}
                      >
                        {location.path && (
                          <Link to={location.path} className="marker-link" />
                        )}
                      </Marker>
                    ))}
                  </GoogleMap>
                ) : (
                  <div className="w-full h-[500px] bg-gray-200 rounded-lg flex items-center justify-center shadow-lg">
                    <p className="text-gray-600">
                      <Spin />
                    </p>
                  </div>
                )}
              </LoadScript>
              <div className="flex justify-between flex-wrap gap-2 mt-3">
                <div className="flex gap-2">
                  <button
                    className={`px-3 py-1 text-xs rounded ${
                      mapType === "roadmap"
                        ? "bg-yellow-500 text-white"
                        : "bg-white/50 text-gray-800"
                    }`}
                    onClick={() => setMapType("roadmap")}
                  >
                    Road
                  </button>
                  <button
                    className={`px-3 py-1 text-xs rounded ${
                      mapType === "satellite"
                        ? "bg-yellow-500 text-white"
                        : "bg-white/50 text-gray-800"
                    }`}
                    onClick={() => setMapType("satellite")}
                  >
                    Satellite
                  </button>
                  <button
                    className={`px-3 py-1 text-xs rounded ${
                      mapType === "terrain"
                        ? "bg-yellow-500 text-white"
                        : "bg-white/50 text-gray-800"
                    }`}
                    onClick={() => setMapType("terrain")}
                  >
                    Terrain
                  </button>
                  <button
                    className="px-3 py-1 text-xs rounded bg-red-500 text-white"
                    onClick={resetAllPins}
                  >
                    Reset Pins
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 text-xs rounded bg-white/50 text-gray-800"
                    onClick={() => setZoom(Math.min(zoom + 1, 20))}
                  >
                    Zoom +
                  </button>
                  <button
                    className="px-3 py-1 text-xs rounded bg-white/50 text-gray-800"
                    onClick={() => setZoom(Math.max(zoom - 1, 1))}
                  >
                    Zoom -
                  </button>
                </div>
              </div>
              {/* <div className="mt-3 text-white/80 text-sm">
                <p>
                  Click on the map to add a marker. Drag markers to reposition
                  them. Click on a marker to remove it (user-added only).
                </p>
                <p className="mt-1">
                  Explore RV campsites, local attractions, and adventure spots.
                </p>
              </div> */}
              {searchType === "roadtrip" && directionsSteps.length > 0 && (
                <div className="mt-4">
                  <button
                    onClick={toggleDirections}
                    className="w-full bg-yellow-500 text-white px-4 py-2 flex items-center justify-center gap-2 hover:bg-yellow-600 transition-colors duration-300"
                  >
                    View Step-by-Step Directions
                  </button>
                </div>
              )}
              <Drawer
                title={`Directions from ${startingLocationInput} to ${whereToInput}`}
                placement="right"
                onClose={() => setDirectionsModalVisible(false)}
                open={directionsModalVisible}
                width={800}
                className="directions-drawer"
                styles={drawerStyles}
              >
                {directionsSteps.length > 0 && (
                  <div className="directions-container">
                    <div className="p-4 bg-gray-50 border-b border-gray-200">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-lg">
                          Navigation Steps
                        </h3>
                        <button
                          className="text-yellow-500 hover:text-yellow-600 text-sm font-medium"
                          onClick={() => setCompletedSteps([])}
                        >
                          Reset Progress
                        </button>
                      </div>
                    </div>
                    <List
                      size="large"
                      dataSource={directionsSteps}
                      className="directions-list"
                      renderItem={(step, index) => (
                        <List.Item
                          className={`py-3 px-4 border-b border-gray-200 last:border-0 ${
                            completedSteps.includes(index) ? "bg-yellow-50" : ""
                          }`}
                        >
                          <div className="flex items-start gap-3 w-full">
                            <div
                              className={`${
                                completedSteps.includes(index)
                                  ? "bg-yellow-500"
                                  : "bg-gray-500"
                              } text-white w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1`}
                              style={{ borderRadius: 0 }}
                            >
                              {completedSteps.includes(index) ? (
                                <CheckOutlined />
                              ) : (
                                index + 1
                              )}
                            </div>
                            <div className="flex-1">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: step.instructions,
                                }}
                                className={`text-sm text-gray-700 ${
                                  completedSteps.includes(index)
                                    ? "line-through text-gray-500"
                                    : ""
                                }`}
                              />
                              <div className="text-xs text-gray-500 mt-1">
                                {step.distance?.text} · {step.duration?.text}
                              </div>
                              <div className="mt-2 flex justify-between items-center">
                                <Checkbox
                                  checked={completedSteps.includes(index)}
                                  onChange={() => toggleStepCompletion(index)}
                                  className="custom-checkbox"
                                >
                                  <span className="text-xs">
                                    Mark as completed
                                  </span>
                                </Checkbox>
                                {index > 0 &&
                                  !completedSteps.includes(index) && (
                                    <button
                                      onClick={() =>
                                        markPreviousStepsCompleted(index - 1)
                                      }
                                      className="text-xs text-yellow-500 hover:text-yellow-600"
                                    >
                                      Complete previous steps
                                    </button>
                                  )}
                              </div>
                            </div>
                          </div>
                        </List.Item>
                      )}
                    />
                    {directions?.routes[0]?.legs[0]?.distance &&
                      directions?.routes[0]?.legs[0]?.duration && (
                        <div className="p-4 border-t border-gray-300 bg-gray-50">
                          <div className="font-medium text-base">
                            Total Distance:{" "}
                            {directions.routes[0].legs[0].distance.text}
                          </div>
                          <div className="font-medium text-base">
                            Estimated Travel Time:{" "}
                            {directions.routes[0].legs[0].duration.text}
                          </div>
                          <div className="mt-3">
                            <div className="w-full bg-gray-200 h-2">
                              <div
                                className="bg-yellow-500 h-2"
                                style={{
                                  width: `${
                                    completedSteps.length > 0
                                      ? (completedSteps.length /
                                          directionsSteps.length) *
                                        100
                                      : 0
                                  }%`,
                                }}
                              ></div>
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              {completedSteps.length} of{" "}
                              {directionsSteps.length} steps completed
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                )}
              </Drawer>
            </div>
          </div>
        )}
      </div>
      <Modal
        title="Remove Marker"
        open={modalVisible}
        onOk={handleRemoveMarkerConfirm}
        onCancel={handleRemoveMarkerCancel}
        okText="Remove"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <p>
          Are you sure you want to remove the marker at {markerToRemove?.name}?
        </p>
      </Modal>
    </div>
  );
};

export default SearchSection;
