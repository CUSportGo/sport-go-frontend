import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import React from "react";
import { useState } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const MapComponent = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
  });

  const [map, setMap] = React.useState(null);
  const [selectedLocation, setSelectedLocation] =
    useState<google.maps.LatLngLiteral | null>(null);

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setSelectedLocation({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });
    }
    console.log(e.latLng?.lat());
    console.log(e.latLng?.lng());
    console.log(selectedLocation);
    
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onClick={handleMapClick}
    >
      {selectedLocation && (
        <Marker
          position={selectedLocation}
          onClick={() => setSelectedLocation(null)}
        />
      )}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default MapComponent;
