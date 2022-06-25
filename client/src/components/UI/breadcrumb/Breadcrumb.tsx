import React from 'react';
import {useTypedSelector} from '../../../hooks/useTypedSelector';
import {IoIosArrowForward} from 'react-icons/io';
import {setCurrentDir} from '../../../store/reducers/filesReducer';
import {useAppDispatch} from '../../../hooks/useAppDispatch';

const Breadcrumb = () => {
    const dispatch = useAppDispatch()
    const {dirStack, files} = useTypedSelector(state => state.files)

    function changeDirHandler(e: React.MouseEventHandler<HTMLDivElement>) {
        // const found = files.find(file => file.name === dir)
        console.log(e.name)
        // if (found) dispatch(setCurrentDir(found._id))
    }

    return (
        <div className='mt-4 py-2 text-lg font-medium text-neutral-400 flex border-b border-neutral-200'>
            {dirStack.map(dir =>
                <div className='mr-1 flex items-center'>
                    <div
                        className='py-1 px-2 mr-1 cursor-pointer rounded-md hover:bg-neutral-100'
                        onClick={(e) => changeDirHandler}
                    >
                        {dir}
                    </div>
                    {dirStack.indexOf(dir) !== dirStack.length - 1
                        ?
                        <IoIosArrowForward className='mt-1'/>
                        : ''
                    }
                </div>
            )}
        </div>
    );
};

export default Breadcrumb;