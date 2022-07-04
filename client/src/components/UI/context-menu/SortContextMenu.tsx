import React from 'react';
import {setCreatePopupDisplay, setUploadPopupDisplay} from '../../../store/reducers/filesReducer';
import {useAppDispatch} from '../../../hooks/useAppDispatch';
import {AiOutlineCheck} from 'react-icons/ai';
import './contextMenu.scss'

const SortContextMenu = () => {
    const dispatch = useAppDispatch()

    return (
        <div className='context__menu' id='sort-context-menu'>
            <div
                className='grid grid-item px-4 py-1 mt-4 hover:bg-neutral-100 cursor-pointer'
                onClick={() => dispatch(setCreatePopupDisplay('block'))}
            >
                <AiOutlineCheck size={20}/>
                По названию
            </div>
            <div
                className='grid grid-item px-4 py-1 mb-4 hover:bg-neutral-100 cursor-pointer'
                onClick={() => dispatch(setUploadPopupDisplay('block'))}
            >
                <div></div>
                По дате
            </div>
        </div>
    );
};

export default SortContextMenu;