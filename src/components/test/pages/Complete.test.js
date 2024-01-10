import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Complete from '../../pages/complete'; // Adjust the path based on your project structure

const mockStore = configureStore([]);

describe('Complete Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      completeTask: [
        { id: 1, taskName: 'Completed Task 1' },
        { id: 2, taskName: 'Completed Task 2' },
        // Add any other necessary state properties
      ],
    });
  });

  test('renders completed tasks and search input', () => {
    render(
      <Provider store={store}>
        <Complete />
      </Provider>
    );

    // Check if completed tasks are rendered
    const completedTasks = screen.getAllByTestId('mui-card');
    expect(completedTasks.length).toBe(2); // Update the count based on your initial state

    // Check if search input is rendered
    const searchInput = screen.getByPlaceholderText('Search Tasks...');
    expect(searchInput).toBeInTheDocument();
  });

  test('filters completed tasks based on search input', () => {
    render(
      <Provider store={store}>
        <Complete />
      </Provider>
    );
  
    // Enter a search query
    const searchInput = screen.getByPlaceholderText('Search Tasks...');
    fireEvent.change(searchInput, { target: { value: 'Completed Task 1' } });
  
    // Check if only filtered completed tasks are rendered
    const completedTasks = screen.getAllByTestId('mui-card');
    expect(completedTasks.length).toBe(1);
  });

  test('filters completed tasks based on wrong search input', () => {
    render(
      <Provider store={store}>
        <Complete />
      </Provider>
    );
  
    // Enter a search query
    const searchInput = screen.getByPlaceholderText('Search Tasks...');
    fireEvent.change(searchInput, { target: { value: 'Completed Task 3' } });
  
    // Check if only filtered completed tasks are rendered
    const completedTasks = screen.getAllByTestId('mui-card');
    expect(completedTasks.length).toBe(0);
  });
});
