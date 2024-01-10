import React, { useState } from 'react';
import MuiCard from '../controls/card';
import { useSelector } from 'react-redux';
import { TextField } from '@mui/material';

const Complete = () => {

    const completeTask = useSelector((state) => state.completeTask);
    const [inputValue, setInputValue] = useState('');

    const filteredData = inputValue
        ? completeTask.filter(
            (item) => item.taskName.toLowerCase().includes(inputValue.toLowerCase())
        )
        : completeTask;

    return (
        <>
            <TextField
                type="text"
                variant="standard"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search Tasks..."
                style={{ margin: "20px 0px 0px", width: "100%" }}
            />
            <hr style={{ margin: '25px 0px' }} />

            <div>
                {filteredData.length > 0 ? (
                    filteredData.map((data) => (
                        <MuiCard page="complete" taskDetails={data} />
                    ))
                ) : (
                    null
                )}
            </div>
        </>
    )
}

export default Complete;


