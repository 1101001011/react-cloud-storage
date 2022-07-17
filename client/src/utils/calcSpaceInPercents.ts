export const calcSpaceInPercents = (usedSpace: number, diskSpace: number) => {
    return (usedSpace * 100) / diskSpace
}