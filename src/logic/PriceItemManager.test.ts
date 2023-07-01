
import PriceItemManager from './PriceItemManager';

///////////////////////////////////////////////////////////////////////////////////
// validate adding new items to the list
///////////////////////////////////////////////////////////////////////////////////
describe('PriceItemManager', () => {
    test('successfully add a new item to the list', () => {
            
        let x: PriceItemManager = new PriceItemManager();
        x.addNewItem("item 1", 1, 5);
        
        expect(x.items.length).toEqual(1);
        expect(x.items[0].description).toEqual("item 1");
        expect(x.items[0].numberOfUnits).toEqual(1);
        expect(x.items[0].totalCost).toEqual(5);
        expect(x.items[0].identifier).not.toEqual("");
    });

    test('expect an error if adding an invalid item', () => {
        
        let x: PriceItemManager = new PriceItemManager();
        let numOfUnits: number = -2;
        let cost: number = -5;
        
        expect(() => { x.addNewItem("item 1", numOfUnits, cost)}).toThrowError();
    });

    test('successfully add a new item to the list and return the item', () => {
            
        let x: PriceItemManager = new PriceItemManager();
        let item = x.addNewItem("item 1", 1, 5);
        
        expect(x.items.length).toEqual(1);
        expect(item.description).toEqual("item 1");
        expect(item.numberOfUnits).toEqual(1);
        expect(item.totalCost).toEqual(5);
        expect(item.identifier).not.toEqual("");
    });

    ///////////////////////////////////////////////////////////////////////////////////
    // validate updating items on the list
    ///////////////////////////////////////////////////////////////////////////////////

    test('successfully update an item in the list', () => {
            
        let x: PriceItemManager = new PriceItemManager();
        let item = x.addNewItem("item 1", 1, 5);
        x.updateItem(item.identifier, "new desc", 100, 500);
        
        expect(x.items.length).toEqual(1);
        expect(x.items[0].description).toEqual("new desc");
        expect(x.items[0].numberOfUnits).toEqual(100);
        expect(x.items[0].totalCost).toEqual(500);
        expect(x.items[0].identifier).toEqual(item.identifier);
    });

    test('expect an error if updating an invalid item', () => {
        
        let x: PriceItemManager = new PriceItemManager();
        let numOfUnits: number = -2;
        let cost: number = -5;
        let item = x.addNewItem("item 1", 1, 5);
        
        expect(() => { x.updateItem(item.identifier, "new desc", numOfUnits, cost)}).toThrowError();
    });

    test('successfully update an item in the list and return the item', () => {
            
        let x: PriceItemManager = new PriceItemManager();
        let item = x.addNewItem("item 1", 1, 5);
        let updatedItem = x.updateItem(item.identifier, "new desc", 100, 500);
        expect(updatedItem).not.toBeUndefined();
        expect(x.items.length).toEqual(1);
        expect(updatedItem?.description).toEqual("new desc");
        expect(updatedItem?.numberOfUnits).toEqual(100);
        expect(updatedItem?.totalCost).toEqual(500);
        expect(updatedItem?.identifier).toEqual(item.identifier);
        expect(updatedItem).toEqual(item);
    });

    ///////////////////////////////////////////////////////////////////////////////////
    // validate removing items from the list
    ///////////////////////////////////////////////////////////////////////////////////

    test('successfully remove only item from the list', () => {
            
        let x: PriceItemManager = new PriceItemManager();
        let item = x.addNewItem("item 1", 1, 5);
        x.removeItem(item.identifier);

        expect(x.items.length).toEqual(0);
    });

    test('successfully remove an item from the list', () => {
            
        let x: PriceItemManager = new PriceItemManager();
        x.addNewItem("item 1", 1, 5);
        let item2 = x.addNewItem("item 2", 1, 5);
        x.addNewItem("item 3", 1, 5);
        x.removeItem(item2.identifier);

        expect(x.items.length).toEqual(2);
    });

    test('attempt to remove an invalid item from the list', () => {
            
        let x: PriceItemManager = new PriceItemManager();
        x.addNewItem("item 1", 1, 5);
        x.addNewItem("item 2", 1, 5);
        x.addNewItem("item 3", 1, 5);
        x.removeItem("invalid identifier");

        expect(x.items.length).toEqual(3);
    });

    test('attempt to remove an invalid item from an empty list', () => {
            
        let x: PriceItemManager = new PriceItemManager();
        x.removeItem("invalid identifier");

        expect(x.items.length).toEqual(0);
    });

    test('attempt to remove all items from the list', () => {
            
        let x: PriceItemManager = new PriceItemManager();
        x.addNewItem("item 1", 1, 5);
        x.addNewItem("item 2", 1, 5);
        x.addNewItem("item 3", 1, 5);
        x.removeAll();

        expect(x.items.length).toEqual(0);
    });

    test('attempt to remove all items from an empty list', () => {
            
        let x: PriceItemManager = new PriceItemManager();
        x.removeAll();

        expect(x.items.length).toEqual(0);
    });

    ///////////////////////////////////////////////////////////////////////////////////
    // validate ordering, lowest price first
    ///////////////////////////////////////////////////////////////////////////////////

    test('items are order correctly', () => {
            
        let x: PriceItemManager = new PriceItemManager();
        let item1 = x.addNewItem("item 1", 1, 5);
        let item2 = x.addNewItem("item 2", 2, 5);
        let item3 = x.addNewItem("item 3", 3, 5);    

        expect(x.items.length).toEqual(3);
        expect(x.items[0]).toEqual(item3);
        expect(x.items[1]).toEqual(item2);
        expect(x.items[2]).toEqual(item1);
    });

    test('items are order correctly after update', () => {
            
        let x: PriceItemManager = new PriceItemManager();
        let item1 = x.addNewItem("item 1", 1, 5);
        let item2 = x.addNewItem("item 2", 2, 5);
        let item3 = x.addNewItem("item 3", 3, 5);
        x.updateItem(item3.identifier, item3.description, 3, 500);

        expect(x.items.length).toEqual(3);
        expect(x.items[0]).toEqual(item2);
        expect(x.items[1]).toEqual(item1);
        expect(x.items[2]).toEqual(item3);
    });

    test('items are order correctly after removal', () => {
            
        let x: PriceItemManager = new PriceItemManager();
        let item1 = x.addNewItem("item 1", 1, 5);
        let item2 = x.addNewItem("item 2", 2, 5);
        let item3 = x.addNewItem("item 3", 3, 5);
        x.removeItem(item3.identifier);

        expect(x.items.length).toEqual(2);
        expect(x.items[0]).toEqual(item2);
        expect(x.items[1]).toEqual(item1);
    });
});