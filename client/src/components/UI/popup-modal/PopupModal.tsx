import React, {FC, useState} from 'react';
import Input from '../input/Input';
import ButtonsGroup from '../buttons-group/ButtonsGroup';
import {setUploadPopupDisplay, uploadFile} from '../../../store/reducers/filesReducer';
import {useAppDispatch} from '../../../hooks/useAppDispatch';
import {useTypedSelector} from '../../../hooks/useTypedSelector';
import {setSelectedFilesCount} from '../../../store/reducers/uploadReducer';

interface PopupModalProps {
    type: string
    dragEnter: boolean
}

const PopupModal: FC<PopupModalProps> = ({type, dragEnter}) => {
    const dispatch = useAppDispatch()
    const {currentDir} = useTypedSelector(state => state.files)
    const [dirName, setDirName] = useState('')

    function fileUploadHandler(e: React.ChangeEvent<HTMLInputElement>) {
        // @ts-ignore
        const files = [...e.target.files]
        dispatch(setSelectedFilesCount(files.length))
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        dispatch(setUploadPopupDisplay('none'))
    }

    return (
        type === 'create'
            ?
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
                    <ButtonsGroup dirName={dirName} setDirName={setDirName}/>
                </div>
            </div>
            :
            <div
                className='max-w-xl mx-auto mt-64 bg-white rounded-md'
                style={dragEnter ? {pointerEvents: 'none'} : {pointerEvents: 'auto'}}
                onClick={e => e.stopPropagation()}
            >
                <div className='py-24 flex flex-col justify-center items-center'>
                    <span className='mb-4 text-md text-neutral-600 font-medium'>
                        Загрузите файлы, или перетащите файлы сюда
                    </span>
                    <div className='flex items-center text-medium text-sm'>
                        <label
                            htmlFor='image_uploads'
                            className='btn-primary text-sm px-4 text-white bg-violet-600 rounded-md cursor-pointer'
                        >
                            Browse...
                        </label>
                        <input
                            type='file'
                            id='image_uploads'
                            className='hidden'
                            onChange={e => fileUploadHandler(e)}
                            multiple={true}
                        />
                        <p className='ml-4'>No file selected</p>
                    </div>
                </div>
            </div>
    );
};

export default PopupModal;