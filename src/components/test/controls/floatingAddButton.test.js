import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MuiButton from '../../controls/MuiButton'; // Adjust the path based on your project structure

describe('MuiButton Component', () => {
  test('renders MuiButton component and opens modal on click', () => {
    render(<MuiButton />);

    // Check if MuiButton component is rendered
    const fabButton = screen.getByRole('button', { name: /add/i });
    expect(fabButton).toBeInTheDocument();

    // Check if modal is initially closed
    const modal = screen.queryByRole('dialog');
    expect(modal).not.toBeInTheDocument();

    // Click the MuiButton to open the modal
    fireEvent.click(fabButton);

    // Check if modal is open after clicking the MuiButton
    const openedModal = screen.getByRole('dialog');
    expect(openedModal).toBeInTheDocument();
  });

  test('closes the modal on calling handleClose', () => {
    render(<MuiButton />);

    // Click the MuiButton to open the modal
    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    // Check if modal is open
    const openedModal = screen.getByRole('dialog');
    expect(openedModal).toBeInTheDocument();

    // Call the handleClose function to close the modal
    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    // Check if modal is closed after calling handleClose
    const closedModal = screen.queryByRole('dialog');
    expect(closedModal).not.toBeInTheDocument();
  });

  
});
