import styles from "./map-control.module.scss";

/* eslint-disable-next-line */
export interface MapControlProps {}

export function MapControl(props: MapControlProps) {
  return (
    <div className={styles["container"]}>
      <h1>Welcome to MapControl!</h1>
    </div>
  );
}

export default MapControl;
