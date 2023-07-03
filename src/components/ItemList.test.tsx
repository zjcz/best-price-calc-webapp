import { render, fireEvent, screen } from '@testing-library/react';
import ItemList from './ItemList';
import { PriceItem } from '../logic/PriceItem';

// Mock PriceItem data
const items = [
    new PriceItem("Item 1", 2, 10),
    new PriceItem("Item 2", 3, 15)
];

// Mock onDeleteItem and onEditItem functions
const onDeleteItem = jest.fn();
const onEditItem = jest.fn();

describe('ItemList', () => {
  test('renders the list items', () => {
    render(
      <ItemList items={items} onDeleteItem={onDeleteItem} onEditItem={onEditItem} />
    );

    // Check if the primary text of the first item is rendered
    expect(screen.getByText('Item 1')).toBeInTheDocument();

    // Check if the secondary text of the second item is rendered
    expect(screen.getByText('3 units @ 15.00 = 5.00 per unit')).toBeInTheDocument();
  });

  test('calls onDeleteItem when delete button is clicked', () => {
    render(
      <ItemList items={items} onDeleteItem={onDeleteItem} onEditItem={onEditItem} />
    );

    // Get all delete buttons
    const deleteButtons = screen.getAllByRole('button', { name: 'delete' });

    // Click the delete button for the first item
    fireEvent.click(deleteButtons[0]);

    // Check if onDeleteItem is called with the correct item identifier
    expect(onDeleteItem).toHaveBeenCalledWith(items[0].identifier);
  });

  test('calls onEditItem when item is clicked', () => {
    render(
      <ItemList items={items} onDeleteItem={onDeleteItem} onEditItem={onEditItem} />
    );

    // Get all list items
    const listItems = screen.getAllByRole('listitem');

    // Click the second item
    fireEvent.click(listItems[1]);

    // Check if onEditItem is called with the correct item identifier
    expect(onEditItem).toHaveBeenCalledWith(items[1].identifier);
  });


  test('does not call onEditItem when delete button is clicked', () => {
    render(
      <ItemList items={items} onDeleteItem={onDeleteItem} onEditItem={onEditItem} />
    );

    // Get all delete buttons
    const deleteButtons = screen.getAllByRole('button', { name: 'delete' });

    // Click the delete button for the first item
    fireEvent.click(deleteButtons[0]);

    // Check if onEditItem is not called
    expect(onEditItem).not.toBeCalled();
  });
});
