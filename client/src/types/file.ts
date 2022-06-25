export interface IFile {
    _id: string
    name: string
    type: string
    size: number
    path: string
    user: string
    children: []
}

export interface FileState {
    files: IFile[],
    currentDir: string | null
}