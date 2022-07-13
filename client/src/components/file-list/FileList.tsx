import React, {FC} from 'react';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import FileItem from '../file-item/FileItem';
import {IoMdArrowUp} from 'react-icons/io';
import {TiFlowSwitch} from 'react-icons/ti';
import {GiFallingStar} from 'react-icons/gi';
import {calcLocationSortContextMenu} from '../../utils/calcLocationSortContextMenu';
import {IFile} from '../../types/file';
import {IStarredFile} from '../../types/starredFile';
import './fileList.scss'

interface FileListProps {
    allFiles: IFile[] | IStarredFile[]
    sortValue: string | null
}

const FileList: FC<FileListProps> = ({allFiles, sortValue}) => {
    const isFilesLoader = useTypedSelector(state => state.files.isLoader)
    const isStarredFilesLoader = useTypedSelector(state => state.starredFiles.isLoader)
    const dirs = allFiles.filter(file => file.type === 'dir')
    const files = allFiles.filter(file => file.type !== 'dir')
    const sortContextMenu = document.querySelector('#sort-context-menu') as HTMLElement

    function openSortContextMenu() {
        const sortButton = document.querySelector('.sort__btn') as HTMLElement
        sortContextMenu.classList.add('active')
        calcLocationSortContextMenu(sortButton, sortContextMenu)
    }

    if (isFilesLoader || isStarredFilesLoader) {
        return (
            <div className='text-center mt-40'>
                <div className="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    }

    if (window.location.pathname === '/storage/starred' && allFiles.length === 0) {
        return (
            <div className='flex flex-col items-center mt-36'>
                <GiFallingStar size={100} className='mb-4 text-violet-600'/>
                <p className='text-lg font-medium text-neutral-600'>
                    Нет помеченных файлов
                </p>
                <p className='text-sm text-neutral-500'>
                    Добавляйте важные файлы в помеченные, чтобы они всегда были под рукой
                </p>
            </div>
        )
    }
    if (window.location.pathname === '/storage/main' && allFiles.length === 0) {
        return (
            <div className='flex flex-col items-center mt-36'>
                <TiFlowSwitch size={100} className='mb-4 text-violet-600'/>
                <p className='text-lg font-medium text-neutral-600'>
                    Перетащите файлы сюда
                </p>
                <p className='text-sm text-neutral-500'>
                    или нажмите кноку "Создать папку"
                </p>
            </div>
        )
    }

    return (
        <div className='pb-2'>
            {dirs.length > 0 &&
                <div className='dirs__header'>
                    <span className='grow'>Папки</span>
                    <div className='flex items-center'>
                        <span
                            className='sort__btn'
                            onClick={() => openSortContextMenu()}
                            data-sort
                        >
                            {(!sortValue || sortValue === 'name') && 'Название'}
                            {sortValue === 'type' && 'Тип'}
                            {sortValue === 'date' && 'Дата'}
                        </span>
                        <IoMdArrowUp size={18} className='ml-3'/>
                    </div>
                </div>
            }
            <div className='file__list'>
                {dirs.map(dir => <FileItem file={dir} key={dir._id}/>)}
            </div>
            {files.length > 0 &&
                <div
                    className='flex items-center text-sm font-medium text-neutral-600'
                    style={dirs.length === 0 ? {padding: '0.75rem 1rem'} : {padding: '1.5rem 1rem'}}
                >
                    <span className='grow'>Файлы</span>
                    {dirs.length === 0 &&
                        <div className='flex items-center'>
                        <span
                            className='sort__btn'
                            onClick={() => openSortContextMenu()}
                            data-sort
                        >
                            {(!sortValue || sortValue === 'name') && 'Название'}
                            {sortValue === 'type' && 'Тип'}
                            {sortValue === 'date' && 'Дата'}
                        </span>
                            <IoMdArrowUp size={18} className='ml-3'/>
                        </div>
                    }
                </div>
            }
            <div className='file__list'>
                {files.map(file => <FileItem file={file} key={file._id}/>)}
            </div>
        </div>
    )
}

export default FileList;