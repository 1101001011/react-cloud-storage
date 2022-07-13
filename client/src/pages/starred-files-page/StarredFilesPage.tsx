import React, {FC, useEffect} from 'react';
import Navbar from '../../components/UI/navbar/Navbar';
import LeftSideMenu from '../../components/left-side-menu/LeftSideMenu';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import FileList from '../../components/file-list/FileList';
import RightInfoMenu from '../../components/right-info-menu/RightInfoMenu';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {getStarredFiles} from '../../store/reducers/starredFilesReducer';
import {setInfoMenuFile} from '../../store/reducers/filesReducer';
import styles from '../../components/UI/breadcrumbs/breadcrumbs.module.scss';

interface StarredFilesPageProps {
    sortValue: string | null
}

const StarredFilesPage: FC<StarredFilesPageProps> = ({sortValue}) => {
    const dispatch = useAppDispatch()
    const {starredFiles} = useTypedSelector(state => state.starredFiles)
    const {infoMenuFile} = useTypedSelector(state => state.files)
    const fileContextMenu = document.querySelector('#file-context-menu') as HTMLElement
    const dirContextMenu = document.querySelector('#dir-context-menu') as HTMLElement
    const sortContextMenu = document.querySelector('#sort-context-menu') as HTMLElement

    useEffect(() => {
        dispatch(getStarredFiles({dispatch, sortValue}))
    }, [sortValue])

    function closeContextMenu(e: React.MouseEvent<HTMLDivElement>) {
        const target = e.target as Element

        if (fileContextMenu) fileContextMenu.classList.remove('active')
        if (dirContextMenu) dirContextMenu.classList.remove('active')
        if (!target.getAttribute('data-sort')) {
            sortContextMenu.classList.remove('active')
        }
        if (!target.classList.contains('file__item') && target.tagName !== 'path'
            && target.tagName !== 'svg' && target.tagName !== 'SPAN') {
            dispatch(setInfoMenuFile(null))
        }
    }

    return (
        <div>
            <Navbar/>
            <div
                className='grid grid-primary'
                onClick={e => closeContextMenu(e)}
            >
                <LeftSideMenu/>
                <div className='mt-6'>
                    <div className={styles.breadcrumbs}>
                        <div className={styles.breadcrumb__title}>Помеченные</div>
                    </div>
                    <div className='px-2 h-auto h-max-min-540 flex flex-col overflow-y-auto'>
                        <FileList allFiles={starredFiles} sortValue={sortValue}/>
                    </div>
                </div>
                <RightInfoMenu file={infoMenuFile}/>
            </div>
        </div>
    );
};

export default StarredFilesPage;