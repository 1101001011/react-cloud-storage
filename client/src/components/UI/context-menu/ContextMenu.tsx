import React, {FC} from 'react';
import {IoMdStarOutline} from 'react-icons/io';
import {
    MdDriveFileRenameOutline,
    MdOutlineCreateNewFolder,
    MdOutlineFileDownload,
    MdOutlineUploadFile
} from 'react-icons/md';
import {RiDeleteBin6Line} from 'react-icons/ri';
import {BiInfoCircle} from 'react-icons/bi';
import {useAppDispatch} from '../../../hooks/useAppDispatch';
import {downloadFile, setCreatePopupDisplay, setUploadPopupDisplay} from '../../../store/reducers/filesReducer';
import './contextMenu.scss'
import {IFile} from '../../../types/file';

interface ContextMenuProps {
    type: string
    file: IFile
}

const ContextMenu: FC<ContextMenuProps> = ({type, file}) => {
    const dispatch = useAppDispatch()
    const contextMenu = document.querySelector('#context-menu') as HTMLElement

    function downloadFileHandler(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation()
        dispatch(downloadFile(file))
        contextMenu.classList.remove('active')
    }

    return (
        type === 'file'
            ?
            <div className='context__menu' id='context-menu'>
                <div className='grid grid-item px-4 py-1 mt-4 hover:bg-neutral-100 cursor-pointer'>
                    <IoMdStarOutline size={25} className='text-neutral-500'/>
                    Добавить в помеченные
                </div>
                <div className='grid grid-item px-4 py-1 hover:bg-neutral-100 cursor-pointer'>
                    <MdDriveFileRenameOutline size={25} className='text-neutral-500'/>
                    Переименовать
                </div>
                <hr className='my-1.5'/>
                <div className='grid grid-item px-4 py-1 hover:bg-neutral-100 cursor-pointer'>
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
                <div className='grid grid-item px-4 py-1 mb-4 hover:bg-neutral-100 cursor-pointer'>
                    <RiDeleteBin6Line size={23} className='text-neutral-500'/>
                    Удалить
                </div>
            </div>
            :
            type === 'dir'
                ?
                <div className='context__menu' id='context-menu'>
                    <div className='grid grid-item px-4 py-1 mt-4 hover:bg-neutral-100 cursor-pointer'>
                        <IoMdStarOutline size={25} className='text-neutral-500'/>
                        Добавить в помеченные
                    </div>
                    <div className='grid grid-item px-4 py-1 hover:bg-neutral-100 cursor-pointer'>
                        <MdDriveFileRenameOutline size={25} className='text-neutral-500'/>
                        Переименовать
                    </div>
                    <hr className='my-1.5'/>
                    <div className='grid grid-item px-4 py-1 hover:bg-neutral-100 cursor-pointer'>
                        <BiInfoCircle size={25} className='text-neutral-500'/>
                        Показать свойства
                    </div>
                    <hr className='my-1.5'/>
                    <div className='grid grid-item px-4 py-1 mb-4 hover:bg-neutral-100 cursor-pointer'>
                        <RiDeleteBin6Line size={23} className='text-neutral-500'/>
                        Удалить
                    </div>
                </div>
                :
                <div className='context__menu' id='context-menu'>
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
    )
}

export default ContextMenu;