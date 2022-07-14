import React, {FC} from 'react';
import {MdHistory} from 'react-icons/md';
import {RiDeleteBin6Line} from 'react-icons/ri';
import {useAppDispatch} from '../../../hooks/useAppDispatch';
import {deleteFile, updateDeletedFileStatus} from '../../../store/reducers/deletedFilesReducer';
import {IFile} from '../../../types/file';
import './contextMenu.scss'
import {createStarredFile} from '../../../store/reducers/starredFilesReducer';
import {useTypedSelector} from '../../../hooks/useTypedSelector';

interface TrashCanContextMenuProps {
    file: IFile
}

const TrashCanContextMenu: FC<TrashCanContextMenuProps> = ({file}) => {
    const dispatch = useAppDispatch()
    const {starredFile} = useTypedSelector(state => state.starredFiles)
    const {deletedFiles} = useTypedSelector(state => state.deletedFiles)
    const contextMenu = document.querySelector('#delete-context-menu') as HTMLElement

    const childrenFiles = deletedFiles.filter(f => f.path.includes(file.path) && f.type !== 'dir')
    const dirs = deletedFiles.filter(f => f.path.includes(file.path) && f.type === 'dir')

    function clickContextMenuHandler(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation()
        contextMenu.classList.remove('active')
    }

    function reestablishDeletedFileHandler() {
        dispatch(updateDeletedFileStatus(file))
        if (file.name === starredFile.name && file.path === starredFile.path) {
            dispatch(createStarredFile(file))
        }
    }

    function deleteDeletedFileHandler() {
        childrenFiles.forEach(f => dispatch(deleteFile(f)))
        dirs.forEach(f => dispatch(deleteFile(f)))
    }

    return (
        <div
            className='context__menu'
            id='delete-context-menu'
            onClick={e => clickContextMenuHandler(e)}
        >
            <div
                className='grid grid-item px-4 py-1 mt-4 hover:bg-neutral-100 cursor-pointer'
                onClick={() => reestablishDeletedFileHandler()}
            >
                <MdHistory size={25} className='text-neutral-500'/>
                Восстановить
            </div>
            <hr className='my-1.5'/>
            <div
                className='grid grid-item px-4 py-1 mb-4 hover:bg-neutral-100 cursor-pointer'
                onClick={() => deleteDeletedFileHandler()}
            >
                <RiDeleteBin6Line size={25} className='text-neutral-500'/>
                Удалить навсегда
            </div>
        </div>
    );
};

export default TrashCanContextMenu;