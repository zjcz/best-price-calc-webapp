import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import MenuAppBar from './MenuAppBar';

describe('MenuAppBar', () => {
  test('should render the app title', () => {
    const appTitle = 'My App';
    render(<MenuAppBar appTitle={appTitle} showRemoveAllButton onAddItem={() => {}} onDeleteAll={() => {}} />);
    expect(screen.getByText(appTitle)).toBeInTheDocument();
  });

  test('should call onDeleteAll when clear all button is clicked', () => {
    const onDeleteAllMock = jest.fn();
    render(
      <MenuAppBar appTitle="" showRemoveAllButton onDeleteAll={onDeleteAllMock} onAddItem={() => {}} />
    );

    fireEvent.click(screen.getByLabelText('clear all items'));
    expect(onDeleteAllMock).toHaveBeenCalled();
  });

  test('should call onAddItem when add new item button is clicked', () => {
    const onAddItemMock = jest.fn();
    render(
      <MenuAppBar appTitle="" showRemoveAllButton onAddItem={onAddItemMock} onDeleteAll={() => {}} />
    );

    fireEvent.click(screen.getByLabelText('add new item'));
    expect(onAddItemMock).toHaveBeenCalled();
  });

  test('should not render clear all button when showRemoveAllButton is false', () => {
    render(
      <MenuAppBar appTitle="" showRemoveAllButton={false} onAddItem={() => {}} onDeleteAll={() => {}} />
    );

    expect(screen.queryByLabelText('clear all items')).toBeNull();
  });
});
