import React, {FC} from 'react';
import {IFile} from '../../types/file';
import {RiFolderUserFill} from 'react-icons/ri';

interface FileItemProps {
    file: IFile
}

const FileItem: FC<FileItemProps> = ({file}) => {
    return (
        <div className='py-3 px-4 flex items-center border border-neutral-300 rounded-md hover:bg-neutral-200'>
            <RiFolderUserFill size={22} className='mr-4 text-neutral-500'/>
            {file.name}
        </div>
    );
};

export default FileItem;