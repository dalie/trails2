import { useState } from "react";
import styles from "./track-layers-control.module.scss";
import { useRecoilState, useRecoilValue } from "recoil";
import { trackLayersState } from "src/app/store/track-layers.atom";
import { Fab, Menu, MenuItem, MenuList, Tooltip } from "@mui/material";
import TrackIcon from '@mui/icons-material/Timeline';
import CheckIcon from '@mui/icons-material/Check';
import { tilesetsState } from "src/app/store/tilesets.atom";

export function TrackLayersControl() {
  const tilesets = useRecoilValue(tilesetsState);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [trackLayers, setTrackLayers]= useRecoilState(trackLayersState);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuItemClick = (value:string) => {
    setTrackLayers(oldValue=>{
      if(oldValue.includes(value)){
        return [...oldValue.filter(v=>v!==value)];
      }else{
        return [...oldValue, value];
      }
    });
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles["container"]}>
      <Tooltip title="Select GPS tracks">
      <Fab onClick={handleClick}><TrackIcon/></Fab>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
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
        {tilesets.map((tileset)=>(
          <MenuItem onClick={()=>handleMenuItemClick(tileset.id)}>
          {trackLayers.includes(tileset.id) && <CheckIcon/>}
          {tileset.name}
          
        </MenuItem>
        ))}
        
      </Menu>
    </div>
  );
}

export default TrackLayersControl;
