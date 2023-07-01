/**
 * Class containing the details of an item to compare
 */
export class PriceItem {
    /**
     * Unique identifier
     */
    private _identifier: string = "";

    /**
     * description of the item
     */
     private _description: string = "";

    /**
     * number of units (quantity, volume, weight, etc)
     */
     private _numberOfUnits: number = 0;

    /**
     * total cost of the item
     */
     private _totalCost: number = 0;

    /**
     * 
     * @param desc description of the item
     * @param numOfUnits number of units (quantity, volume, weight, etc) that make up the item.
     * @param cost total cost of the item.
     */
    constructor(desc: string, numOfUnits: number, cost: number) {        
        this._identifier = this.genUniqueId();
        this.description = desc;
        this.numberOfUnits = numOfUnits;
        this.totalCost = cost;
    }
    
    /**
     * Unique identifier
     */
    get identifier(): string {
        return this._identifier;
    }

    /**
     * get the description of the item
     */
    get description(): string {
        return this._description;
    }

    /**
     * set the description of the item
     */
    set description(value: string) {
        this._description = value;
    }      

    /**
     * get the number of units (quantity, volume, weight, etc)
     */
    get numberOfUnits(): number {
        return this._numberOfUnits;
    }

    /**
     * set the number of units (quantity, volume, weight, etc). Must be greater than zero
     */
    set numberOfUnits(value: number) {
        if (value <= 0) {
            throw new Error("number of units cannot be zero or a negative number");
        }

        this._numberOfUnits = value;
    }

    /**
     * get the total cost of the item
     */
    get totalCost(): number {
        return this._totalCost;
    }

    /**
     * set the total cost of the item.  Cannot be a negative number
     */
    set totalCost(value: number) {
        if (value < 0) {
            throw new Error("cost cannot be a negative number");
        }

        this._totalCost = value;
    }

    /**
     * cost per unit
     */
    pricePerUnit() : number {
        if (this.numberOfUnits && this.totalCost && this.numberOfUnits > 0) {
            return this.totalCost / this.numberOfUnits;
        } else {
            return 0;
        }
    }

    /**
     * Generate a unique id for the item
     * https://www.newline.co/books/beginners-guide-to-typescript/generating-unique-ids
     * @returns unique id
     */
    private genUniqueId(): string {
        const dateStr = Date
          .now()
          .toString(36); // convert num to base 36 and stringify
      
        const randomStr = Math
          .random()
          .toString(36)
          .substring(2, 8); // start at index 2 to skip decimal point
      
        return `${dateStr}-${randomStr}`;
      }
}

export default PriceItem;