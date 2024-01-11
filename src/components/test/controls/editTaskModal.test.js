// MuiEditModal.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import MuiEditModal from '../../controls/editTaskModal';

const mockStore = configureStore([]);

describe('MuiEditModal Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      saveTask: [
        { id: 1, taskName: 'Task 1', completionTime: '2022-01-11T12:00' },
        // Add more sample tasks as needed
      ],
      selectedTaskToEdit: 1,
    });
  });

  it('renders MuiEditModal component with initial values', () => {
    render(
      <Provider store={store}>
        <MuiEditModal open handleClose={() => {}} />
      </Provider>
    );

    const taskNameInput = screen.getByLabelText('Task Name');
    const dateTimeInput = screen.getByLabelText('Data Time');

    expect(taskNameInput.value).toBe('Task 1');
    expect(dateTimeInput.value).toBe('2022-01-11T12:00');
  });

  it('updates state on input change', () => {
    render(
      <Provider store={store}>
        <MuiEditModal open handleClose={() => {}} />
      </Provider>
    );

    const taskNameInput = screen.getByLabelText('Task Name');
    const dateTimeInput = screen.getByLabelText('Data Time');

    fireEvent.change(taskNameInput, { target: { value: 'Updated Task' } });
    fireEvent.change(dateTimeInput, { target: { value: '2022-01-12T15:30' } });

    expect(taskNameInput.value).toBe('Updated Task');
    expect(dateTimeInput.value).toBe('2022-01-12T15:30');
  });

  it('handles edit click and dispatches updateTask action', () => {
    render(
      <Provider store={store}>
        <MuiEditModal open handleClose={() => {}} />
      </Provider>
    );

    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    const actions = store.getActions();
    expect(actions).toEqual([
      {
        type: 'UPDATE_TASK',
        payload: {
          taskName: 'Task 1',
          completionTime: '2022-01-11T12:00',
          notifyTime: '2022-01-11T12:00',
        },
      },
    ]);
  });

  it('handles cancel click and closes the modal', () => {
    const handleClose = jest.fn();
    render(
      <Provider store={store}>
        <MuiEditModal open handleClose={handleClose} />
      </Provider>
    );

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(handleClose).toHaveBeenCalled();
  });
});
