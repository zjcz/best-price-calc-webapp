import { render, fireEvent, screen } from '@testing-library/react';
import MaintainItemDialog, { MaintainItemDialogMode } from './MaintainItemDialog';
import { PriceItem } from '../logic/PriceItem';

describe('MaintainItemDialog', () => {
  const onSaveItemMock = jest.fn();
  const onCancelDialogMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly in add mode', () => {
    render(
      <MaintainItemDialog
        mode={MaintainItemDialogMode.Add}
        item={undefined}
        currencySymbol="£"
        onSaveItem={onSaveItemMock}
        onCancelDialog={onCancelDialogMock}
      />
    );

    expect(screen.getByRole("textbox", {name: 'Description'})).toBeInTheDocument();
    expect(screen.getByRole("textbox", {name: 'Item Size'})).toBeInTheDocument();
    expect(screen.getByRole("textbox", {name: 'Item Cost'})).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  test('renders correctly in edit mode', () => {
    const item = new PriceItem("Item description", 10, 20);

    render(
      <MaintainItemDialog
        mode={MaintainItemDialogMode.Edit}
        item={item}
        currencySymbol="£"
        onSaveItem={onSaveItemMock}
        onCancelDialog={onCancelDialogMock}
      />
    );

    expect(screen.getByRole("textbox", {name: 'Description'})).toHaveValue(item.description);
    expect(screen.getByRole("textbox", {name: 'Item Size'})).toHaveValue(item.numberOfUnits.toString());
    expect(screen.getByRole("textbox", {name: 'Item Cost'})).toHaveValue(item.totalCost.toString());
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  test('calls onCancelDialog when cancel button is clicked', () => {
    render(
      <MaintainItemDialog
        mode={MaintainItemDialogMode.Add}
        item={undefined}
        currencySymbol="£"
        onSaveItem={onSaveItemMock}
        onCancelDialog={onCancelDialogMock}
      />
    );

    fireEvent.click(screen.getByText('Cancel'));
    expect(onCancelDialogMock).toHaveBeenCalledTimes(1);
  });

  test('calls onSaveItem when save button is clicked with valid inputs', () => {
    render(
      <MaintainItemDialog
        mode={MaintainItemDialogMode.Add}
        item={undefined}
        currencySymbol="£"
        onSaveItem={onSaveItemMock}
        onCancelDialog={onCancelDialogMock}
      />
    );

    const descriptionInput = screen.getByRole("textbox", {name: 'Description'});
    const sizeInput = screen.getByRole("textbox", {name: 'Item Size'});
    const costInput = screen.getByRole("textbox", {name: 'Item Cost'});
    const saveButton = screen.getByText('Save');

    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    fireEvent.change(sizeInput, { target: { value: '10' } });
    fireEvent.change(costInput, { target: { value: '20' } });
    fireEvent.click(saveButton);

    expect(onSaveItemMock).toHaveBeenCalledTimes(1);
    expect(onSaveItemMock).toHaveBeenCalledWith('', 'Test Description', 10, 20);
  });

  test('does not call onSaveItem when save button is clicked with invalid inputs', () => {
    render(
      <MaintainItemDialog
        mode={MaintainItemDialogMode.Add}
        item={undefined}
        currencySymbol="£"
        onSaveItem={onSaveItemMock}
        onCancelDialog={onCancelDialogMock}
      />
    );

    const saveButton = screen.getByText('Save');

    fireEvent.click(saveButton);

    expect(onSaveItemMock).not.toHaveBeenCalled();
  });
});
