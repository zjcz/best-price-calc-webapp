import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PriceItem from '../logic/PriceItem';

/**
 * Props data passed into the ItemList component
 */
interface ItemListProp {    
    items: Array<PriceItem>;
    onDeleteItem: (identifier: string) => void;
    onEditItem: (identifier: string) => void;
}

/**
 * display a list of PriceItem objects
 * @param props properties for the ItemList
 * @returns JSX for the list of PriceItems
 */
export default function ItemList(props: ItemListProp) {

  /**
   * convert the list if PriceItem objects to ListItems for use in the List control
   * @param items array of PriceItem objects to display in the list
   * @returns array of ListItems
   */
  function generateListItems(items: Array<PriceItem>) {
    return items.map((item, index) => {
      return <ListItem   
                  onClick={() => handleEditItem(item.identifier)}
                  id={item.identifier}
                  key={item.identifier}
                  secondaryAction={
                  <IconButton edge="end" 
                              aria-label="delete"                            
                              onClick={(e) => handleDeleteButton(e, item.identifier)}>
                      <DeleteIcon />
                  </IconButton>
                  }
              >
                <ListItemAvatar>
                  { index === 0 && 
                      <Avatar>
                        <EmojiEventsIcon />
                      </Avatar> }
                  </ListItemAvatar>
                <ListItemText
                  primary={getPrimaryText(item)}
                  secondary={getSecondaryText(item)}
                  />
              </ListItem>
              }
      );  
  }

  function getPrimaryText(item: PriceItem) {
    return item.description;
  }


  function getSecondaryText(item: PriceItem) {
    //let formatter = new Intl.NumberFormat(undefined, );
    return `${item.numberOfUnits} units @ ${item.totalCost.toFixed(2)} = ${item.pricePerUnit().toFixed(2)} per unit` ;
  }

  /**
   * Handle the user clicking the delete button
   * @param itemIdentifier id of the PriceItem to delete
   */
  const handleDeleteButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, itemIdentifier: string) => {
    e.stopPropagation();
    props.onDeleteItem(itemIdentifier);    
  };
  
  /**
   * Handle the user wanting to edit a PriceItem
   * @param itemIdentifier id of the PriceItem to edit
   */
  const handleEditItem = (itemIdentifier: string) => {
    props.onEditItem(itemIdentifier);
  };

  return (
      <List>
        {generateListItems(props.items)}
      </List>
  );
}
