import React, {FC} from 'react';
import {IoMdStarOutline} from 'react-icons/io';
import {MdDriveFileRenameOutline} from 'react-icons/md';
import {BiInfoCircle} from 'react-icons/bi';
import {RiDeleteBin6Line} from 'react-icons/ri';
import {deleteFile, setInfoMenuFile} from '../../../store/reducers/filesReducer';
import {useAppDispatch} from '../../../hooks/useAppDispatch';
import {IFile} from '../../../types/file';
import './contextMenu.scss'
import {useTypedSelector} from '../../../hooks/useTypedSelector';

interface DirContextMenuProps {
    file: IFile
}

const DirContextMenu: FC<DirContextMenuProps> = ({file}) => {
    const dispatch = useAppDispatch()
    const {currentDir} = useTypedSelector(state => state.files)
    const contextMenu = document.querySelector('#dir-context-menu') as HTMLElement

    async function deleteFileHandler() {
        await dispatch(deleteFile({file, parent: currentDir}))
        dispatch(setInfoMenuFile(null))
    }

    function dirContextMenuHandler(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation()
        contextMenu.classList.remove('active')
    }

    return (
        <div
            className='context__menu' id='dir-context-menu'
            onClick={e => dirContextMenuHandler(e)}
        >
            <div className='grid grid-item px-4 py-1 mt-4 hover:bg-neutral-100 cursor-pointer'>
                <IoMdStarOutline size={25} className='text-neutral-500'/>
                Добавить в помеченные
            </div>
            <div className='grid grid-item px-4 py-1 hover:bg-neutral-100 cursor-pointer'>
                <MdDriveFileRenameOutline size={25} className='text-neutral-500'/>
                Переименовать
            </div>
            <hr className='my-1.5'/>
            <div
                className='grid grid-item px-4 py-1 hover:bg-neutral-100 cursor-pointer'
                onClick={() => dispatch(setInfoMenuFile(file))}
            >
                <BiInfoCircle size={25} className='text-neutral-500'/>
                Показать свойства
            </div>
            <hr className='my-1.5'/>
            <div
                className='grid grid-item px-4 py-1 mb-4 hover:bg-neutral-100 cursor-pointer'
                onClick={() => deleteFileHandler()}
            >
                <RiDeleteBin6Line size={23} className='text-neutral-500'/>
                Удалить
            </div>
        </div>
    );
};

export default DirContextMenu;