import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import styles from "./map-controls.module.scss";
import { useCallback } from "react";
import { BaseLayer } from "src/app/store/base-layer.atom";
import BaseLayerControl from "../base-layer-control/base-layer-control";
import TrackLayersControl from "../track-layers-control/track-layers-control";


export function MapControls() {

  return (
    <div className={styles["container"]}>
      <BaseLayerControl/>
      <TrackLayersControl/>
    </div>
  );
}

export default MapControls;
