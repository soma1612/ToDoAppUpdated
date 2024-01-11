// muiCard.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import MuiCard from '../../controls/card';

const mockStore = configureStore([]);

describe('MuiCard Component', () => {
  it('renders MuiCard component with task details', () => {
    const store = mockStore({});
    const taskDetails = { id: 1, taskName: 'Task 1', completionTime: '10:00 AM' };

    render(
      <Provider store={store}>
        <MuiCard page="home" taskDetails={taskDetails} />
      </Provider>
    );

    // Check if task details are rendered
    const taskName = screen.getByText('Task 1');
    expect(taskName).toBeInTheDocument();

    const completionTime = screen.getByText('10:00 AM');
    expect(completionTime).toBeInTheDocument();
  });

  it('handles checkbox change', () => {
    const store = mockStore({});
    const taskDetails = { id: 1, taskName: 'Task 1', completionTime: '10:00 AM' };

    render(
      <Provider store={store}>
        <MuiCard page="home" taskDetails={taskDetails} />
      </Provider>
    );

    // Check if checkbox is unchecked initially
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    // Simulate checkbox change
    fireEvent.click(checkbox);

    // Check if checkbox is checked after change
    expect(checkbox).toBeChecked();
  });

  it('opens edit modal on edit button click', () => {
    const store = mockStore({});
    const taskDetails = { id: 1, taskName: 'Task 1', completionTime: '10:00 AM' };

    render(
      <Provider store={store}>
        <MuiCard page="home" taskDetails={taskDetails} />
      </Provider>
    );

    // Check if edit modal is not initially open
    const editModal = screen.queryByText('Edit Task');
    expect(editModal).toBeNull();

    // Click on the edit button
    const editButton = screen.getByLabelText('edit');
    fireEvent.click(editButton);

    // Check if edit modal is open
    expect(screen.getByText('Edit Task')).toBeInTheDocument();
  });

  it('dispatches delete task action on delete button click', () => {
    const store = mockStore({});
    const taskDetails = { id: 1, taskName: 'Task 1', completionTime: '10:00 AM' };

    render(
      <Provider store={store}>
        <MuiCard page="home" taskDetails={taskDetails} />
      </Provider>
    );

    // Click on the delete button
    const deleteButton = screen.getByLabelText('delete');
    fireEvent.click(deleteButton);

    // Check if delete task action is dispatched
    const actions = store.getActions();
    expect(actions).toEqual([{ type: 'DELETE_TASK', payload: 1 }]);
  });
});
