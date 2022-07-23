import React, {Dispatch, FC, SetStateAction} from 'react';
import {setUploadPopupDisplay, uploadFile} from '../../../store/reducers/filesReducer';
import {useTypedSelector} from '../../../hooks/useTypedSelector';
import {setSelectedFilesCount} from '../../../store/reducers/uploadReducer';
import {useAppDispatch} from '../../../hooks/useAppDispatch';

interface UploadPopupProps {
    dragEnter: boolean
    setDragEnter: Dispatch<SetStateAction<boolean>>
}

const UploadPopup: FC<UploadPopupProps> = ({dragEnter, setDragEnter}) => {
    const dispatch = useAppDispatch()
    const {uploadPopupDisplay, currentDir} = useTypedSelector(state => state.files)

    function dragEnterHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        e.stopPropagation()
    }

    function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        e.stopPropagation()
        setDragEnter(false)
        dispatch(setUploadPopupDisplay('none'))
    }

    function dropHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        e.stopPropagation()
        let files = [...e.dataTransfer.files]
        dispatch(setSelectedFilesCount(files.length))
        files.forEach(file => dispatch(uploadFile({dispatch, file, currentDir})))
        setDragEnter(false)
        dispatch(setUploadPopupDisplay('none'))
    }

    function fileUploadHandler(e: React.ChangeEvent<HTMLInputElement>) {
        // @ts-ignore
        const files = [...e.target.files]
        dispatch(setSelectedFilesCount(files.length))
        dispatch(setUploadPopupDisplay('none'))
        promiseForEach(files, (file) => dispatch(uploadFile({dispatch, file, currentDir})))
    }

    function promiseForEach(arr: any, cb: (item: any, index: number) => any) {
        let i = 0;

        const nextPromise = function (): any {
            if (i >= arr.length) return

            const newPromise = Promise.resolve(cb(arr[i], i))
            i++

            return newPromise.then(nextPromise)
        }

        return Promise.resolve().then(nextPromise)
    }

    return (
        <div
            style={{display: uploadPopupDisplay}}
            onDragEnter={e => dragEnterHandler(e)}
            onDragLeave={e => dragLeaveHandler(e)}
            onDragOver={e => dragEnterHandler(e)}
            onDrop={e => dropHandler(e)}
        >
            <div
                className='fixed left-0 top-0 w-full h-full bg-black md:bg-opacity-30'
                onClick={() => dispatch(setUploadPopupDisplay('none'))}
            >
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
            </div>
        </div>
    );
};

export default UploadPopup;