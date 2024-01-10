import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Routing from '../../layout/routing';

describe('Routing component', () => {
  test('renders Routing component with MuiTab and routes', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routing />
      </MemoryRouter>
    );

    // Check if MuiTab is rendered
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('Trash')).toBeInTheDocument();

    // Check if initial route is rendered
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  test('navigates to the "Completed" page when "Completed" tab is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routing />
      </MemoryRouter>
    );

    // Click on the "Completed" tab
    screen.getByText('Completed').click();

    // Check if "Completed" page is rendered
    expect(screen.getByText('Completed Page')).toBeInTheDocument();
  });

  // Add more tests as needed
});
