import React from 'react';
import Navbar from '../../components/UI/navbar/Navbar';
import LeftSideMenu from '../../components/left-side-menu/LeftSideMenu';

const TrashCanPage = () => {
    return (
        <div>
            <Navbar/>
            <div className='px-3 grid grid-primary'>
                <LeftSideMenu/>
                <h1 className='text-4xl text-center'>Trash Can Page</h1>
                <div></div>
            </div>
        </div>
    );
};

export default TrashCanPage;