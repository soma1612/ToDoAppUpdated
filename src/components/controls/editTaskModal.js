import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, Button, DialogTitle, TextField, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask } from '../../redux/actions/taskActions';
import PropTypes from 'prop-types';



const MuiEditModal = (props) => {

    const { open, handleClose } = props;
    const dispatch = useDispatch();
    const saveTask = useSelector((state) => state.saveTask);
    const selectedTaskToEdit = useSelector((state) => state.selectedTaskToEdit);

    const [taskName, setTaskName] = useState('');
    const [completionTime, setCompletionTime] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Find the selected item in the savedData array
        const selectedTask = saveTask.find((item) => item.id === selectedTaskToEdit);

        // If the selected item exists, set the taskName state to its taskName
        if (selectedTask) {
            setTaskName(selectedTask.taskName || '');
            setCompletionTime(selectedTask.completionTime || '')
        }
    }, [selectedTaskToEdit, saveTask]);

    const convertDateTimeFormat = (inputStr) => {
        const inputDate = new Date(inputStr);
        const formattedDate =
            ("0" + inputDate.getHours()).slice(-2) +
            ":" +
            ("0" + inputDate.getMinutes()).slice(-2) +
            (inputDate.getHours() < 12 ? "AM" : "PM") +
            ", " +
            ("0" + inputDate.getDate()).slice(-2) +
            "/" +
            ("0" + (inputDate.getMonth() + 1)).slice(-2) +
            "/" +
            inputDate.getFullYear();
        return formattedDate;
    };



    const handleSubmitEditClick = () => {
        if (!taskName) {
            setError('Please enter a task.');
        } else {

            const formattedCompletedDateTime = convertDateTimeFormat(completionTime);

            //save data
            const taskDetailsToEdit = {
                taskName: taskName,
                completionTime: completionTime //formattedCompletedDateTime,
                //notifyTime: completionTime
                // completionTime: formattedCompletedDateTime
            }

            dispatch(updateTask(taskDetailsToEdit));
            setTaskName('');
            setCompletionTime('');
            handleClose();
        }

    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmitEditClick();
        }
    };


    const handleCloseDialog = () => {
        handleClose();
        setTaskName('');
        setCompletionTime('');
    }

    return (
        <>
            {selectedTaskToEdit !== null && (
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle >Edit Task</DialogTitle>

                    <DialogContent>

                        <TextField
                            required
                            id="txtTask"
                            label="Task Name"
                            variant="standard"
                            value={taskName}
                            // value={taskName || saveTask.find((item) => item.id === selectedTaskToEdit).taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />

                        <br />

                        <TextField
                            id="txtDataTime"
                            type="datetime-local"
                            variant="standard"
                            style={{ marginTop: '16px' }}
                            value={completionTime}
                            //value={completionTime || saveTask.find((item) => item.id === selectedTaskToEdit).completionTime}
                            // onChange={(e) => setCompletionTime(convertDateTimeFormat(e.target.value))}
                            onChange={(e) => setCompletionTime(e.target.value)}
                            required
                        />

                        {error && <Alert severity="error" style={{ marginTop: '10px' }}>{error}</Alert>}

                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleSubmitEditClick} autoFocus>Edit</Button>
                        <Button onClick={handleCloseDialog} >Cancle</Button>
                    </DialogActions>

                </Dialog>
            )}
        </>)

}

MuiEditModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};
export default MuiEditModal;