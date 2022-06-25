import React, {useEffect} from 'react';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {getFiles} from '../../store/reducers/filesReducer';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import Button from '../../components/UI/button/Button';
import FileList from '../../components/file-list/FileList';

const DiskPage = () => {
    const dispatch = useAppDispatch()
    const {currentDir} = useTypedSelector(state => state.files)

    useEffect(() => {
        dispatch(getFiles(currentDir))
    }, [currentDir])

    return (
        <div>
            <Button onClick={() => {}}>
                Создать папку
            </Button>
            <FileList/>
        </div>
    );
};

export default DiskPage;