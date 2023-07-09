import ReactMap, { Layer, Source, ViewState } from "react-map-gl";
import styles from "./map.module.scss";
import { useRecoilValue } from "recoil";
import { locationState } from "src/app/store/location.atom";
import { useEffect, useState } from "react";
import { FeatureCollection, GeoJsonObject } from "geojson";

const geojsonSources = [
  "geojson/20230620-130226.geojson",
  "geojson/altonvale-pit.geojson",
];

/* eslint-disable-next-line */
export interface MapProps {}

export function Map(props: MapProps) {
  const gpsLocation = useRecoilValue(locationState);

  const [geojsonData, setGeojsonData] = useState<FeatureCollection[]>([]);

  const [geojsonFqmhr, setGeojsonFqmhr] = useState<FeatureCollection | null>(
    null
  );

  useEffect(() => {
    fetch("geojson/result.geojson")
      .then((response) => response.json())
      .then((data) => {
        setGeojsonFqmhr(data);
      });

    for (const source of geojsonSources) {
      fetch(source)
        .then((response) => response.json())
        .then((data) => {
          setGeojsonData((oldValue) => {
            return [...oldValue, data];
          });
        });
    }
  }, []);

  useEffect(() => {
    setViewState({
      ...viewState,
      longitude: gpsLocation.longitude ?? 0,
      latitude: gpsLocation.latitude ?? 0,
      bearing: gpsLocation.heading ?? 0,
    });
  }, [gpsLocation]);

  const [viewState, setViewState] = useState<ViewState>({
    longitude: gpsLocation.longitude ?? 0,
    latitude: gpsLocation.latitude ?? 0,
    bearing: gpsLocation.heading ?? 0,
    pitch: 0,
    padding: { top: 0, bottom: 0, left: 0, right: 0 },
    zoom: 5,
  });

  console.log(geojsonData.length);
  return (
    <div className={styles.container}>
      <ReactMap
        {...viewState}
        mapboxAccessToken="pk.eyJ1IjoiZG9taW5pY2FsaWUiLCJhIjoiY2tuZzJ0YWtvMDcwejJxczlwa2NtbW0zeSJ9.ire3NMM19l7z4Zeqa20RVw"
        initialViewState={{
          longitude: gpsLocation.longitude,
          latitude: gpsLocation.latitude,
          zoom: 14,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/dominicalie/cljkg5jdf00e401qph1m71f1n"
        onMove={(evt) => setViewState(evt.viewState)}
      >
        <Source
          id="quebec-sat-source"
          type="raster"
          tileSize={256}
          tiles={[
            "https://servicesmatriciels.mern.gouv.qc.ca/erdas-iws/ogc/wmts/Imagerie_Continue/Imagerie_GQ/default/GoogleMapsCompatibleExt2:epsg:3857/{z}/{y}/{x}.jpg",
          ]}
        >
          <Layer
            id="quebec-sat"
            type="raster"
            source="quebec-sat-source"
            paint={{
              "raster-opacity": 1,
            }}
          />
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
