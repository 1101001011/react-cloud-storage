import React, {Dispatch, FC, SetStateAction} from 'react';
import {useAppDispatch} from '../../../hooks/useAppDispatch';
import {setCreatePopupDisplay, setUploadPopupDisplay} from '../../../store/reducers/filesReducer';
import {useTypedSelector} from '../../../hooks/useTypedSelector';
import PopupModal from '../popup-modal/PopupModal';

interface PopupProps {
    dragEnter: boolean
    setDragEnter: Dispatch<SetStateAction<boolean>>
}

const Popup: FC<PopupProps> = ({dragEnter, setDragEnter}) => {
    const dispatch = useAppDispatch()
    const {createPopupDisplay, uploadPopupDisplay} = useTypedSelector(state => state.files)
    const modalType = createPopupDisplay === 'block' ? 'create' : 'upload'

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

    return (
        <div
            style={modalType === 'create' ? {display: createPopupDisplay} : {display: uploadPopupDisplay}}
            onDragEnter={e => dragEnterHandler(e)}
            onDragLeave={e => dragLeaveHandler(e)}
            onDragOver={e => dragEnterHandler(e)}
        >
            <div
                className='fixed left-0 top-0 w-full h-full bg-black md:bg-opacity-30'
                onClick={() => modalType === 'create'
                    ? dispatch(setCreatePopupDisplay('none'))
                    : dispatch(setUploadPopupDisplay('none'))}
            >
                <PopupModal type={modalType} dragEnter={dragEnter}/>
            </div>
        </div>
    );
};

export default Popup;