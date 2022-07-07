import React from 'react'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { IoIosArrowForward } from 'react-icons/io'
import {setCurrentDir, sliceDirStack} from '../../../store/reducers/filesReducer';
import {IBreadcrumbsDir} from '../../../types/file';
import styles from './breadcrumbs.module.scss'

const Breadcrumbs = () => {
	const dispatch = useAppDispatch()
	const { dirStack, allFiles } = useTypedSelector((state) => state.files)

	const changeDirHandler = (dir: IBreadcrumbsDir) => {
		if (dir.name === 'Мой Диск') {
			dispatch(setCurrentDir(''))
		} else {
			const found = allFiles.find(file => file.name === dir.name)
			if (found) dispatch(setCurrentDir(found._id))
		}
		dispatch(sliceDirStack(dir.id + 1))
	}

	return (
		<div className={styles.breadcrumbs}>
			{dirStack.map((dir) => (
				<div className={styles.breadcrumbs__item} key={dir.id}>
					<div
						className={styles.breadcrumb__title}
						onClick={() => changeDirHandler(dir)}
					>
						{dir.name}
					</div>
					{dir.id !== dirStack.length - 1 ? (
						<IoIosArrowForward className="mt-1" />
					) : (
						''
					)}
				</div>
			))}
		</div>
	)
}

export default Breadcrumbs;