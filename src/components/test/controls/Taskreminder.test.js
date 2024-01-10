import React from 'react';
import { render, act } from '@testing-library/react';
import TaskReminder from '../../controls/taskReminder';
import { NotificationContainer, NotificationManager } from 'react-notifications';

// Mock the react-notifications library to avoid unwanted side effects during testing
jest.mock('react-notifications', () => ({
  NotificationContainer: jest.fn(() => null),
  NotificationManager: {
    warning: jest.fn(),
  },
}));

describe('TaskReminder component', () => {
  const mockTaskDetails = {
    taskName: 'Sample Task',
    notifyTime: '2024-01-01T12:00:00.000Z',
  };

  test('renders TaskReminder component', () => {
    render(<TaskReminder taskDetails={mockTaskDetails} />);
    
    expect(NotificationContainer).toHaveBeenCalled();
  });

  test('displays task reminder notification when within 5 minutes', async () => {
    jest.useFakeTimers();

    render(<TaskReminder taskDetails={mockTaskDetails} />);

    // Fast-forward time to 4 minutes and 59 seconds before the task time
    act(() => {
      jest.advanceTimersByTime((5 * 60 * 1000) - 1000);
    });

    // Ensure that the NotificationManager.warning function is called
    expect(NotificationManager.warning).toHaveBeenCalledWith(
      'Your task: Sample Task is coming up in 5 minutes!',
      'Task Reminder',
      5000
    );

    jest.useRealTimers();
  });

  test('does not display task reminder notification when more than 5 minutes away', async () => {
    jest.useFakeTimers();

    render(<TaskReminder taskDetails={mockTaskDetails} />);

    // Fast-forward time to 10 minutes before the task time
    act(() => {
      jest.advanceTimersByTime(10 * 60 * 1000);
    });

    // Ensure that the NotificationManager.warning function is not called
    expect(NotificationManager.warning).not.toHaveBeenCalled();

    jest.useRealTimers();
  });

  // Add more tests as needed
});
