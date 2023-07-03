import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

/**
 * Props data passed into the MenuAppBar component
 */
interface MenuAppBarProp {
  appTitle: string;
  showRemoveAllButton: boolean;
  onDeleteAll: () => void;
  onAddItem: () => void;
}

/**
 * display a a menu bar for the app
 * @param props properties for the MenuAppBar
 * @returns JSX for the list of MenuAppBar
 */
export default function MenuAppBar(props: MenuAppBarProp) {
  const handleClearMenu = (event: React.MouseEvent<HTMLElement>) => {
    props.onDeleteAll();
  };

  const handleAddNewMenu = (event: React.MouseEvent<HTMLElement>) => {
    props.onAddItem();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.appTitle}
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="add new item"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleAddNewMenu}
              color="inherit"
            >
              <AddIcon />
            </IconButton>
            {props.showRemoveAllButton && <IconButton
              size="large"
              aria-label="clear all items"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleClearMenu}
              color="inherit"              
            >
              <DeleteForeverIcon />
            </IconButton>}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
