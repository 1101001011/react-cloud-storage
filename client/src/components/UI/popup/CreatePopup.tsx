import React, {useState} from 'react';
import Input from '../input/Input';
import ButtonsGroup from '../buttons-group/ButtonsGroup';
import {useTypedSelector} from '../../../hooks/useTypedSelector';

const CreatePopup = () => {
    const [newName, setNewName] = useState<string>('')
    const {createPopupDisplay} = useTypedSelector(state => state.files)

    return (
        <div style={{display: createPopupDisplay}}>
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
                            Новая папка
                        </span>
                        <Input
                            className='input my-3'
                            value={newName}
                            type='text'
                            placeholder='Без названия'
                            onChange={(e) => setNewName(e.target.value)}
                        />
                        <ButtonsGroup
                            newName={newName}
                            setNewName={setNewName}
                            type='create'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePopup;