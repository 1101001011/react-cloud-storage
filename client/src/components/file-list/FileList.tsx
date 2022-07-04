import React from 'react';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import FileItem from '../file-item/FileItem';
import {IoMdArrowUp} from 'react-icons/io';
import {TiFlowSwitch} from 'react-icons/ti';
import {calcLocationSortContextMenu} from '../../utils/calcLocationSortContextMenu';
import './fileList.scss'

const FileList = ({sortValue}: {sortValue: string | null}) => {
    const allFiles = useTypedSelector(state => state.files.files)
    const isLoader = useTypedSelector(state => state.files.isLoader)
    const dirs = allFiles.filter(file => file.type === 'dir')
    const files = allFiles.filter(file => file.type !== 'dir')
    const sortContextMenu = document.querySelector('#sort-context-menu') as HTMLElement

    function openSortContextMenu() {
        const sortButton = document.querySelector('.sort__btn') as HTMLElement
        sortContextMenu.classList.add('active')
        calcLocationSortContextMenu(sortButton, sortContextMenu)
    }

    if (isLoader) {
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

    if (allFiles.length === 0) {
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
                        >
                            Названиe
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