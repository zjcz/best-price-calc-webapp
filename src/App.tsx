import React, { useState } from 'react';

import PriceItemManager from './logic/PriceItemManager';
import PriceItem from './logic/PriceItem';

import MenuAppBar from './components/MenuAppBar'
import ItemList from './components/ItemList'
import MaintainItemDialog, {MaintainItemDialogMode} from './components/MaintainItemDialog'

import './App.css';


interface MaintainItemDialogOptions {  
  mode: MaintainItemDialogMode;
  item?: PriceItem;
}

function App() {
  const [items, setPriceItems] = useState<Array<PriceItem>>([]);
  const [maintainDialogOptions, setMaintainItemDialogOptions] = useState<MaintainItemDialogOptions>({ mode: MaintainItemDialogMode.Hidden });
  
  const itemManager: PriceItemManager = new PriceItemManager(items);

  const addItem = () => {
    // display the add new dialog
    setMaintainItemDialogOptions({ mode: MaintainItemDialogMode.Add });
  }

  const editItem = (id: string) => {
    // display the add new dialog
    const item = items.find(x => x.identifier === id);
    setMaintainItemDialogOptions({ mode: MaintainItemDialogMode.Edit, item: item });
  }
  
  const deleteItem = (id: string) => {
    if (window.confirm("are you sure you want to remove this item?")) {
      itemManager.removeItem(id);
      setPriceItems(itemManager.items);      
    }    
  }

  const deleteAllItems = () => {
    if (window.confirm("Are you sure you want to remove all the items from the list?")) {
      itemManager.removeAll();
      setPriceItems(itemManager.items);
    }
  }

  const onSaveDialog = (itemIdentifier: string, description: string, numOfUnits: number, cost: number) => {    
    if (itemIdentifier) {
      itemManager.updateItem(itemIdentifier, description, numOfUnits, cost);
    } else {
      itemManager.addNewItem(description, numOfUnits, cost);
    }

    setPriceItems(itemManager.items);
    setMaintainItemDialogOptions({ mode: MaintainItemDialogMode.Hidden });
  }

  const onCancelDialog = () => {
    setMaintainItemDialogOptions({ mode: MaintainItemDialogMode.Hidden });
  }

  return (
    <div className="App">
      <MenuAppBar appTitle='Best Price Calculator' onDeleteAll={deleteAllItems} onAddItem={addItem} showRemoveAllButton={items && items.length > 0}/>
      <ItemList items={items} onDeleteItem={deleteItem} onEditItem={editItem} />
      <MaintainItemDialog mode={maintainDialogOptions.mode}
                          item={maintainDialogOptions.item} 
                          currencySymbol={"£"} 
                          onSaveItem={onSaveDialog} 
                          onCancelDialog={onCancelDialog} />
    </div>
  );
}

export default App;
