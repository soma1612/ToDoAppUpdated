import React from 'react';
import '../src/style/index.css'
import { Paper } from '@mui/material';
import Routing from '../src/components/layout/routing'
import MuiButton from './components/controls/floatingAddButton';
import TaskReminders from './components/controls/TaskReminders';

const App = () => {

    return (
        <>
            {/* <TaskReminders/>
         <div className='App'>  
           <Paper sx={{ padding: '32px' }}>
               <Routing />
               <MuiButton />
           </Paper>
       </div> */}
            <div data-testid="task-reminders">
                <TaskReminders />
            </div>

            <div className='App'>
                <Paper sx={{ padding: '32px' }}>
                    <>
                        <div data-testid="routing">
                            <Routing />
                        </div>
                        <div data-testid="mui-button">
                            <MuiButton />
                        </div>
                    </>


                </Paper>
            </div>
        </>

    )
}

export default App;