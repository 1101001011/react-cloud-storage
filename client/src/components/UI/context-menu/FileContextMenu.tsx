import React, {FC} from 'react';
import {IoMdStarOutline} from 'react-icons/io';
import {MdDriveFileRenameOutline, MdOutlineFileDownload} from 'react-icons/md';
import {BiInfoCircle} from 'react-icons/bi';
import {RiDeleteBin6Line} from 'react-icons/ri';
import {deleteFile, downloadFile, setInfoMenuFile} from '../../../store/reducers/filesReducer';
import {useAppDispatch} from '../../../hooks/useAppDispatch';
import {IFile} from '../../../types/file';
import './contextMenu.scss'
import {useTypedSelector} from '../../../hooks/useTypedSelector';

interface FileContextMenuProps {
    file: IFile
}

const FileContextMenu: FC<FileContextMenuProps> = ({file}) => {
    const dispatch = useAppDispatch()
    const {currentDir} = useTypedSelector(state => state.files)
    const contextMenu = document.querySelector('#file-context-menu') as HTMLElement

    function downloadFileHandler(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation()
        dispatch(downloadFile(file))
        contextMenu.classList.remove('active')
    }

    async function deleteFileHandler() {
        await dispatch(deleteFile({file, parent: currentDir}))
        dispatch(setInfoMenuFile(null))
    }

    function fileContextMenuHandler(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation()
        contextMenu.classList.remove('active')
    }

    return (
        <div
            className='context__menu' id='file-context-menu'
            onClick={e => fileContextMenuHandler(e)}
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
            <div
                className='grid grid-item px-4 py-1 hover:bg-neutral-100 cursor-pointer'
                onClick={e => downloadFileHandler(e)}
            >
                <MdOutlineFileDownload size={25} className='text-neutral-500'/>
                Скачать
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

export default FileContextMenu;