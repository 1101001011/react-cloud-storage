import React, {useEffect} from 'react';
import Navbar from '../../components/UI/navbar/Navbar';
import LeftSideMenu from '../../components/left-side-menu/LeftSideMenu';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {getDeletedFiles} from '../../store/reducers/deletedFilesReducer';
import DeletedFileList from '../../components/deleted-file-list/DeletedFileList';
import RightInfoMenu from '../../components/right-info-menu/RightInfoMenu';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import TrashCanContextMenu from '../../components/UI/context-menu/TrashCanContextMenu';
import styles from '../../components/UI/breadcrumbs/breadcrumbs.module.scss'

const TrashCanPage = () => {
    const dispatch = useAppDispatch()
    const {infoMenuFile, contextMenuFile} = useTypedSelector(state => state.files)
    const trashCanContextMenu = document.querySelector('#delete-context-menu') as HTMLElement

    useEffect(() => {
        dispatch(getDeletedFiles(dispatch))
    },[])

    function closeTrashCanContextMenuHandler() {
        if (trashCanContextMenu) {
            trashCanContextMenu.classList.remove('active')
        }
    }

    return (
        <div>
            <Navbar/>
            <div
                className='grid grid-primary'
                onClick={() => closeTrashCanContextMenuHandler()}
            >
                <LeftSideMenu/>
                <div className='mt-6'>
                    <div className={styles.breadcrumbs}>
                        <div className={styles.breadcrumb__title}>Корзина</div>
                    </div>
                    <div className='px-2 h-auto h-max-min-540 flex flex-col overflow-y-auto'>
                        <DeletedFileList/>
                        <TrashCanContextMenu file={contextMenuFile}/>
                    </div>
                </div>
                <RightInfoMenu file={infoMenuFile}/>
            </div>
        </div>
    );
};

export default TrashCanPage;