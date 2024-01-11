// app.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from '../../App';

// const mockStore = configureStore([]);

// describe('App Component', () => {
//   it('renders App component with TaskReminders, Routing, and MuiButton', () => {
//     const store = mockStore({
//       // your mock store data if needed
//     });

//     render(
//       <Provider store={store}>
//         <App />
//       </Provider>
//     );

//     // Check if TaskReminders component is rendered
//     const taskRemindersElement = screen.getByTestId('task-reminders');
//     expect(taskRemindersElement).toBeInTheDocument();

//     // Check if Routing component is rendered
//     const routingElement = screen.getByTestId('routing');
//     expect(routingElement).toBeInTheDocument();

//     // Check if MuiButton component is rendered
//     const muiButtonElement = screen.getByTestId('mui-button');
//     expect(muiButtonElement).toBeInTheDocument();
//   });
// });
const mockStore = configureStore([]);

describe('App Component', () => {
    it('renders App component with TaskReminders', () => {
        const store = mockStore({});

        render(
            <Provider store={store}>
                <App />
            </Provider>
        );

        // Check if TaskReminders component is rendered
        const taskRemindersElement = screen.getByTestId('task-reminders');
        expect(taskRemindersElement).toBeInTheDocument();

        // Check if Routing component is rendered
        const routingElement = screen.getByTestId('routing');
        expect(routingElement).toBeInTheDocument();

        // Check if MuiButton component is rendered
        const muiButtonElement = screen.getByTestId('mui-button');
        expect(muiButtonElement).toBeInTheDocument();
    });
});
