import {
  Button,
  ButtonGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import styles from "./map-controls.module.scss";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import { useCallback, useState } from "react";
import { BaseLayer } from "../map/map";

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
        <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={baseLayer}
          onChange={onBaseLayerChanged}
        >
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
