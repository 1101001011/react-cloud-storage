import React, {FC, useState} from 'react';
import Input from '../input/Input';
import ButtonsGroup from '../buttons-group/ButtonsGroup';
import {IFile} from '../../../types/file';
import {IStarredFile} from '../../../types/starredFile';
import {useTypedSelector} from '../../../hooks/useTypedSelector';

interface RenamePopupProps {
    file: IFile | IStarredFile
}

const RenamePopup: FC<RenamePopupProps> = ({file}) => {
    const [newName, setNewName] = useState<string>('')
    const {renamePopupDisplay} = useTypedSelector(state => state.files)

    return (
        <div style={{display: renamePopupDisplay}}>
            <div
                className='fixed left-0 top-0 w-full h-full bg-black md:bg-opacity-30'
                onClick={() => {}}
            >
                <div
                    className='max-w-sm mx-auto mt-72 bg-white rounded-md'
                    onClick={e => e.stopPropagation()}
                >
                    <div className='py-4 px-6 flex flex-col'>
                        <span className='mb-1 text-2xl text-neutral-600 font-medium'>
                            Переименовать
                        </span>
                        <Input
                            className='input my-3'
                            value={newName}
                            type='text'
                            placeholder='Новое имя'
                            onChange={(e) => setNewName(e.target.value)}
                        />
                        <ButtonsGroup
                            newName={newName}
                            setNewName={setNewName}
                            type='rename'
                            file={file}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RenamePopup;