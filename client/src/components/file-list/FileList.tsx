import React, {FC} from 'react';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import FileItem from '../file-item/FileItem';

const FileList: FC = () => {
    const files = useTypedSelector(state => state.files.files)

    return (
        <div className='mt-10 grid grid-cols-5 gap-4 flex text-sm font-medium text-neutral-600'>
            {files.map(file => <FileItem file={file} key={file._id}/>)}
        </div>
    );
};

export default FileList;