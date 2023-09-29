import { FeatureCollection } from "geojson";
import { useEffect, useState } from "react";
import ReactMap, { Layer, Source } from "react-map-gl";
import styles from "./map.module.scss";
import { environment } from "src/environment/environment";

const geojsonSources = [
  "geojson/20230620-130226.geojson",
  "geojson/altonvale-pit.geojson",
  "geojson/oftr-trails.geojson",
];

export type BaseLayer = "quebec" | "ontario";

/* eslint-disable-next-line */
export interface MapProps {
  baseLayer: BaseLayer;
}

export function Map({ baseLayer }: MapProps) {
  const [geojsonData, setGeojsonData] = useState<FeatureCollection[]>([]);

  const [geojsonFqmhr, setGeojsonFqmhr] = useState<FeatureCollection | null>(
    null
  );

  useEffect(() => {
    fetch(environment.deployedPath + "geojson/result.geojson")
      .then((response) => response.json())
      .then((data) => {
        setGeojsonFqmhr(data);
      });

    for (const source of geojsonSources) {
      fetch(environment.deployedPath + source)
        .then((response) => response.json())
        .then((data) => {
          setGeojsonData((oldValue) => {
            return [...oldValue, data];
          });
        });
    }
  }, []);

  return (
    <div className={styles.container}>
      <ReactMap
        mapboxAccessToken="pk.eyJ1IjoiZG9taW5pY2FsaWUiLCJhIjoiY2tuZzJ0YWtvMDcwejJxczlwa2NtbW0zeSJ9.ire3NMM19l7z4Zeqa20RVw"
        initialViewState={{
          longitude: -75.7624005,
          latitude: 45.8936361,
          zoom: 8,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/dominicalie/cljkg5jdf00e401qph1m71f1n"
      >
        <Source
          id="ontario-sat-source"
          type="raster"
          tileSize={256}
          tiles={[
            "https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/WMTS/tile/1.0.0/World_Imagery/default/GoogleMapsCompatible/{z}/{y}/{x}.jpg?",
          ]}
        >
          {baseLayer === "ontario" && (
            <Layer
              beforeId="fqmhr"
              id="ontario-sat"
              type="raster"
              source="ontario-sat-source"
              paint={{
                "raster-opacity": 1,
              }}
            />
          )}
        </Source>
        <Source
          id="quebec-sat-source"
          type="raster"
          tileSize={256}
          tiles={[
            "https://servicesmatriciels.mern.gouv.qc.ca/erdas-iws/ogc/wmts/Imagerie_Continue/Imagerie_GQ/default/GoogleMapsCompatibleExt2:epsg:3857/{z}/{y}/{x}.jpg",
          ]}
        >
          {baseLayer === "quebec" && (
            <Layer
              beforeId="fqmhr"
              id="quebec-sat"
              type="raster"
              source="quebec-sat-source"
              paint={{
                "raster-opacity": 1,
              }}
            />
          )}
        </Source>
        {geojsonFqmhr && (
          <Source id="fqmhr-source" type="geojson" data={geojsonFqmhr}>
            <Layer
              id="fqmhr"
              type="line"
              paint={{
                "line-opacity": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  /* Zoom levels and corresponding opacity values */
                  18,
                  1, // Lower zoom level and full opacity
                  20,
                  0, // Higher zoom level and lower opacity
                ],
                "line-width": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],

                  10,
                  5,
                  22,
                  1,
                ],
                "line-color": [
                  "match",
                  ["get", "STATUT"],
                  "Chemin public",
                  "#CBCBCB",
                  "#92FA6E",
                ],
              }}
            />
          </Source>
        )}
        {geojsonData.map((data, index) => (
          <Source
            key={index}
            id={`geojson-source-${index}`}
            type="geojson"
            data={data}
          >
            <Layer
              id={`geojson-layer-${index}`}
              type="line"
              paint={{
                "line-color": "#3366ff",
                "line-opacity": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  /* Zoom levels and corresponding opacity values */
                  10,
                  1, // Lower zoom level and full opacity
                  20,
                  0, // Higher zoom level and lower opacity
                ],
                "line-width": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],

                  10,
                  5,
                  22,
                  1,
                ],
              }}
            />
          </Source>
        ))}
      </ReactMap>
    </div>
  );
}

export default Map;
