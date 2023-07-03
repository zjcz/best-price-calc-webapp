import PriceItem from './PriceItem';

///////////////////////////////////////////////////////////////////////////////////
// validate price per unit calculation 
///////////////////////////////////////////////////////////////////////////////////
describe('PriceItem', () => {
    test('calculate cost per item for positive integers', () => {
        
        let numOfUnits: number = 2;
        let cost: number = 6;
        let x: PriceItem = new PriceItem("Test Item 1", numOfUnits, cost);
        
        expect(x.pricePerUnit()).toEqual(3);
    });

    test('calculate cost per item for positive decimal cost', () => {
        
        let numOfUnits: number = 2;
        let cost: number = 4.5;
        let x: PriceItem = new PriceItem("Test Item 1", numOfUnits, cost);
        
        expect(x.pricePerUnit()).toEqual(2.25);
    });

    test('calculate cost per item for positive decimal units', () => {
        
        let numOfUnits: number = 2.5;
        let cost: number = 5;
        let x: PriceItem = new PriceItem("Test Item 1", numOfUnits, cost);
        
        expect(x.pricePerUnit()).toEqual(2);
    });

    test('calculate cost per item for positive decimals', () => {
        
        let numOfUnits: number = 2.5;
        let cost: number = 4.5;
        let x: PriceItem = new PriceItem("Test Item 1", numOfUnits, cost);
        
        expect(x.pricePerUnit()).toEqual(1.8);
    });

    test('calculate cost per item for zero cost', () => {
        
        let numOfUnits: number = 2;
        let cost: number = 0;
        let x: PriceItem = new PriceItem("Test Item 1", numOfUnits, cost);
        
        expect(x.pricePerUnit()).toEqual(0);
    });

    test('calculate cost per item for zero units', () => {
        
        let numOfUnits: number = 0;
        let cost: number = 5;
        
        expect(() => { new PriceItem("Test Item 1", numOfUnits, cost)}).toThrowError();
    });

    test('calculate cost per item for zero cost and units', () => {
        
        let numOfUnits: number = 0;
        let cost: number = 0;

        expect(() => { new PriceItem("Test Item 1", numOfUnits, cost)}).toThrowError();
    });

    test('calculate cost per item for negative cost', () => {
        
        let numOfUnits: number = 2;
        let cost: number = -5;
            
        expect(() => { new PriceItem("Test Item 1", numOfUnits, cost)}).toThrowError();
    });

    test('calculate cost per item for negative units', () => {
        
        let numOfUnits: number = -2;
        let cost: number = 5;
        
        expect(() => { new PriceItem("Test Item 1", numOfUnits, cost)}).toThrowError();
    });

    test('calculate cost per item for negative cost and units', () => {
        
        let numOfUnits: number = -2;
        let cost: number = -5;
        
        expect(() => { new PriceItem("Test Item 1", numOfUnits, cost)}).toThrowError();
    });
});