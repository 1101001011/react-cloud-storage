import React, {FC} from 'react';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import FileItem from '../file-item/FileItem';
import styles from './fileList.module.scss'

const FileList: FC = () => {
    const files = useTypedSelector(state => state.files.files)

    return (
        <div className={styles.file__list}>
            {files.map(file => <FileItem file={file} key={file._id}/>)}
        </div>
    );
};

export default FileList;