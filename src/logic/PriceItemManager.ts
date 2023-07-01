import PriceItem from './PriceItem';

export class PriceItemManager {
  private _items: Array<PriceItem>;

  /**
   * get the list of items, sorted with the lowest price per unit first
   */
  get items(): Array<PriceItem> {
    return this._items;
  }

  constructor(items?: Array<PriceItem>) {
    if (items) {
      this._items = items;
    } else {
      this._items = new Array<PriceItem>();
    }
  }

  /**
   * Create and add a new item to the collection.  Returns the newly created PriceItem object
   * @param desc description of the new item
   * @param numOfUnits quantity / size of item
   * @param cost  cost of the item
   */
  addNewItem(desc: string, numOfUnits: number, cost: number): PriceItem { 
    const newItem: PriceItem = new PriceItem(desc, numOfUnits, cost);
    const newItemList = this._items.concat(newItem);

    // recalculate the order
    this._items = this.calculateBestPrices(newItemList);

    return newItem;
  }

  /**
   * update an existing item.  Returns the updated item if the id exists in the collection, or undefined if not
   * @param id id of the item to update
   * @param desc description of the new item
   * @param numOfUnits quantity / size of item
   * @param cost  cost of the item
   */
  updateItem(id: string, desc: string, numOfUnits: number, cost: number): PriceItem | undefined {
    const item = this._items.find(item => item.identifier === id);
    if (item) {
      item.description = desc;
      item.numberOfUnits = numOfUnits;
      item.totalCost = cost;
    
      this._items = this.calculateBestPrices(this._items);      
    }

    return item;
  }

  /**
   * remove an existing item
   * @param id id of the item to remove
   */
  removeItem(id: string) {
    const newItems: PriceItem[] = this._items.filter(item => item.identifier !== id);
    this._items = this.calculateBestPrices(newItems);
  }

  /**
   * remove all existing items   
   */
  removeAll() {    
    this._items = new Array<PriceItem>();
  }

  /**
   * Calculate the best priced items by sorting, with the lowest price per unit first.  Returns a new list of items, ordered by price per item, lowest first.
   * @param items items to calculate
   */
  private calculateBestPrices(items: PriceItem[]) : PriceItem[] {
      return items.sort(this.compare);
  }

  /**
   * compare method used to sort the items
   */
  private compare(a: PriceItem, b: PriceItem) {
    if (a.pricePerUnit() < b.pricePerUnit()) {
      return -1;
    }
    if (a.pricePerUnit() > b.pricePerUnit()) {
      return 1;
    }
    return 0;
  }
}

export default PriceItemManager;