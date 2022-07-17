import React from 'react';
import {MdStorage} from 'react-icons/md';
import {IoMdStarOutline} from 'react-icons/io';
import {RiDeleteBin6Line} from 'react-icons/ri';
import {BsCloudy} from 'react-icons/bs';
import {useNavigate} from 'react-router-dom';
import {calcLocationCreateMenu} from '../../utils/calcLocationCreateMenu';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {setCurrentDir, sliceDirStack} from '../../store/reducers/filesReducer';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {calcSizeFormat} from '../../utils/calcSizeFormat';
import {calcSpaceInPercents} from '../../utils/calcSpaceInPercents';
import './leftSideMenu.scss'

const LeftSideMenu = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {usedSpace, diskSpace} = useTypedSelector(state => state.app)
    const defaultContextMenu = document.querySelector('#default-context-menu') as HTMLElement

    function openCreateMenuHandler() {
        const createButton = document.querySelector('.create__btn') as HTMLElement
        defaultContextMenu.classList.add('active')
        calcLocationCreateMenu(createButton, defaultContextMenu)
    }

    function openDiskPageHandler() {
        navigate('/storage/main')
        dispatch(setCurrentDir(null))
        dispatch(sliceDirStack(1))
    }

    return (
        <div className='mr-8 mt-6'>
            <div
                className='create__btn'
                onClick={window.location.pathname === '/storage/main'
                    ? () => openCreateMenuHandler()
                    : () => {}}
                data-create
            >
                Создать
            </div>
            <div className='menu__item' onClick={() => openDiskPageHandler()}>
                <MdStorage size={25} className='text-neutral-500'/>
                Мой Диск
            </div>
            <div className='menu__item' onClick={() => navigate('/storage/starred')}>
                <IoMdStarOutline size={25} className='text-neutral-500'/>
                Помеченные
            </div>
            <div className='menu__item' onClick={() => navigate('/storage/trash')}>
                <RiDeleteBin6Line size={25} className='text-neutral-500'/>
                Корзина
            </div>
            <hr className='my-1.5'/>
            <div>
                <div className='storage'>
                    <BsCloudy size={25} className='text-neutral-500'/>
                    Хранилище
                </div>
                <div className='pl-9'>
                    <div
                        className='w-40 mb-1 h-1 bg-neutral-200'
                    >
                        <div
                            className='h-1 bg-violet-600'
                            style={diskSpace
                                ? {width: calcSpaceInPercents(usedSpace, diskSpace) + '%'}
                                : {width: '0%'}}
                        >
                        </div>
                    </div>
                    <span className='text-sm text-neutral-600'>
                        Использовано {calcSizeFormat(usedSpace)}
                        <p className='-mt-1'>из {diskSpace ? calcSizeFormat(diskSpace) : '10.0 ГБ'}</p>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LeftSideMenu;