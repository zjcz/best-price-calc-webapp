import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders title in Menu bar', () => {
    render(<App />);
    const titleElement = screen.getByText(/Best Price Calculator/i);
    expect(titleElement).toBeInTheDocument();
  });


  test('renders title add button', () => {
    render(<App />);
    const addButtonElement = screen.getByRole("button", {name: "add new item"});
    expect(addButtonElement).toBeInTheDocument();
  });

  test('does not render delete all button', () => {
    render(<App />);
    expect(screen.queryByRole("button", {name: "clear all items"})).toBeNull();
  });

  test('display add new dialog', () => {
    render(<App />);
    const addButtonElement = screen.getByRole("button", {name: "add new item"});
    fireEvent.click(addButtonElement);
    render(<App />);

    const titleElement = screen.getByText(/Add Item/i);
    expect(titleElement).toBeInTheDocument();
    const descriptionlement = screen.getByRole("textbox", {name: "Description"});
    expect(descriptionlement).toBeInTheDocument();
    const itemCountElement = screen.getByRole("textbox", {name: "Item Size"});
    expect(itemCountElement).toBeInTheDocument();
    const costElement = screen.getByRole("textbox", {name: "Item Cost"});
    expect(costElement).toBeInTheDocument();
    const saveButtonElement = screen.getByRole("button", {name: "Save"});
    expect(saveButtonElement).toBeInTheDocument();
    const cancelButtonElement = screen.getByRole("button", {name: "Cancel"});
    expect(cancelButtonElement).toBeInTheDocument();

  });

  test('add a new item', () => {
    render(<App />);
    const addButtonElement = screen.getByRole("button", {name: "add new item"});
    fireEvent.click(addButtonElement);
    render(<App />);

    const titleElement = screen.getByText(/Add Item/i);
    expect(titleElement).toBeInTheDocument();
    const descriptionElement = screen.getByRole("textbox", {name: "Description"});
    fireEvent.change(descriptionElement, {target: {value: 'new item'}});
    const itemCountElement = screen.getByRole("textbox", {name: "Item Size"});
    fireEvent.change(itemCountElement, {target: {value: '2'}});
    const costElement = screen.getByRole("textbox", {name: "Item Cost"});
    fireEvent.change(costElement, {target: {value: '6'}});
    const saveButtonElement = screen.getByRole("button", {name: "Save"});
    fireEvent.click(saveButtonElement);

    // check for new item in the list
    const newItemDetailsElement = screen.getByText(/2 units @ 6.00 = 3.00 per unit/i);
    expect(newItemDetailsElement).toBeInTheDocument();
  });

  test('add and edit a new item', () => {
    render(<App />);
    const addButtonElement = screen.getByRole("button", {name: "add new item"});
    fireEvent.click(addButtonElement);
    render(<App />);

    const titleElement = screen.getByText(/Add Item/i);
    expect(titleElement).toBeInTheDocument();
    const descriptionElement = screen.getByRole("textbox", {name: "Description"});
    fireEvent.change(descriptionElement, {target: {value: 'new item'}});
    const itemCountElement = screen.getByRole("textbox", {name: "Item Size"});
    fireEvent.change(itemCountElement, {target: {value: '2'}});
    const costElement = screen.getByRole("textbox", {name: "Item Cost"});
    fireEvent.change(costElement, {target: {value: '6'}});
    const saveButtonElement = screen.getByRole("button", {name: "Save"});
    fireEvent.click(saveButtonElement);

    // check for new item in the list
    const newItemDetailsElement = screen.getByText(/2 units @ 6.00 = 3.00 per unit/i);
    expect(newItemDetailsElement).toBeInTheDocument();

  });

  test('add and delete a new item', () => {
    // mock the window.confirm function to always confirm
    window.confirm = jest.fn(() => true) // always click 'yes'

    render(<App />);
    const addButtonElement = screen.getByRole("button", {name: "add new item"});
    fireEvent.click(addButtonElement);
        render(<App />);
    const titleElement = screen.getByText(/Add Item/i);
    expect(titleElement).toBeInTheDocument();
    const descriptionElement = screen.getByRole("textbox", {name: "Description"});
    fireEvent.change(descriptionElement, {target: {value: 'new item'}});
    const itemCountElement = screen.getByRole("textbox", {name: "Item Size"});
    fireEvent.change(itemCountElement, {target: {value: '2'}});
    const costElement = screen.getByRole("textbox", {name: "Item Cost"});
    fireEvent.change(costElement, {target: {value: '6'}});
    const saveButtonElement = screen.getByRole("button", {name: "Save"});
    fireEvent.click(saveButtonElement);
    
    render(<App />);

    // check for new item in the list
    const newItemDetailsElement = screen.getByText(/2 units @ 6.00 = 3.00 per unit/i);
    expect(newItemDetailsElement).toBeInTheDocument();

    // now delete it
    const deleteButtonElement = screen.getByLabelText('delete');
    fireEvent.click(deleteButtonElement);    
    render(<App />);
  
    // check the confirmation window was shown and click yes
    expect(window.confirm).toBeCalled() // or whatever assertions you want

    // check if the item is still there    
    expect(screen.queryByText(/2 units @ 6.00 = 3.00 per unit/i)).toBeNull();
  });

  test('add a new item and delete all', () => {
    // mock the window.confirm function to always confirm
    window.confirm = jest.fn(() => true) // always click 'yes'

    render(<App />);
    const addButtonElement = screen.getByRole("button", {name: "add new item"});
    fireEvent.click(addButtonElement);
    render(<App />);
    const titleElement = screen.getByText(/Add Item/i);
    expect(titleElement).toBeInTheDocument();
    const descriptionElement = screen.getByRole("textbox", {name: "Description"});
    fireEvent.change(descriptionElement, {target: {value: 'new item'}});
    const itemCountElement = screen.getByRole("textbox", {name: "Item Size"});
    fireEvent.change(itemCountElement, {target: {value: '2'}});
    const costElement = screen.getByRole("textbox", {name: "Item Cost"});
    fireEvent.change(costElement, {target: {value: '6'}});
    const saveButtonElement = screen.getByRole("button", {name: "Save"});
    fireEvent.click(saveButtonElement);
    
    render(<App />);

    // check for new item in the list
    let newItemDetailsElement = screen.getByText(/2 units @ 6.00 = 3.00 per unit/i);
    expect(newItemDetailsElement).toBeInTheDocument();

    // now delete it
    const deleteButtonElement = screen.getByLabelText('clear all items');
    fireEvent.click(deleteButtonElement);    
    render(<App />);
  
    // check the confirmation window was shown and click yes
    expect(window.confirm).toBeCalled() // or whatever assertions you want

    // check if the item is still there    
    expect(screen.queryByText(/2 units @ 6.00 = 3.00 per unit/i)).toBeNull();
  });
});