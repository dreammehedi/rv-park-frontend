import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Spin } from "antd";
import React, { useCallback, useState } from "react";
import { useGetContactQuery } from "../../services/api/settings/contactSlice";

const MapSection = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [zoom, setZoom] = useState(10);
  const [mapType, setMapType] = useState("terrain");
  const [locations, setLocations] = useState([
    { id: 1, name: "Lakeside Haven", lat: 37.75, lng: -119.4 },
    { id: 2, name: "Pine Retreat", lat: 37.78, lng: -119.45 },
    { id: 3, name: "Mountain View", lat: 37.77, lng: -119.38 },
  ]);

  const mapContainerStyle = {
    width: "100%",
    height: "500px",
    borderRadius: "12px",
    overflow: "hidden",
  };

  // Center near Yosemite National Park
  const center = {
    lat: 37.7749,
    lng: -119.4194,
  };
  const { data: contactInformation, isLoading: contactInformationLoading } =
    useGetContactQuery();
  const contactInformationData = contactInformation?.payload[0];

  const mapKey =
    contactInformationData?.googleApiKey || import.meta.env.VITE_MAP_KEY;

  // Callback when the map script is loaded
  const onLoad = useCallback(() => {
    setMapLoaded(true);
  }, []);

  // Function to handle map clicks (add a new marker)
  const handleMapClick = (event) => {
    const newLocation = {
      id: locations.length + 1,
      name: `New Location ${locations.length + 1}`,
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setLocations([...locations, newLocation]);
  };

  // Function to handle marker drag event
  const handleMarkerDrag = (event, id) => {
    setLocations((prevLocations) =>
      prevLocations.map((loc) =>
        loc.id === id
          ? { ...loc, lat: event.latLng.lat(), lng: event.latLng.lng() }
          : loc
      )
    );
  };

  return (
    <div className="py-16 px-4 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Map */}
        <LoadScript googleMapsApiKey={mapKey} onLoad={onLoad}>
          {mapLoaded || !contactInformationLoading ? (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={zoom}
              mapTypeId={mapType}
              options={{
                streetViewControl: false,
                fullscreenControl: true,
                zoomControl: true,
                mapTypeControl: true,
                draggableCursor: "pointer",
              }}
              onClick={handleMapClick} // Click to add marker
            >
              {locations.map((location) => (
                <Marker
                  key={location.id}
                  position={{ lat: location.lat, lng: location.lng }}
                  title={location.name}
                  draggable={true} // Allow marker dragging
                  onDragEnd={(event) => handleMarkerDrag(event, location.id)}
                  icon={{
                    url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
                  }}
                />
              ))}
            </GoogleMap>
          ) : (
            <div className="w-full h-[500px] bg-gray-200 rounded-lg flex items-center justify-center shadow-lg">
              <p className="text-gray-600">
                {" "}
                <Spin />
              </p>
            </div>
          )}
        </LoadScript>
      </div>
    </div>
  );
};

export default MapSection;
