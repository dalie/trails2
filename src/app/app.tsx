// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useCallback, useState } from "react";
import styles from "./app.module.scss";
import { MapControls } from "./components/map-controls/map-controls";
import { Map } from "./components/map/map";
import { useRecoilState } from "recoil";
import { BaseLayer, baseLayerState } from "./store/base-layer.atom";

export function App() {
  const [baseLayer, setBaseLayer] = useRecoilState(baseLayerState);

  const baseLayerChanged = useCallback((value: BaseLayer) => {
    setBaseLayer(value);
  }, []);

  return (
    <div className={styles["container"]}>
      <div className={styles["map"]}>
        <Map baseLayer={baseLayer} />
      </div>
      <div className={styles["map-controls-right"]}>
        <MapControls
          baseLayer={baseLayer}
          baseLayerChanged={baseLayerChanged}
        />
      </div>
    </div>
  );
}

export default App;
