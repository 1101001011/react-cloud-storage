import React, {FC, useState} from 'react';
import Input from '../input/Input';
import Button from '../button/Button';
import {useAppDispatch} from '../../../hooks/useAppDispatch';
import {createDir, setPopupDisplay} from '../../../store/reducers/filesReducer';
import {useTypedSelector} from '../../../hooks/useTypedSelector';

const Popup: FC = () => {
    const dispatch = useAppDispatch()
    const {popupDisplay, currentDir} = useTypedSelector(state => state.files)
    const [dirName, setDirName] = useState('')

    const createDirHandler = () => {
        dispatch(createDir({name: dirName, parent: currentDir}))
        dispatch(setPopupDisplay('none'))
        setDirName('')
    }

    return (
        <div style={{display: popupDisplay}}>
            <div
                className='fixed left-0 top-0 w-full h-full bg-black md:bg-opacity-50'
                onClick={() => dispatch(setPopupDisplay('none'))}
            >
                <div
                    className='max-w-sm mx-auto mt-72 bg-white rounded-md'
                    onClick={e => e.stopPropagation()}
                >
                    <div className='py-4 px-6 flex flex-col'>
                        <span className='mb-1 text-2xl text-neutral-600 font-medium'>
                            Новая папка
                        </span>
                        <Input
                            value={dirName}
                            type='text'
                            placeholder='Без названия'
                            onChange={(e) => setDirName(e.target.value)}
                        />
                        <div className='flex mt-4 justify-end'>
                            <Button
                                className='btn-primary mr-2 text-neutral-600 hover:bg-neutral-100'
                                onClick={() => dispatch(setPopupDisplay('none'))}
                            >
                                Отмена
                            </Button>
                            <Button
                                className='btn-primary ml-2 text-violet-600 hover:bg-violet-100'
                                onClick={() => createDirHandler()}
                            >
                                Создать
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Popup;