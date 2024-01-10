import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MuiCard from '../../controls/card';

describe('MuiCard component', () => {
  const taskDetails = {
    id: 1,
    taskName: 'Sample Task',
    completionTime: '10:00 AM',
  };

  test('renders MuiCard correctly', () => {
    const { getByText } = render(<MuiCard page="home" taskDetails={taskDetails} />);
    
    expect(getByText('Sample Task')).toBeInTheDocument();
    expect(getByText('10:00 AM')).toBeInTheDocument();
  });

  test('calls onDelete when delete button is clicked', () => {
    const mockDeleteTask = jest.fn();
    const { getByLabelText } = render(
      <MuiCard page="home" taskDetails={taskDetails} onDelete={mockDeleteTask} />
    );

    fireEvent.click(getByLabelText('delete'));

    expect(mockDeleteTask).toHaveBeenCalledWith(1);
  });

  test('calls onEdit and opens modal when edit button is clicked', () => {
    const mockEditTask = jest.fn();
    const { getByLabelText, getByTestId } = render(
      <MuiCard page="home" taskDetails={taskDetails} onEdit={mockEditTask} />
    );

    fireEvent.click(getByLabelText('edit'));

    expect(mockEditTask).toHaveBeenCalledWith(1);
    expect(getByTestId('edit-modal')).toBeInTheDocument();
  });

  // Add more tests as needed
});
