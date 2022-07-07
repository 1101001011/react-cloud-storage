import React, {FC} from 'react';
import {IFile} from '../../types/file';
import {RiFolderUserFill} from 'react-icons/ri';
import {IoMdImage} from 'react-icons/io';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {calcSizeFormat} from '../../utils/calcSizeFormat';
import {BsInfoCircle} from 'react-icons/bs';

interface RightInfoMenuProps {
    file: IFile | null
}

const RightInfoMenu: FC<RightInfoMenuProps> = ({file}) => {
    const {dirStack} = useTypedSelector(state => state.files)
    const location = dirStack[dirStack.length-1]

    if (!file) {
        return (
            <div className='border-l'>
                <div className='flex flex-col items-center text-center mt-52'>
                    <BsInfoCircle size={80} className='mb-4 text-neutral-400'/>
                    <span className='text-l text-neutral-600'>Сведения о файлах и папках<br/>будут здесь.</span>
                </div>
            </div>
        )
    }

    return (
        <div className='border-l'>
            {file &&
                <div>
                    <div className='flex flex-col items-center py-8 border-b'>
                        {file.type === 'dir'
                            ? <RiFolderUserFill size={80} className='text-neutral-500'/>
                            : <IoMdImage size={80} className='text-orange-600'/>
                        }
                        <span className='text-xl text-neutral-600'>{file.name}</span>
                    </div>
                    <div className='py-4 px-6'>
                        <span className='text-xl text-neutral-600'>Свойства файла</span>
                        <div className='mt-6 text-l'>
                            <div className='grid grid-item py-1'>
                                <span>Тип</span>
                                <span className='ml-24'>
                                {file.type === 'dir'
                                    ? 'Папка'
                                    : 'Файл'
                                }
                                </span>
                            </div>
                            <div className='grid grid-item py-1'>
                                <span>Имя</span>
                                <span className='ml-24'>{file.name}</span>
                            </div>
                            <div className='grid grid-item py-1'>
                                <span>Размер</span>
                                <span className='ml-24'>{calcSizeFormat(file.size)}</span>
                            </div>
                            <div className='grid grid-item py-1'>
                                <span>Занимает</span>
                                <span className='ml-24'>{calcSizeFormat(file.size)}</span>
                            </div>
                            <div className='grid grid-item py-1'>
                                <span>Расположение</span>
                                <span className='ml-24'>{location.name}</span>
                            </div>
                            <hr className='my-1.5'/>
                            <div className='grid grid-item py-1'>
                                <span>Владелец</span>
                                <span className='ml-24'>я</span>
                            </div>
                            <div className='grid grid-item py-1'>
                                <span>Создано</span>
                                <span className='ml-24'>{(file.date).slice(0,10)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </div>
    );
};

export default RightInfoMenu;