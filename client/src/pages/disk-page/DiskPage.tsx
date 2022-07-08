import React, {useEffect, useState} from 'react';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {getFiles, setInfoMenuFile, setUploadPopupDisplay} from '../../store/reducers/filesReducer';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import FileList from '../../components/file-list/FileList';
import Popup from '../../components/UI/popup/Popup';
import Breadcrumbs from '../../components/UI/breadcrumbs/Breadcrumbs';
import FileUploadPopup from '../../components/UI/file-upload-popup/FileUploadPopup';
import DefaultContextMenu from '../../components/UI/context-menu/DefaultContextMenu';
import FileContextMenu from '../../components/UI/context-menu/FileContextMenu';
import DirContextMenu from '../../components/UI/context-menu/DirContextMenu';
import SortContextMenu from '../../components/UI/context-menu/SortContextMenu';
import {calcLocation} from '../../utils/calcLocation';
import Navbar from '../../components/UI/navbar/Navbar';
import LeftSideMenu from '../../components/left-side-menu/LeftSideMenu';
import RightInfoMenu from '../../components/right-info-menu/RightInfoMenu';
import './diskPage.scss'

const DiskPage = () => {
    const dispatch = useAppDispatch()
    const {
        currentDir,
        uploadPopupDisplay,
        contextMenuFile,
        infoMenuFile
    } = useTypedSelector(state => state.files)
    const [dragEnter, setDragEnter] = useState(false)
    const [sortValue, setSortValue] = useState<string | null>('name')
    const defaultContextMenu = document.querySelector('#default-context-menu') as HTMLElement
    const fileContextMenu = document.querySelector('#file-context-menu') as HTMLElement
    const dirContextMenu = document.querySelector('#dir-context-menu') as HTMLElement
    const sortContextMenu = document.querySelector('#sort-context-menu') as HTMLElement

    useEffect(() => {
        dispatch(getFiles({dispatch, currentDir, sortValue}))
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

        if (!target.classList.contains('file__item') && target.tagName !== 'path'
            && target.tagName !== 'svg' && target.tagName !== 'SPAN') {
            fileContextMenu.classList.remove('active')
            dirContextMenu.classList.remove('active')
            sortContextMenu.classList.remove('active')
            defaultContextMenu.classList.add('active')
            calcLocation(e, defaultContextMenu)
        }
    }

    function closeContextMenu(e: React.MouseEvent<HTMLDivElement>) {
        const target = e.target as Element

        fileContextMenu.classList.remove('active')
        dirContextMenu.classList.remove('active')

        if (!target.getAttribute('data-sort')) {
            sortContextMenu.classList.remove('active')
        }
        if (!target.getAttribute('data-create')) {
            defaultContextMenu.classList.remove('active')
        }
        if (!target.classList.contains('file__item') && !target.getAttribute('data-create')
            && target.tagName !== 'path' && target.tagName !== 'svg' && target.tagName !== 'SPAN') {
            dispatch(setInfoMenuFile(null))
        }
    }

    return (
        <div>
            <Navbar/>
            <div
                onDragEnter={e => dragEnterHandler(e)}
                onDragLeave={e => dragLeaveHandler(e)}
                onDragOver={e => dragLeaveHandler(e)}
                onClick={e => closeContextMenu(e)}
                className='grid grid-primary'
            >
                <LeftSideMenu/>
                <div
                    className='mt-6'
                    onContextMenu={e => openContextMenuHandler(e)}
                >
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
                <RightInfoMenu file={infoMenuFile}/>
            </div>
        </div>

    );
};

export default DiskPage;