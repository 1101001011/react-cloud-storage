import React, {useEffect} from 'react';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {getFiles, setPopupDisplay} from '../../store/reducers/filesReducer';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import Button from '../../components/UI/button/Button';
import FileList from '../../components/file-list/FileList';
import Popup from '../../components/UI/popup/Popup';
import Breadcrumbs from '../../components/UI/breadcrumbs/Breadcrumbs';

const DiskPage = () => {
    const dispatch = useAppDispatch()
    const {currentDir} = useTypedSelector(state => state.files)

    useEffect(() => {
        dispatch(getFiles(currentDir))
    }, [currentDir])

    return (
        <div>
            <Button
                className='btn-primary text-white bg-violet-600 rounded-md'
                onClick={() => dispatch(setPopupDisplay('block'))}
            >
                Создать папку
            </Button>
            <Breadcrumbs/>
            <FileList/>
            <Popup/>
        </div>
    );
};

export default DiskPage;