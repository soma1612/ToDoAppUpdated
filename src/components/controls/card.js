import React, { useState } from 'react';
import { Card, CardContent, Typography, CardActions, IconButton, Checkbox } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { completeTask, deleteTask, selectTaskToEdit } from '../../redux/actions/taskActions';
import MuiEditModal from './editTaskModal';
//import PropTypes from 'prop-types';

const MuiCard = (props) => {
    const { page, taskDetails } = props;
    const [checked, setChecked] = useState(false);
    const [isopenModal, setIsOpenModal] = useState(false);

    const openModal = () => { setIsOpenModal(true); };
    const closeModal = () => { setIsOpenModal(false); };

    const dispatch = useDispatch();

    const handleChange = (taskId) => {
        dispatch(completeTask(taskId));
    };

    const onDelete = (taskId) => {
         dispatch(deleteTask(taskId));
    }

    const onEdit = (taskId) => {
        dispatch(selectTaskToEdit(taskId))
        openModal(); 
    }

    return (
        <>
            <Card
                key={taskDetails.id}
                style={{
                    margin: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>

                <CardContent
                    style={{ display: 'flex', alignItems: 'center' }}>

                    {page.includes("home") ? (
                        <Checkbox
                            checked={checked}
                            onChange={() => handleChange(taskDetails.id)}
                            style={{ paddingLeft: "0px" }}
                        />
                    ) : null}

                    <Typography
                        style={{ marginLeft: '8px', textTransform: 'uppercase' }}>
                        <div>{taskDetails.taskName}</div>
                         <div>{taskDetails.completionTime}</div>
                    </Typography>
                </CardContent>
                {page.includes("home") ? (
                    <CardActions>

                        <IconButton
                            aria-label="edit"
                            onClick={() => onEdit(taskDetails.id)}>
                            <EditIcon />
                        </IconButton>
                        <MuiEditModal open={isopenModal} handleClose={closeModal} />

                        <IconButton
                            aria-label="delete"
                            onClick={() => onDelete(taskDetails.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </CardActions>
                ) : (
                    null
                )}
            </Card>
        </>
    )
}

// PageComponent.propTypes = {
//     page: PropTypes.string.isRequired,
//     taskDetails: PropTypes.object.isRequired,
//     taskDetails: PropTypes.shape({
//         includes: PropTypes.func.isRequired,
//         taskName: PropTypes.string.isRequired,
//         completionTime: PropTypes.string.isRequired,
//       }).isRequired,
//   };


export default MuiCard;