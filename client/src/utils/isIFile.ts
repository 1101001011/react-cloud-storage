import {IFile} from '../types/file';

export function isIFile(obj: any): obj is IFile {
    return 'children' in obj
}