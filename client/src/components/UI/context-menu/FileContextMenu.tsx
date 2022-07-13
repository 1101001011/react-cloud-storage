import React, {FC} from 'react';
import {IoMdStar, IoMdStarOutline} from 'react-icons/io';
import {MdDriveFileRenameOutline, MdOutlineFileDownload} from 'react-icons/md';
import {BiInfoCircle} from 'react-icons/bi';
import {RiDeleteBin6Line} from 'react-icons/ri';
import {downloadFile, setInfoMenuFile, updateFileStatus} from '../../../store/reducers/filesReducer';
import {useAppDispatch} from '../../../hooks/useAppDispatch';
import {IFile} from '../../../types/file';
import {useTypedSelector} from '../../../hooks/useTypedSelector';
import {createStarredFile, deleteStarredFile, setStarredFile} from '../../../store/reducers/starredFilesReducer';
import {IStarredFile} from '../../../types/starredFile';
import {isIFile} from '../../../utils/isIFile';
import './contextMenu.scss'

interface FileContextMenuProps {
    file: IFile | IStarredFile
}

const FileContextMenu: FC<FileContextMenuProps> = ({file}) => {
    const dispatch = useAppDispatch()
    const {files, currentDir} = useTypedSelector(state => state.files)
    const {starredFiles} = useTypedSelector(state => state.starredFiles)
    const contextMenu = document.querySelector('#file-context-menu') as HTMLElement

    const starredFile: IStarredFile | undefined
        = starredFiles.find(f => (f.name === file.name && f.path === file.path))
    const unStarredFile = files.find(f => (f.name === file.name && f.path === file.path))!

    function fileContextMenuHandler(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation()
        contextMenu.classList.remove('active')
    }

    async function deleteFileHandler() {
        if (isIFile(file)) {
            await dispatch(updateFileStatus({file, parent: currentDir}))
            if (starredFile) {
                dispatch(setStarredFile(starredFile))
                dispatch(deleteStarredFile(starredFile))
            }
        } else {
            dispatch(updateFileStatus({file: unStarredFile, parent: currentDir}))
            dispatch(setStarredFile(starredFile))
            await dispatch(deleteStarredFile(file))
        }
        dispatch(setInfoMenuFile(null))
    }

    async function deleteStarredFileHandler() {
        if (isIFile(file)) {
            if (starredFile) await dispatch(deleteStarredFile(starredFile))
        } else {
            await dispatch(deleteStarredFile(file))
        }
        dispatch(setInfoMenuFile(null))
    }

    return (
        <div
            className='context__menu' id='file-context-menu'
            onClick={e => fileContextMenuHandler(e)}
        >
            {!starredFile ?
                <div
                    className='grid grid-item px-4 py-1 mt-4 hover:bg-neutral-100 cursor-pointer'
                    onClick={() => dispatch(createStarredFile(file))}
                >
                    <IoMdStarOutline size={25} className='text-neutral-500'/>
                    Добавить в помеченные
                </div>
                :
                <div
                    className='grid grid-item px-4 py-1 mt-4 hover:bg-neutral-100 cursor-pointer'
                    onClick={() => deleteStarredFileHandler()}
                >
                    <IoMdStar size={25} className='text-neutral-500'/>
                    Удалить из помеченных
                </div>
            }

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
            {isIFile(file) ?
                <div
                    className='grid grid-item px-4 py-1 hover:bg-neutral-100 cursor-pointer'
                    onClick={() => dispatch(downloadFile(file))}
                >
                    <MdOutlineFileDownload size={25} className='text-neutral-500'/>
                    Скачать
                </div>
                :
                ''
            }
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