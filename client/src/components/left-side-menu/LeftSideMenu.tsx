import React from 'react';
import {MdStorage} from 'react-icons/md';
import {IoMdStarOutline} from 'react-icons/io';
import {RiDeleteBin6Line} from 'react-icons/ri';
import {BsCloudy} from 'react-icons/bs';
import {useNavigate} from 'react-router-dom';
import {calcLocationCreateMenu} from '../../utils/calcLocationCreateMenu';
import './leftSideMenu.scss'

const LeftSideMenu = () => {
    const navigate = useNavigate()
    const defaultContextMenu = document.querySelector('#default-context-menu') as HTMLElement

    function openCreateMenuHandler() {
        const createButton = document.querySelector('.create__btn') as HTMLElement
        defaultContextMenu.classList.add('active')
        calcLocationCreateMenu(createButton, defaultContextMenu)
    }

    return (
        <div className='mr-8 mt-6'>
            <div
                className='create__btn'
                onClick={() => openCreateMenuHandler()}
                data-create
            >
                Создать
            </div>
            <div className='menu__item' onClick={() => navigate('/storage/main')}>
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
            <div className='storage'>
                <BsCloudy size={25} className='text-neutral-500'/>
                Хранилище
            </div>
        </div>
    );
};

export default LeftSideMenu;