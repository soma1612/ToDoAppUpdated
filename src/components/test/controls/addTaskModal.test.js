import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import MuiModal from '../../controls/addTaskModal';

// Mock the useDispatch hook
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

// Mock the react-notifications library to avoid unwanted side effects during testing
jest.mock('react-notifications', () => ({
  NotificationContainer: jest.fn(() => null),
  NotificationManager: {
    warning: jest.fn(),
  },
}));

// Mock the saveTask action creator
const mockSaveTask = jest.fn();

// Create a mock store
const mockStore = configureMockStore([]);
const store = mockStore({
  // Add your Redux state mock here if needed
});

describe('MuiModal component', () => {
  test('renders MuiModal correctly', () => {
    render(
      <Provider store={store}>
        <MuiModal open={true} handleClose={() => {}} />
      </Provider>
    );

    // Add your assertions based on the rendered content
    expect(screen.getByLabelText('Task Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Data Time')).toBeInTheDocument();
    // ...
  });

  test('handles form submission correctly', () => {
    // Set up initial state or use Redux store if needed
    // For example, mockStore({ taskReducer: { /* add your initial state here */ } })

    // Mock useDispatch to return the mockSaveTask function
    useDispatch.mockReturnValue(mockSaveTask);

    render(
      <Provider store={store}>
        <MuiModal open={true} handleClose={() => {}} />
      </Provider>
    );

    // Simulate user input
    fireEvent.change(screen.getByLabelText('Task Name'), { target: { value: 'Sample Task' } });
    fireEvent.change(screen.getByLabelText('Data Time'), { target: { value: '2024-01-01T12:00' } });

    // Simulate form submission
    fireEvent.click(screen.getByText('Add'));

    // Check if saveTask action creator is called with the correct arguments
    expect(mockSaveTask).toHaveBeenCalledWith({
      id: expect.any(String),
      taskName: 'Sample Task',
      completionTime: expect.any(String),
      notifyTime: '2024-01-01T12:00',
    });
  });

  // Add more tests as needed
});
