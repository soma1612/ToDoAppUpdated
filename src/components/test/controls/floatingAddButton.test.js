import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MuiButton from '../../controls/floatingAddButton';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('MuiButton Component', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      saveTask: [
        { id: 1, taskName: 'Task 1' },
        { id: 2, taskName: 'Task 2' },
      ],
    });
  });

  test('renders MuiButton component and opens modal on click', async () => {
    render(
      <Provider store={store}>
        <MuiButton />
      </Provider>
    );
  
    // Check if MuiButton component is rendered
    const fabButton = screen.getByRole('button');
    expect(fabButton).toBeInTheDocument();
  
    // Check if modal is initially closed
    const modal = screen.queryByRole('dialog');
    expect(modal).not.toBeInTheDocument();
  
    // Click the MuiButton to open the modal
    fireEvent.click(fabButton);
  
    // Wait for the modal to be open
    await waitFor(() => {
      const openedModal = screen.getByRole('dialog');
      expect(openedModal).toBeInTheDocument();
    });
  });
  
  test('renders MuiButton component and opens/closes modal on click', async () => {
    render(
      <Provider store={store}>
        <MuiButton />
      </Provider>
    );

    // Check if MuiButton component is rendered
    const fabButton = screen.getByRole('button');
    expect(fabButton).toBeInTheDocument();

    // Check if modal is initially closed
    const modal = screen.queryByRole('dialog');
    expect(modal).not.toBeInTheDocument();

    // Click the MuiButton to open the modal
    fireEvent.click(fabButton);

    // Wait for the modal to be open
    await waitFor(() => {
      const openedModal = screen.getByRole('dialog');
      expect(openedModal).toBeInTheDocument();
    });

    // Click the close button to close the modal
    const closeButton = await screen.findByRole('button', { name: /Cancel/i });
    fireEvent.click(closeButton);

    // Wait for the modal to be closed
    await waitFor(() => {
      const closedModal = screen.queryByRole('dialog');
      expect(closedModal).not.toBeInTheDocument();
    });
  });

});

