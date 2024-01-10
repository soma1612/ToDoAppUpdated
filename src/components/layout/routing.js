import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Complete from '../pages/complete';
import Trash from '../pages/trash';
import MuiTab from '../controls/tab';

const Routing = () => {
    return (
        <>
            <BrowserRouter>
                <MuiTab />
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/complete' element={<Complete />}></Route>
                    <Route path='/trash' element={<Trash />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Routing;