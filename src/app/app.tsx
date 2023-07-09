// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styles from "./app.module.scss";
import { MapControls } from "./components/map-controls/map-controls";
import { Map } from "./components/map/map";
import { locationState } from "./store/location.atom";

export function App() {
  const [location, setLocation] = useRecoilState(locationState);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
    });

    const locationRef = navigator.geolocation.watchPosition((position) => {
      setLocation({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
        accuracy: position.coords.accuracy,
        altitude: position.coords.altitude,
        altitudeAccuracy: position.coords.altitudeAccuracy,
        heading: position.coords.heading,
        speed: position.coords.speed,
      });
    });

    return () => {
      navigator.geolocation.clearWatch(locationRef);
    };
  }, []);

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
