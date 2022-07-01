import React, {FC} from 'react';
import {IoMdImage} from 'react-icons/io';
import {IoCheckmarkCircle} from 'react-icons/io5';
import {IUploadFile} from '../../../types/upload';

interface FileUploadItemProps {
    file: IUploadFile
}

const FileUploadPopupItem: FC<FileUploadItemProps> = ({file}) => {
    return (
        <div className='p-4 border-b border-neutral-200'>
            <div className='mb-0.5 flex items-center text-l'>
                <IoMdImage size={22} className='mr-4 text-orange-600'/>
                <p className='flex grow'>{file.name}</p>
                {file.progress === 100 &&
                    <IoCheckmarkCircle size={24} className='text-green-600'/>
                }
            </div>
            {file.progress < 100 &&
                <div
                    style={{width: file.progress+'%'}}
                    className='h-loader bg-violet-600'
                >
                </div>
            }
        </div>
    );
};

export default FileUploadPopupItem;