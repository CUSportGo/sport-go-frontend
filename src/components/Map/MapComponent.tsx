import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import React, { useEffect } from "react";
import { useState } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

interface MapComponentProps {
  centerPoint?: { lat: number; lng: number };
  selectedLocation: google.maps.LatLngLiteral | null;
  handleLocationChange: (newLocation: google.maps.LatLngLiteral | null) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({
  centerPoint,
  selectedLocation,
  handleLocationChange,
}) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
  });

  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState(centerPoint);

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      handleLocationChange({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });
    }
  };

  const handleMapLoad = (map: google.maps.Map) => {
    // This function is called when the map has loaded.
    setMap(map);
  };

  useEffect(() => {
    const fetchSportArea = async () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async function (position) {
            setCenter({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          function (error) {
            console.error("Error getting geolocation:", error);
          }
        );
      } else {
        alert("Geolocation is not supported by this browser");
      }
    };
    fetchSportArea();
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onLoad={handleMapLoad}
      onClick={handleMapClick}
    >
      {selectedLocation && (
        <Marker
          position={selectedLocation}
          onClick={() => handleLocationChange(null)}
        />
      )}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default MapComponent;
