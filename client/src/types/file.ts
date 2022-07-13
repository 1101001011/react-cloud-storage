import {IStarredFile} from './starredFile';

export interface IFile {
    _id: string
    name: string
    type: string
    size: number
    path: string
    user: string
    status?: string
    date: string
    parent?: string
    children?: []
}

export interface IBreadcrumbsDir {
    id: number,
    name: string
}

export interface FileState {
    files: IFile[]
    allFiles: IFile[]
    currentDir: null
    dirStack: IBreadcrumbsDir[]
    error: string | undefined
    createPopupDisplay: string
    uploadPopupDisplay: string
    contextMenuFile: IFile | IStarredFile
    infoMenuFile: IFile | null
    isLoader: boolean
}

export interface IDeleteFileResponse {
    message: string
    fileId: string
}