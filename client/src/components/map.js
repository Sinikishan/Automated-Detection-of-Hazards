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
  const [imgsrc, setImgsrc] = useState("");
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
            id: "general",
            type: "raster",
            source: "general",
            minzoom: 0,
            maxzoom: 10,
            layout: { visibility: "visible" },
          },
          {
            id: "population",
            type: "raster",
            source: "population",
            minzoom: 0,
            maxzoom: 10,
            layout: { visibility: "none" },
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

    var marker = [
      new mapboxgl.Marker().setLngLat([12.550343, 55.665957]),
      new mapboxgl.Marker().setLngLat([12.550343, 65.665957]),
    ];
    marker.forEach((mark) => mark.addTo(map));
    // Clean up on unmount

    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getPic = () => {
    // var linkSource = map.getCanvas().toDataURL();
    // // setImgsrc(map.getCanvas().toDataURL("images/png"));
    // // window.open(map.getCanvas().toDataURL("image/jpeg"));
    // const downloadLink = document.createElement("a");
    // downloadLink.href = linkSource;
    // downloadLink.download = "a.png";
    // downloadLink.click();
    var a =
      "https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/-77.03968,38.89744,5,0/300x200?addlayer={%22id%22:%22general%22,%22type%22:%22raster%22,%22source-layer%22:%22water%22,%22source%22:{%22type%22:%22raster%22,%22tiles%22:[%22//gibs-a.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/2020-10-03/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg%22,%22//gibs-b.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/2020-10-03/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg%22,%22//gibs-c.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/2020-10-03/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg%22],%22tileSize%22:256},%22minzoom%22:0,%22maxzoom%22:10,%22layout%22:{%22visibility%22:%22visible%22}}&access_token=pk.eyJ1IjoidGVhbWFudHJpa3NoIiwiYSI6ImNrZnQ3dHUxNjBwMjQycXBkNTB6Y2NidXYifQ.bJUa4zjIUDITAZLgc8hz2A";
    window.open(a);
  };

  return (
    <>
      <section style={{ height: "75vh", position: "relative" }}>
        <div className="sidebarStyle">
          <div>
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            <button onClick={getPic}>Pic</button>
          </div>
        </div>
        <div className="map-container" ref={mapContainerRef} />
      </section>
      {/* <img src={imgsrc} /> */}
    </>
  );
};

export default Map;
