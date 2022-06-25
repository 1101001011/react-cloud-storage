import React, {FC} from 'react';
import {IFile} from '../../types/file';
import {RiFolderUserFill} from 'react-icons/ri';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {pushToDirStack, setCurrentDir} from '../../store/reducers/filesReducer';
import styles from './fileItem.module.scss'

interface FileItemProps {
    file: IFile
}

const FileItem: FC<FileItemProps> = ({file}) => {
    const dispatch = useAppDispatch()

    function openDirHandler() {
        dispatch(setCurrentDir(file._id))
        dispatch(pushToDirStack(file.name))
    }

    function openFileHandler() {

    }

    return (
        <div
            className={styles.file}
            onDoubleClick={file.type === 'dir' ? () => openDirHandler() : () => openFileHandler()}
            draggable={true}
        >
            <RiFolderUserFill size={22} className='mr-4 text-neutral-500'/>
            {file.name}
        </div>
    );
};

export default FileItem;