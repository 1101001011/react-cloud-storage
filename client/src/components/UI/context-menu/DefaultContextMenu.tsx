import React from 'react';
import {setCreatePopupDisplay, setUploadPopupDisplay} from '../../../store/reducers/filesReducer';
import {MdOutlineCreateNewFolder, MdOutlineUploadFile} from 'react-icons/md';
import {useAppDispatch} from '../../../hooks/useAppDispatch';
import './contextMenu.scss'

const DefaultContextMenu = () => {
    const dispatch = useAppDispatch()

    return (
        <div className='context__menu' id='default-context-menu'>
            <div
                className='grid grid-item px-4 py-1 mt-4 hover:bg-neutral-100 cursor-pointer'
                onClick={() => dispatch(setCreatePopupDisplay('block'))}
            >
                <MdOutlineCreateNewFolder size={25} className='text-neutral-500'/>
                Создать папку
            </div>
            <hr className='my-1.5'/>
            <div
                className='grid grid-item px-4 py-1 mb-4 hover:bg-neutral-100 cursor-pointer'
                onClick={() => dispatch(setUploadPopupDisplay('block'))}
            >
                <MdOutlineUploadFile size={25} className='text-neutral-500'/>
                Загрузить файл
            </div>
        </div>
    );
};

export default DefaultContextMenu;