import React, {Dispatch, FC, SetStateAction} from 'react';
import Button from '../button/Button';
import {
    createDir,
    renameFile,
    setCreatePopupDisplay,
    setRenamePopupDisplay
} from '../../../store/reducers/filesReducer';
import {useAppDispatch} from '../../../hooks/useAppDispatch';
import {useTypedSelector} from '../../../hooks/useTypedSelector';
import {IFile} from '../../../types/file';
import {IStarredFile} from '../../../types/starredFile';
import {isIFile} from '../../../utils/isIFile';
import {renameStarredFile} from '../../../store/reducers/starredFilesReducer';

type typeModal = 'create' | 'rename'

interface ButtonsGroupProps {
    newName: string
    setNewName: Dispatch<SetStateAction<string>>
    type: typeModal
    file?: IFile | IStarredFile
}

const ButtonsGroup: FC<ButtonsGroupProps> = ({newName, setNewName, type, file}) => {
    const dispatch = useAppDispatch()
    const {files, currentDir} = useTypedSelector(state => state.files)
    const {starredFiles} = useTypedSelector(state => state.starredFiles)

    let starredFile: IStarredFile | undefined
    let unStarredFile: IFile
    if (file) {
        starredFile = starredFiles.find(f => (f.name === file.name && f.path === file.path))
        unStarredFile = files.find(f => (f.name === file.name && f.path === file.path))!
    }

    const createDirHandler = () => {
        dispatch(createDir({name: newName, parent: currentDir}))
        dispatch(setCreatePopupDisplay('none'))
        setNewName('')
    }

    async function renameFileHandler() {
        if (isIFile(file)) {
            await dispatch(renameFile({file: file!, name: newName}))
            if (starredFile) dispatch(renameStarredFile({file: starredFile, name: newName}))
        } else {
            await dispatch(renameStarredFile({file: file!, name: newName}))
            dispatch(renameFile({file: unStarredFile, name: newName}))
        }
        dispatch(setRenamePopupDisplay('none'))
        setNewName('')
    }

    return (
        <div className='flex mt-4 justify-end'>
            <Button
                className='btn-primary mr-2 text-neutral-600 hover:bg-neutral-100 rounded-md'
                onClick={type === 'create'
                    ? () => dispatch(setCreatePopupDisplay('none'))
                    : () => dispatch(setRenamePopupDisplay('none'))}
            >
                Отмена
            </Button>
            {type === 'create' ?
                <Button
                    className='btn-primary ml-2 text-violet-600 hover:bg-violet-100 rounded-md'
                    onClick={() => createDirHandler()}
                >
                    Создать
                </Button>
                :
                <Button
                    className='btn-primary ml-2 text-violet-600 hover:bg-violet-100 rounded-md'
                    onClick={() => renameFileHandler()}
                >
                    Переименовать
                </Button>
            }
        </div>
    );
};

export default ButtonsGroup;