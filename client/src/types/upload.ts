export interface IUploadFile {
    id?: number
    name: string
    progress: number
}

export interface UploadState {
    isVisible: boolean
    files: IUploadFile[]
    selectedFilesCount: number
}