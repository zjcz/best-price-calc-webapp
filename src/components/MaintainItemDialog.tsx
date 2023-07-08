import React, { useState, useEffect }  from 'react';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PriceItem from '../logic/PriceItem';

/**
 * The different modes the maintain item dialog window can have
 */
export enum MaintainItemDialogMode {
  Add,
  Edit,
  Hidden
}

/**
 * Props data passed into the MaintainItemDialog component
 */
interface MaintainItemDialogProp {      
  mode: MaintainItemDialogMode;
  item: PriceItem | undefined;
  currencySymbol: string;
  onSaveItem: (id: string, desc: string, numOfUnits: number, cost: number) => void;  
  onCancelDialog: () => void;
}

/**
 * State data used to store the info about the screen, such as user inputs and error state
 */
interface ItemStateData {   
  itemIdentifier: string   
  description: string;
  size: string;
  cost: string;
  descriptionError: boolean;
  sizeError: boolean;
  costError: boolean;
}

/**
 * display a window to add or edit a PriceItem object
 * @param props properties for the MaintainItemDialog
 * @returns JSX for the add/edit popup dialog window
 */
export default function MaintainItemDialog(props: MaintainItemDialogProp) {
  const [currentState, setCurrentState] =  useState<ItemStateData>({
    itemIdentifier: "",
    description: "",
    size: "",
    cost: "",
    descriptionError: false,
    sizeError: false,
    costError: false,
  });

  /**
   * Use a useEffect hook to detect when the screen has changed and we need to read the values in from 
   * the item supplied in the props
   */
  useEffect(() => {
    if (props.mode !== MaintainItemDialogMode.Hidden) {
      const newState: ItemStateData = {
        itemIdentifier: props.item?.identifier ?? "",
        description: props.item?.description ?? "",
        size: props.item?.numberOfUnits.toString() ?? "",
        cost: props.item?.totalCost.toString() ?? "",
        descriptionError: false,        
        sizeError: false,
        costError: false,
      }
      setCurrentState(newState);        
    }
  }, [props]);

  // regex to limit the chars allowed for the numeric entries
  const matchingCharRegex = new RegExp("^\\d*\\.?\\d*$");

  /**
   * Handle the user input from one of the form elements
   * @param prop the property of the ItemStateData object to update
   */
   const handleInputChange = (prop: keyof ItemStateData) => (e: React.ChangeEvent<HTMLInputElement>) => {
                  
      if (prop === "size" || prop === "cost") {
        if (e.target.value !== "" && !matchingCharRegex.test(e.target.value)) {              
          return;
        }      
      }

      setCurrentState({ ...currentState, [prop]: e.target.value });
  };

  /**
   * Handle the user closing the dialog, either by clicking cancel or clicking away
   */
  const handleClose = () => {
    props.onCancelDialog();
  };

  /**
   * Handle the user clicking the save button
   */
  const handleSave = () => {
    const numericSize: number = parseFloat(currentState.size);
    const numericCost: number = parseFloat(currentState.cost);
    const newState: ItemStateData = Object.create(currentState);
    
    // validate
    newState.descriptionError = (currentState.description === "");
    newState.sizeError = (isNaN(numericSize) || numericSize <= 0);
    newState.costError = (isNaN(numericCost) || numericCost <= 0);
    
    if (!newState.descriptionError && !newState.sizeError && !newState.costError) {      
      props.onSaveItem(currentState.itemIdentifier, currentState.description, numericSize, numericCost);

      // clear the old values
      newState.itemIdentifier = "";
      newState.description = "";
      newState.size = "";
      newState.cost = "";
    }

    setCurrentState(newState);
  };

  return (
    <div>
      <Dialog open={props.mode !== MaintainItemDialogMode.Hidden} onClose={handleClose}>
        <DialogTitle>{props.mode === MaintainItemDialogMode.Add ? "Add" : "Edit"} Item</DialogTitle>
        <DialogContent>
          <DialogContentText>            
          </DialogContentText>
          <FormControl fullWidth sx={{ m: 1 }}>            
            <TextField
              id="item-description"
              required
              label="Description"
              InputLabelProps={{
                shrink: true,
              }}
              value={currentState.description}              
              error={currentState.descriptionError}
              onChange={handleInputChange("description")}
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }}>            
            <TextField
              id="item-size"
              required
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              label="Item Size"
              helperText="Size of the item (i.e weight, volume, number of units in the item)"
              InputLabelProps={{
                shrink: true,                
              }}
              value={currentState.size}              
              error={currentState.sizeError}
              onChange={handleInputChange("size")}
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }}>            
            <TextField
              id="item-cost"              
              required
              InputProps={{
                startAdornment: <InputAdornment position="start">{props.currencySymbol}</InputAdornment>,
                inputMode: 'numeric',
              }}              
              label="Item Cost"
              value={currentState.cost}              
              error={currentState.costError}
              onChange={handleInputChange("cost")}
            />
          </FormControl>        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleClose}>Cancel</Button>          
        </DialogActions>
      </Dialog>
    </div>
  );
}
