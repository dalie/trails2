import { useEffect, useState } from "react";
import ReactMap, { Layer, Source } from "react-map-gl";
import styles from "./map.module.scss";
import { Expression } from "mapbox-gl";

export type BaseLayer = "quebec" | "ontario" | "satellite" | "streets";

/* eslint-disable-next-line */
export interface MapProps {
  baseLayer: BaseLayer;
}

function getLineColor(layerId: string): string | Expression {
  if (layerId.startsWith("oftr")) {
    return [
      "match",
      ["get", "osmand_category"],
      "Single Track",
      "#ff5533",
      "#92FA6E",
    ];
  } else if (layerId.startsWith("result")) {
    return ["match", ["get", "STATUT"], "Chemin public", "#CBCBCB", "#92FA6E"];
  } else {
    return "#9933aa";
  }
}
export function Map({ baseLayer }: MapProps) {
  const [tileSetsMetadata, setTileSetsMetadata] = useState<
    { id: string; name: string; vector_layers: { id: string }[] }[]
  >([]);

  useEffect(() => {
    fetch(
      "https://api.mapbox.com/tilesets/v1/dominicalie?access_token=sk.eyJ1IjoiZG9taW5pY2FsaWUiLCJhIjoiY2xuNnJwbzhjMDY0NjJvbzRsdHBjc2xzNyJ9.Tg8duGAp2W_aN2d9y4Dj1A"
    )
      .then((response) => response.json())
      .then((data: { id: string; name: string }[]) => {
        const tilesets = data
          .filter(
            (l) =>
              l.name.startsWith("trail_") ||
              l.name.startsWith("result") ||
              l.name.startsWith("oftr")
          )
          .map((layer: any) => layer.id);

        tilesets.forEach((tileset) => {
          // fetch TileJSON metadata for each tileset
          fetch(
            `https://api.mapbox.com/v4/${tileset}.json?access_token=pk.eyJ1IjoiZG9taW5pY2FsaWUiLCJhIjoiY2tuZzJ0YWtvMDcwejJxczlwa2NtbW0zeSJ9.ire3NMM19l7z4Zeqa20RVw`
          )
            .then((response) => response.json())
            .then((data) => {
              console.log(data);

              setTileSetsMetadata((oldValue) => {
                return [...oldValue, data];
              });
            });
        });
      });
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
        mapStyle={
          baseLayer === "streets"
            ? "mapbox://styles/mapbox/navigation-day-v1"
            : "mapbox://styles/mapbox/satellite-streets-v12"
        }
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
              id="quebec-sat"
              type="raster"
              source="quebec-sat-source"
              paint={{
                "raster-opacity": 1,
              }}
            />
          )}
        </Source>

        {tileSetsMetadata.map((tileSet, index) => (
          <Source
            key={index}
            id={`tileset-source-${index}`}
            type="vector"
            url={`mapbox://${tileSet.id}`}
          >
            {tileSet.vector_layers.map((layer) => (
              <Layer
                id={`tileset-layer-${index}`}
                type="line"
                source={`tileset-source-${index}`}
                source-layer={layer.id}
                paint={{
                  //Purple line color
                  "line-color": getLineColor(tileSet.name),
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
            ))}
          </Source>
        ))}
      </ReactMap>
    </div>
  );
}

export default Map;
