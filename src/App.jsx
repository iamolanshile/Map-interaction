// App.js
import { useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import * as turf from "@turf/turf";

function App() {
  const [geoJSON, setGeoJSON] = useState(null);

  const handleDrawCreated = (e) => {
    const layer = e.layer.toGeoJSON();
    const convertedGeoJSON = turf.flip(layer); // Convert GeoJSON if necessary
    setGeoJSON(convertedGeoJSON);
  };

  return (
    <div className="App">
      <h1>Draw a Polygon</h1>
      <MapContainer
        center={[0, 0]}
        zoom={2}
        style={{ height: "400px", width: "80%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <DrawControl onCreated={handleDrawCreated} />
      </MapContainer>
      {geoJSON && (
        <div>
          <h2>GeoJSON:</h2>
          <pre>{JSON.stringify(geoJSON, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

function DrawControl({ onCreated }) {
  const map = useMapEvents({
    draw: (e) => {
      onCreated(e);
    },
  });

  return (
    <EditControl
      position="topright"
      draw={{
        circle: false,
        circlemarker: false,
        marker: false,
        polyline: false,
        polygon: {
          allowIntersection: false,
          drawError: {
            color: "#e1e100", // Color the shape will turn when intersects
            message: "<strong>Error:</strong> Shape cannot intersect itself", // Message that will show when intersect
          },
          shapeOptions: {
            color: "#97009c",
          },
        },
      }}
    />
  );
}

export default App;
