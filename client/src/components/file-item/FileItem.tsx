import React, {FC} from 'react';
import {IFile} from '../../types/file';
import {RiFolderUserFill} from 'react-icons/ri';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {pushToDirStack, setCurrentDir} from '../../store/reducers/filesReducer';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import styles from './fileItem.module.scss'

interface FileItemProps {
    file: IFile
}

const FileItem: FC<FileItemProps> = ({file}) => {
    const dispatch = useAppDispatch()
    const {dirStack} = useTypedSelector(state => state.files)

    function openDirHandler(file: IFile) {
        if (file.type === 'dir') {
            const idNum = dirStack[dirStack.length-1].id + 1
            dispatch(setCurrentDir(file._id))
            dispatch(pushToDirStack({id: idNum, name: file.name}))
        }
    }

    return (
        <div
            className={styles.file}
            onDoubleClick={() => openDirHandler(file)}
            draggable={true}
        >
            <RiFolderUserFill size={22} className='mr-4 text-neutral-500'/>
            {file.name}
        </div>
    );
};

export default FileItem;