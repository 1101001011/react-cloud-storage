import React, {useEffect, useState} from 'react';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {
    getFiles,
    setCreatePopupDisplay,
    setUploadPopupDisplay
} from '../../store/reducers/filesReducer';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import Button from '../../components/UI/button/Button';
import FileList from '../../components/file-list/FileList';
import Popup from '../../components/UI/popup/Popup';
import Breadcrumbs from '../../components/UI/breadcrumbs/Breadcrumbs';
import FileUploadPopup from '../../components/UI/file-upload-popup/FileUploadPopup';
import DefaultContextMenu from '../../components/UI/context-menu/DefaultContextMenu';
import FileContextMenu from '../../components/UI/context-menu/FileContextMenu';
import DirContextMenu from '../../components/UI/context-menu/DirContextMenu';

const DiskPage = () => {
    const dispatch = useAppDispatch()
    const {currentDir, uploadPopupDisplay, contextMenuFile} = useTypedSelector(state => state.files)
    const [dragEnter, setDragEnter] = useState(false)
    const defaultContextMenu = document.querySelector('#default-context-menu') as HTMLElement
    const fileContextMenu = document.querySelector('#file-context-menu') as HTMLElement
    const dirContextMenu = document.querySelector('#dir-context-menu') as HTMLElement

    useEffect(() => {
        dispatch(getFiles(currentDir))
    }, [currentDir])

    function dragEnterHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        e.stopPropagation()
        setDragEnter(true)
        if (uploadPopupDisplay === 'none') {
            dispatch(setUploadPopupDisplay('block'))
        }
    }

    function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        e.stopPropagation()
    }

    function openContextMenuHandler(e: React.MouseEvent<HTMLDivElement>) {
        const fileItems = document.getElementsByClassName('file__item')

        if (!(Array.from(fileItems).includes(e.target as Element))) {
            fileContextMenu.classList.remove('active')
            dirContextMenu.classList.remove('active')
            defaultContextMenu.classList.add('active')
            defaultContextMenu.style.left = String(e.clientX) + 'px'
            defaultContextMenu.style.top = String(e.clientY) + 'px'
        }
    }

    function closeContextMenu() {
        defaultContextMenu.classList.remove('active')
        fileContextMenu.classList.remove('active')
        dirContextMenu.classList.remove('active')
    }

    return (
        <div
            onDragEnter={e => dragEnterHandler(e)}
            onDragLeave={e => dragLeaveHandler(e)}
            onDragOver={e => dragLeaveHandler(e)}
            onContextMenu={e => openContextMenuHandler(e)}
            onClick={() => closeContextMenu()}
            className='mb-20 h-auto h-min-550 flex flex-col'
        >
            <div className='flex'>
                <Button
                    className='btn-primary mr-3 px-8 text-white bg-violet-600 rounded-md'
                    onClick={() => dispatch(setCreatePopupDisplay('block'))}
                >
                    Создать папку
                </Button>
                <Button
                    className='btn-primary px-8 text-white bg-violet-600 rounded-md'
                    onClick={() => dispatch(setUploadPopupDisplay('block'))}
                >
                    Загрузить файл
                </Button>
            </div>
            <Breadcrumbs/>
            <FileList/>
            <p className='mt-8 text-xs text-center font-medium text-neutral-400'>
                Перетащите файлы сюда, чтобы добавить их на Диск
            </p>
            <Popup dragEnter={dragEnter} setDragEnter={setDragEnter}/>
            <DefaultContextMenu/>
            <FileContextMenu file={contextMenuFile}/>
            <DirContextMenu file={contextMenuFile}/>
            <FileUploadPopup/>
        </div>
    );
};

export default DiskPage;