import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";

var date = new Date().toISOString().slice(0, 10);
var tilePathPopulation = `wmts/epsg3857/best/GPW_Population_Density_2020/default/${date}/GoogleMapsCompatible_Level7/{z}/{y}/{x}.png`;
var tilePathGeneral = `wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/${date}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`;
mapboxgl.accessToken =
  "pk.eyJ1IjoidGVhbWFudHJpa3NoIiwiYSI6ImNrZnQ3dHUxNjBwMjQycXBkNTB6Y2NidXYifQ.bJUa4zjIUDITAZLgc8hz2A";

const Map = () => {
  const mapContainerRef = useRef(null);
  let map;
  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);

  // Initialize map when component mounts
  useEffect(() => {
    map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: {
        version: 8,
        sources: {
          general: {
            type: "raster",
            tiles: [
              "//gibs-a.earthdata.nasa.gov/" + tilePathGeneral,
              "//gibs-b.earthdata.nasa.gov/" + tilePathGeneral,
              "//gibs-c.earthdata.nasa.gov/" + tilePathGeneral,
            ],
            tileSize: 256,
          },
          population: {
            type: "raster",
            tiles: [
              "//gibs-a.earthdata.nasa.gov/" + tilePathPopulation,
              "//gibs-b.earthdata.nasa.gov/" + tilePathPopulation,
              "//gibs-c.earthdata.nasa.gov/" + tilePathPopulation,
            ],
            tileSize: 256,
          },
        },
        layers: [
          {
            id: "population",
            type: "raster",
            source: "population",
            minzoom: 0,
            maxzoom: 10,
          },
          {
            id: "general",
            type: "raster",
            source: "general",
            minzoom: 0,
            maxzoom: 10,
          },
        ],
      },
      center: [lng, lat],
      zoom: zoom,
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getPic = () => {
    console.log(map.getCanvas().toDataURL("images/png"));
    // window.open(map.getCanvas().toDataURL("image/jpeg"));
  };

  return (
    <div style={{ maxHeight: "50vh" }}>
      <div className="sidebarStyle">
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          <button onClick={getPic}>Pic</button>
        </div>
      </div>
      <div className="map-container" ref={mapContainerRef} />
    </div>
  );
};

export default Map;
