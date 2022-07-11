import React, {FC} from 'react';
import {RiFolderUserFill} from 'react-icons/ri';
import {MdSlowMotionVideo} from 'react-icons/md';
import {IoMdImage} from 'react-icons/io';
import {IFile} from '../../types/file';
import {setContextMenuFile, setInfoMenuFile} from '../../store/reducers/filesReducer';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {calcLocation} from '../../utils/calcLocation';

interface DeletedFileItemProps {
    file: IFile
}

const DeletedFileItem: FC<DeletedFileItemProps> = ({file}) => {
    const dispatch = useAppDispatch()
    const {infoMenuFile} = useTypedSelector(state => state.files)
    const contextMenu = document.querySelector('#delete-context-menu') as HTMLElement

    function openInfoMenuHandler() {
        if (infoMenuFile) dispatch(setInfoMenuFile(file))
    }

    function openContextMenuHandler(e: React.MouseEvent<HTMLDivElement>) {
        dispatch(setContextMenuFile(file))
        contextMenu.classList.add('active')
        calcLocation(e, contextMenu)
    }

    return (
        <div
            className='file__item'
            onClick={() => openInfoMenuHandler()}
            onContextMenu={(e) => openContextMenuHandler(e)}
            draggable={true}
        >
            {file.type === 'dir' && <RiFolderUserFill size={22} className='mr-4 text-neutral-500'/>}
            {file.type === 'mp4' && <MdSlowMotionVideo size={22} className='mr-4 text-blue-600'/>}
            {file.type !== 'dir' && file.type !== 'mp4' &&
                <IoMdImage size={22} className='mr-4 text-orange-600'/>
            }
            <span className='file__name'>
                {file.name}
            </span>
        </div>
    );
};

export default DeletedFileItem;