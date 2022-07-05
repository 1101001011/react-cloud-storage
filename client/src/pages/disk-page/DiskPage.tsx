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
import SortContextMenu from '../../components/UI/context-menu/SortContextMenu';
import {calcLocation} from '../../utils/calcLocation';
import './diskPage.scss'
import Navbar from '../../components/UI/navbar/Navbar';

const DiskPage = () => {
    const dispatch = useAppDispatch()
    const {currentDir, uploadPopupDisplay, contextMenuFile} = useTypedSelector(state => state.files)
    const [dragEnter, setDragEnter] = useState(false)
    const [sortValue, setSortValue] = useState<string | null>('name')
    const defaultContextMenu = document.querySelector('#default-context-menu') as HTMLElement
    const fileContextMenu = document.querySelector('#file-context-menu') as HTMLElement
    const dirContextMenu = document.querySelector('#dir-context-menu') as HTMLElement
    const sortContextMenu = document.querySelector('#sort-context-menu') as HTMLElement

    useEffect(() => {
        dispatch(getFiles({currentDir, sortValue}))
    }, [currentDir, sortValue])

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
        const target = e.target as Element

        if (!target.classList.contains('file__item') && target.tagName !== 'path' && target.tagName !== 'svg') {
            fileContextMenu.classList.remove('active')
            dirContextMenu.classList.remove('active')
            sortContextMenu.classList.remove('active')
            defaultContextMenu.classList.add('active')
            calcLocation(e, defaultContextMenu)
        }
    }

    function closeContextMenu(e: React.MouseEvent<HTMLDivElement>) {
        defaultContextMenu.classList.remove('active')
        fileContextMenu.classList.remove('active')
        dirContextMenu.classList.remove('active')
        const sortItems = document.getElementsByClassName('sort__btn')

        if (!(Array.from(sortItems).includes(e.target as Element))) {
            sortContextMenu.classList.remove('active')
        }
    }

    return (
        <div>
            <Navbar/>
            <div
                onDragEnter={e => dragEnterHandler(e)}
                onDragLeave={e => dragLeaveHandler(e)}
                onDragOver={e => dragLeaveHandler(e)}
                onContextMenu={e => openContextMenuHandler(e)}
                onClick={e => closeContextMenu(e)}
                className='px-3 grid grid-primary'
            >
                <div></div>
                <div>
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
                    <div className='px-2 h-auto h-max-min-540 flex flex-col overflow-y-auto'>
                        <FileList sortValue={sortValue}/>
                        <Popup dragEnter={dragEnter} setDragEnter={setDragEnter}/>
                        <DefaultContextMenu/>
                        <FileContextMenu file={contextMenuFile}/>
                        <DirContextMenu file={contextMenuFile}/>
                        <SortContextMenu sortValue={sortValue} setSortValue={setSortValue}/>
                        <FileUploadPopup/>
                    </div>
                </div>
                <div></div>
            </div>
        </div>

    );
};

export default DiskPage;