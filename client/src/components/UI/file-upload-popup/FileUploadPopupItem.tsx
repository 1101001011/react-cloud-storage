import React, {FC} from 'react';
import {IoMdImage} from 'react-icons/io';
import {IoCheckmarkCircle} from 'react-icons/io5';
import {IUploadFile} from '../../../types/upload';
import styles from './fileUploadPopupItem.module.scss'

interface FileUploadItemProps {
    file: IUploadFile
}

const FileUploadPopupItem: FC<FileUploadItemProps> = ({file}) => {
    return (
        <div className={styles.upload__item__wrap}>
            <div className={styles.upload__item}>
                <IoMdImage size={22} className='mr-4 text-orange-600'/>
                <p className={styles.upload__name}>{file.name}</p>
                {file.progress === 100 &&
                    <IoCheckmarkCircle size={24} className='ml-auto text-green-600'/>
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