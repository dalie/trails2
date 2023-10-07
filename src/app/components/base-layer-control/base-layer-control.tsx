import { Fab,  Menu, MenuItem, Tooltip } from "@mui/material";
import styles from "./base-layer-control.module.scss";
import {  useState } from "react";
import { useRecoilState } from "recoil";
import { BaseLayer, baseLayerState } from "../../store/base-layer.atom";
import LayersIcon from '@mui/icons-material/Layers';

export function BaseLayerControl() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [baseLayer, setBaseLayer]= useRecoilState(baseLayerState);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuItemClick = (value:BaseLayer) => {
    setBaseLayer(value);
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles["container"]}>
      <Tooltip title="Select base map imagery">
      <Fab onClick={handleClick}><LayersIcon/></Fab>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={()=>handleMenuItemClick('streets')} selected={baseLayer==='streets'}>
          Streets
        </MenuItem>
        <MenuItem onClick={()=>handleMenuItemClick('satellite')} selected={baseLayer==='satellite'}>
          Mapbox Satellite
        </MenuItem>
        <MenuItem onClick={()=>handleMenuItemClick('quebec')} selected={baseLayer==='quebec'}>
          Quebec Imagery
        </MenuItem>
        <MenuItem onClick={()=>handleMenuItemClick('ontario')} selected={baseLayer==='ontario'}>
          Ontario Imagery
        </MenuItem>
      </Menu>
    </div>
  );
}

export default BaseLayerControl;
