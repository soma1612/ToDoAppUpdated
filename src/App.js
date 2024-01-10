import React from 'react';
import '../src/style/index.css'
import { Paper } from '@mui/material';
import Routing from '../src/components/layout/routing'
import MuiButton from './components/controls/floatingAddButton';
import TaskReminders from './components/controls/TaskReminders';

const App = () => {

    return (
        <>
         <TaskReminders/>
         <div className='App'>  
           <Paper sx={{ padding: '32px' }}>
               <Routing />
               <MuiButton />
           </Paper>
       </div>
        </>
       
    )
}

export default App;