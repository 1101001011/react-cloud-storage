import React, {Dispatch, FC, SetStateAction} from 'react';
import {AiOutlineCheck} from 'react-icons/ai';
import './contextMenu.scss'

interface SortContextMenuProps {
    sortValue: string | null
    setSortValue: Dispatch<SetStateAction<string | null>>
}

const SortContextMenu: FC<SortContextMenuProps> = ({sortValue, setSortValue}) => {
    const sortContextMenu = document.querySelector('#sort-context-menu') as HTMLElement

    function SortContextMenuHandler(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation()
        setSortValue((e.target as HTMLDivElement).getAttribute('data-value-type'))
        sortContextMenu.classList.remove('active')
    }

    return (
        <div
            className='context__menu'
            id='sort-context-menu'
            onClick={(e) => SortContextMenuHandler(e)}
        >
            <div
                className='grid grid-item px-4 py-1 mt-4 hover:bg-neutral-100 cursor-pointer'
                data-value-type='name'
            >
                {(!sortValue || sortValue === 'name') ? <AiOutlineCheck size={20}/> : <div></div>}
                По названию
            </div>
            <div
                className='grid grid-item px-4 py-1 hover:bg-neutral-100 cursor-pointer'
                data-value-type='type'
            >
                {sortValue === 'type' ? <AiOutlineCheck size={20}/> : <div></div>}
                По типу
            </div>
            <div
                className='grid grid-item px-4 py-1 mb-4 hover:bg-neutral-100 cursor-pointer'
                data-value-type='date'
            >
                {sortValue === 'date' ? <AiOutlineCheck size={20}/> : <div></div>}
                По дате
            </div>
        </div>
    );
};

export default SortContextMenu;