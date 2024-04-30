import { useState } from "react";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import axios from "axios";

const MapComponent = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [polygonData, setPolygonData] = useState(null);

  const handleMapClick = (e) => {
    const { latlng } = e;
    setCoordinates([...coordinates, [latlng.lat, latlng.lng]]);
  };

  const handlePolygonDrawn = () => {
    const geoJSONData = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [coordinates],
      },
    };
    setPolygonData(JSON.stringify(geoJSONData, null, 2));
    savePolygonData(geoJSONData);
  };

  const savePolygonData = async (data) => {
    try {
      const response = await axios.post("/api/polygons", data);
      console.log(response.data);
    } catch (error) {
      console.error("Error saving polygon data:", error);
    }
  };

  return (
    <div>
      <MapContainer
        center={[8.4811, 4.6114]}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
        onClick={handleMapClick}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {coordinates.length > 0 && <Polygon positions={coordinates} />}
      </MapContainer>
      {polygonData && (
        <div>
          <h2>GeoJSON Data:</h2>
          <pre>{polygonData}</pre>
        </div>
      )}
      <button onClick={handlePolygonDrawn}>Save Polygon</button>
    </div>
  );
};

export  {MapComponent};
