import React from 'react';
import FileUploadPopupItem from './FileUploadPopupItem';
import {useTypedSelector} from '../../../hooks/useTypedSelector';
import {useAppDispatch} from '../../../hooks/useAppDispatch';
import {hideUploadLoader, setDefaultFiles} from '../../../store/reducers/uploadReducer';

const FileUploadPopup = () => {
    const dispatch = useAppDispatch()
    const {files, isVisible, selectedFilesCount} = useTypedSelector(state => state.upload)

    function closeFileUploadPopupHandler() {
        dispatch(hideUploadLoader())
        dispatch(setDefaultFiles())
    }

    return (
        isVisible
            ?
            <div className='fixed bottom-0 right-8 w-96 h-auto bg-white text-neutral-600 shadow-primary'>
                <div className='px-6 py-4 text-l text-neutral-200 flex items-center justify-between bg-neutral-800 rounded-t-md'>
                    {(files.filter(file => file.progress === 100)).length === files.length
                        ? <div>Загрузка завершена</div>
                        : <div>Загрузка {selectedFilesCount} {selectedFilesCount === 1 ? 'объекта...' : 'объектов...'}</div>
                    }
                    <button
                        className='text-xl'
                        onClick={() => closeFileUploadPopupHandler()}
                    >
                        &times;
                    </button>
                </div>
                {files.map(file =>
                    <FileUploadPopupItem file={file} key={file.id}/>
                )}
            </div>
            :
            null
    );
};

export default FileUploadPopup;