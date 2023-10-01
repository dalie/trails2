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

/* eslint-disable-next-line */
export interface MapControlsProps {
  baseLayer: BaseLayer;
  baseLayerChanged: (value: BaseLayer) => void;
}

export function MapControls({ baseLayer, baseLayerChanged }: MapControlsProps) {
  const onBaseLayerChanged = useCallback((ev: unknown, value: string) => {
    baseLayerChanged(value as BaseLayer);
  }, []);
  return (
    <div className={styles["container"]}>
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">
          Base Layer
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={baseLayer}
          onChange={onBaseLayerChanged}
        >
          <FormControlLabel
            value="streets"
            control={<Radio />}
            label="Streets"
          />
          <FormControlLabel
            value="satellite"
            control={<Radio />}
            label="Satellite"
          />
          <FormControlLabel value="quebec" control={<Radio />} label="Quebec" />
          <FormControlLabel
            value="ontario"
            control={<Radio />}
            label="Ontario"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default MapControls;
