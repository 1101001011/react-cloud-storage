import React from 'react';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import FileItem from '../file-item/FileItem';
import {IoMdArrowDown, IoMdArrowUp} from 'react-icons/io';
import styles from './fileList.module.scss'

const FileList = () => {
    const allFiles = useTypedSelector(state => state.files.files)
    const dirs = allFiles.filter(file => file.type === 'dir')
    const files = allFiles.filter(file => file.type !== 'dir')

    return (
        <div className='flex flex-col grow'>
            {dirs.length > 0 &&
                <div className='flex items-center py-3 px-4 text-sm font-medium text-neutral-600'>
                    <span className='grow'>Папки</span>
                    <div className='flex items-center'>
                        <span className='py-3 hover:bg-neutral-100 rounded-md cursor-pointer'>Названиe</span>
                        <IoMdArrowUp size={20} className='ml-3'/>
                    </div>
                </div>
            }
            <div className={styles.file__list}>
                {dirs.map(dir => <FileItem file={dir} key={dir._id}/>)}
            </div>
            {files.length > 0 &&
                <div className='flex items-center py-6 px-4 text-sm font-medium text-neutral-600'>
                    <span>Файлы</span>
                </div>
            }
            <div className={styles.file__list}>
                {files.map(file => <FileItem file={file} key={file._id}/>)}
            </div>
        </div>

    )
}

export default FileList;