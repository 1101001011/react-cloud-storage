import React, {Dispatch, FC, SetStateAction} from 'react';
import Button from '../button/Button';
import {createDir, setCreatePopupDisplay} from '../../../store/reducers/filesReducer';
import {useAppDispatch} from '../../../hooks/useAppDispatch';
import {useTypedSelector} from '../../../hooks/useTypedSelector';

interface ButtonsGroupProps {
    dirName: string
    setDirName: Dispatch<SetStateAction<string>>
}

const ButtonsGroup: FC<ButtonsGroupProps> = ({dirName, setDirName}) => {
    const dispatch = useAppDispatch()
    const {currentDir} = useTypedSelector(state => state.files)

    const createDirHandler = () => {
        dispatch(createDir({name: dirName, parent: currentDir}))
        dispatch(setCreatePopupDisplay('none'))
        setDirName('')
    }

    return (
        <div className='flex mt-4 justify-end'>
            <Button
                className='btn-primary mr-2 text-neutral-600 hover:bg-neutral-100 rounded-md'
                onClick={() => dispatch(setCreatePopupDisplay('none'))}
            >
                Отмена
            </Button>
            <Button
                className='btn-primary ml-2 text-violet-600 hover:bg-violet-100 rounded-md'
                onClick={() => createDirHandler()}
            >
                Создать
            </Button>
        </div>
    );
};

export default ButtonsGroup;