import React from 'react';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import DeletedFileItem from '../deleted-file-item/DeletedFileItem';
import {FiWind} from 'react-icons/fi';
import './deletedFileList.scss'

const DeletedFileList = () => {
    const {deletedFiles, isLoader} = useTypedSelector(state => state.deletedFiles)
    const todayFiles = deletedFiles.filter(file => parseInt(file.date.slice(8,10)) === new Date().getDate())
    const yesterdaysFiles = deletedFiles.filter(file => new Date().getDate() - parseInt(file.date.slice(8,10)) === 1)
    const currentWeekFiles = deletedFiles.filter(file => new Date().getDate() - parseInt(file.date.slice(8,10)) > 1)
    const oldFiles = deletedFiles.filter(file => new Date().getDate() - parseInt(file.date.slice(8,10)) > 7)

    if (isLoader) {
        return (
            <div className='text-center mt-40'>
                <div className="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    }

    if (deletedFiles.length === 0) {
        return (
            <div className='flex flex-col items-center mt-36'>
                <FiWind size={100} className='mb-4 text-violet-600'/>
                <p className='text-lg font-medium text-neutral-600'>
                    Корзина пуста
                </p>
                <p className='text-sm text-neutral-500'>
                    Здесь появятся удаленные файлы
                </p>
            </div>
        )
    }

    return (
        <div className='pb-2'>
            {todayFiles.length > 0 &&
                <div>
                    <div className='date__header'>
                        <span className='grow'>Сегодня</span>
                    </div>
                    <div className='file__list'>
                        {todayFiles.map(file => <DeletedFileItem file={file} key={file._id}/>)}
                    </div>
                </div>
            }
            {yesterdaysFiles.length > 0 &&
                <div>
                    <div className='date__header'>
                        <span className='grow'>Вчера</span>
                    </div>
                    <div className='file__list'>
                        {yesterdaysFiles.map(file => <DeletedFileItem file={file} key={file._id}/>)}
                    </div>
                </div>
            }
            {currentWeekFiles.length > 0 &&
                <div>
                    <div className='date__header'>
                        <span className='grow'>На этой неделе</span>
                    </div>
                    <div className='file__list'>
                        {currentWeekFiles.map(file => <DeletedFileItem file={file} key={file._id}/>)}
                    </div>
                </div>
            }
            {oldFiles.length > 0 &&
                <div>
                    <div className='date__header'>
                        <span className='grow'>Давно</span>
                    </div>
                    <div className='file__list'>
                        {oldFiles.map(file => <DeletedFileItem file={file} key={file._id}/>)}
                    </div>
                </div>
            }
        </div>
    )
}

export default DeletedFileList;