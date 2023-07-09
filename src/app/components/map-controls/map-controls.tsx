import { Button, ButtonGroup } from "@mui/material";
import styles from "./map-controls.module.scss";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";

/* eslint-disable-next-line */
export interface MapControlsProps {}

export function MapControls(props: MapControlsProps) {
  return (
    <div className={styles["container"]}>
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical outlined button group"
      >
        <Button key="one">
          <LocationSearchingIcon />
        </Button>
        ,
      </ButtonGroup>
    </div>
  );
}

export default MapControls;
