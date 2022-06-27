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

const DiskPage = () => {
    const dispatch = useAppDispatch()
    const {currentDir, uploadPopupDisplay} = useTypedSelector(state => state.files)
    const [dragEnter, setDragEnter] = useState(false)

    useEffect(() => {
        dispatch(getFiles(currentDir))
    }, [currentDir])

    function dragEnterHandler(e: React.DragEvent<HTMLDivElement>) {
        // const modal = document.querySelector('')
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

    return (
        <div
            onDragEnter={e => dragEnterHandler(e)}
            onDragLeave={e => dragLeaveHandler(e)}
            onDragOver={e => dragLeaveHandler(e)}
            className='h-550 flex flex-col'
        >
            <div className='flex'>
                <Button
                    className='btn-primary mr-4 px-8 text-white bg-violet-600 rounded-md'
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
            <p className='mt-auto text-xs text-center font-medium text-neutral-400'>
                Перетащите файлы сюда, чтобы добавить их на Диск
            </p>
            <Popup dragEnter={dragEnter} setDragEnter={setDragEnter}/>
        </div>
    );
};

export default DiskPage;