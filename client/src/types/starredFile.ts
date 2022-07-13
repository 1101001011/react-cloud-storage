export interface IStarredFile {
    _id: string
    name: string
    type: string
    size: number
    path: string
    user: string
    date: string
}

export interface StarredFileState {
    starredFiles: IStarredFile[]
    isLoader: boolean
    starredFile: IStarredFile
}