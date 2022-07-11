import React from 'react';
import Navbar from '../../components/UI/navbar/Navbar';
import LeftSideMenu from '../../components/left-side-menu/LeftSideMenu';

const StarredFilesPage = () => {
    return (
        <div>
            <Navbar/>
            <div className='grid grid-primary'>
                <LeftSideMenu/>
                <h1 className='text-4xl text-center'>Starred Files</h1>
                <div></div>
            </div>
        </div>
    );
};

export default StarredFilesPage;