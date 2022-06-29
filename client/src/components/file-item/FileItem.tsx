import React, {FC} from 'react';
import {IFile} from '../../types/file';
import {RiFolderUserFill} from 'react-icons/ri';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {pushToDirStack, setContextMenuFile, setContextMenuType, setCurrentDir} from '../../store/reducers/filesReducer';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {IoMdImage} from 'react-icons/io';
import './fileItem.scss'

interface FileItemProps {
    file: IFile
}

const FileItem: FC<FileItemProps> = ({file}) => {
    const dispatch = useAppDispatch()
    const {dirStack} = useTypedSelector(state => state.files)
    const contextMenu = document.querySelector('#context-menu') as HTMLElement

    function openDirHandler(file: IFile) {
        if (file.type === 'dir') {
            const idNum = dirStack[dirStack.length-1].id + 1
            dispatch(setCurrentDir(file._id))
            dispatch(pushToDirStack({id: idNum, name: file.name}))
        }
    }

    function openContextMenuHandler(e: React.MouseEvent<HTMLDivElement>) {
        if (file.type !== 'dir') {
            dispatch(setContextMenuType('file'))
            dispatch(setContextMenuFile(file))
            contextMenu.classList.add('active')
            contextMenu.style.left = String(e.clientX) + 'px'
            contextMenu.style.top = String(e.clientY) + 'px'
        } else {
            dispatch(setContextMenuType('dir'))
            contextMenu.classList.add('active')
            contextMenu.style.left = String(e.clientX) + 'px'
            contextMenu.style.top = String(e.clientY) + 'px'
        }
    }

    return (
        <div
            className='file__item'
            onDoubleClick={() => openDirHandler(file)}
            onContextMenu={(e) => openContextMenuHandler(e)}
            draggable={true}
        >
            {file.type === 'dir'
                ? <RiFolderUserFill size={22} className='mr-4 text-neutral-500'/>
                : <IoMdImage size={22} className='mr-4 text-orange-600'/>
            }
            {file.name}
        </div>
    )
}

export default FileItem;