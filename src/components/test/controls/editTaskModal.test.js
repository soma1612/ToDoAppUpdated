import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import MuiEditModal from '../../controls/editTaskModal';

// Mock the useDispatch and useSelector hooks
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

// Mock the updateTask action creator
const mockUpdateTask = jest.fn();

// Create a mock store
const mockStore = configureMockStore([]);

describe('MuiEditModal component', () => {
  const mockSelectedTaskToEdit = 'sampleTaskId';
  const mockSaveTask = [
    {
      id: 'sampleTaskId',
      taskName: 'Sample Task',
      completionTime: '2024-01-01T12:00:00.000Z',
    },
  ];

  test('renders MuiEditModal correctly', () => {
    // Mock the useSelector hook to return the necessary data
    jest.spyOn(React, 'useSelector').mockReturnValueOnce(mockSelectedTaskToEdit);
    jest.spyOn(React, 'useSelector').mockReturnValueOnce(mockSaveTask);

    render(
      <Provider store={mockStore({})}>
        <MuiEditModal open={true} handleClose={() => {}} />
      </Provider>
    );

    // Add your assertions based on the rendered content
    expect(screen.getByLabelText('Task Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Data Time')).toBeInTheDocument();
    // ...
  });

  test('handles form submission correctly', () => {
    // Mock the useDispatch hook to return the mockUpdateTask function
    jest.spyOn(React, 'useDispatch').mockReturnValueOnce(mockUpdateTask);

    // Mock the useSelector hook to return the necessary data
    jest.spyOn(React, 'useSelector').mockReturnValueOnce(mockSelectedTaskToEdit);
    jest.spyOn(React, 'useSelector').mockReturnValueOnce(mockSaveTask);

    render(
      <Provider store={mockStore({})}>
        <MuiEditModal open={true} handleClose={() => {}} />
      </Provider>
    );

    // Simulate user input
    fireEvent.change(screen.getByLabelText('Task Name'), { target: { value: 'Updated Task' } });
    fireEvent.change(screen.getByLabelText('Data Time'), { target: { value: '2024-01-01T14:00' } });

    // Simulate form submission
    fireEvent.click(screen.getByText('Edit'));

    // Check if updateTask action creator is called with the correct arguments
    expect(mockUpdateTask).toHaveBeenCalledWith({
      taskName: 'Updated Task',
      completionTime: '2024-01-01T14:00:00.000Z',
    });
  });

  // Add more tests as needed
});
