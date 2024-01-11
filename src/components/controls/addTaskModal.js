import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, Button, DialogTitle, TextField, Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { saveTask } from '../../redux/actions/taskActions';
import PropTypes from 'prop-types';

const MuiModal = (props) => {

    const { open, handleClose } = props;

    const [taskName, setTaskName] = useState('');
    const [completionTime, setCompletionTime] = useState('');
    const [error, setError] = useState('');

    const dispatch = useDispatch();

    const generateTaskId = () => {
        return Math.random().toString(36).substring(2, 15);
    };

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

    const handleSubmitClick = () => {
        if (taskName && completionTime) {
            const currentTime = new Date();
            const selectedTime = new Date(completionTime);

            if (selectedTime <= currentTime) {
                setError('Completion time should be greater than the current time.');
                return;
            }

            const formattedCompletedDateTime = convertDateTimeFormat(completionTime);

            //save data
            const taskDetailsToSave = {
                id: generateTaskId(),
                taskName: taskName,
                completionTime: formattedCompletedDateTime,
                notifyTime:completionTime
            }

            dispatch(saveTask(taskDetailsToSave));
            setTaskName('');
            setCompletionTime('');
            setError('');
            handleClose();

        } else if (!taskName && completionTime) {
            setError('Please enter a task.');
        } else if (taskName && !completionTime) {
            setError('Please enter a completion time.');
        } else {
            setError('Please enter a task and completion time.');
        }
    }

    const handleCloseDialog = () => {
        handleClose();
        setTaskName('');
        setCompletionTime('');
        setError('');
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle >Add Task</DialogTitle>

                <DialogContent>

                    <TextField
                        required
                        id="txtTask"
                        label="Task Name"
                        variant="standard"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />

                    <br />

                    <TextField
                        id="txtDataTime"
                        type="datetime-local"
                        variant="standard"
                        style={{ marginTop: '16px' }}
                        value={completionTime}
                        onChange={(e) => setCompletionTime(e.target.value)}
                        required
                    />

                    {error && <Alert severity="error" style={{ marginTop: '10px' }}>{error}</Alert>}

                </DialogContent>

                <DialogActions>
                    <Button onClick={handleSubmitClick} autoFocus>Add</Button>
                    <Button onClick={handleCloseDialog} >Cancel</Button>
                </DialogActions>

            </Dialog>

        </>)

}


MuiModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
  };
export default MuiModal;