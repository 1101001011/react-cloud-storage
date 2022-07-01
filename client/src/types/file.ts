export interface IFile {
    _id: string
    name: string
    type: string
    size: number
    path: string
    user: string
    children: []
}

export interface IDir {
    id: number,
    name: string
}

export interface FileState {
    files: IFile[],
    allFiles: IFile[],
    currentDir: string,
    dirStack: IDir[]
    error: string | undefined
    createPopupDisplay: string
    uploadPopupDisplay: string
    contextMenuType: string
    contextMenuFile: IFile
}

export interface IDeleteFileResponse {
    message: string
    fileId: string
}