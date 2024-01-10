import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Home from '../../pages/home'; // Adjust the path based on your project structure

const mockStore = configureStore([]);

describe('Home Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      saveTask: [
        { id: 1, taskName: 'Task 1' },
        { id: 2, taskName: 'Task 2' },
        // Add any other necessary state properties
      ],
    });
  });

  test('renders tasks and search input', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    // Check if tasks are rendered
    const tasks = screen.getAllByTestId('task-reminder');
    expect(tasks.length).toBe(2); // Update the count based on your initial state

    // Check if search input is rendered
    const searchInput = screen.getByPlaceholderText('Search Tasks...');
    expect(searchInput).toBeInTheDocument();
  });

  test('filters tasks based on search input', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    // Enter a search query
    const searchInput = screen.getByPlaceholderText('Search Tasks...');
    fireEvent.change(searchInput, { target: { value: 'Task 1' } });

    // Check if only filtered tasks are rendered
    const tasks = screen.getAllByTestId('mui-card');
    expect(tasks.length).toBe(1);
  });

  test('filters tasks based on search input', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    // Enter a search query
    const searchInput = screen.getByPlaceholderText('Search Tasks...');
    fireEvent.change(searchInput, { target: { value: 'Task 3' } });

    // Check if only filtered tasks are rendered
    const tasks = screen.getAllByTestId('mui-card');
    expect(tasks.length).toBe(0);
  });
});
