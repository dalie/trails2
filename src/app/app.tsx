// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from "./app.module.scss";
import { MapControls } from "./components/map-controls/map-controls";
import { Map } from "./components/map/map";

export function App() {
  return (
    <div className={styles["container"]}>
      <div className={styles["map"]}>
        <Map />
      </div>
      <div className={styles["map-controls-right"]}>
        <MapControls />
      </div>
    </div>
  );
}

export default App;
