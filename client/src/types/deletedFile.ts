import {IFile} from './file';

export interface DeletedFileState {
    deletedFiles: IFile[]
    isLoader: boolean
}