export const calcLocationSortContextMenu = (sortButton: HTMLElement, sortContextMenu: HTMLElement) => {
    const scrollbarWidth = window.innerWidth - document.body.clientWidth
    const rightX = String(window.innerWidth - sortButton.getBoundingClientRect().right - scrollbarWidth) + 'px'
    const topY = String(sortButton.getBoundingClientRect().top + 50) + 'px'
    sortContextMenu.style.right = rightX
    sortContextMenu.style.top = topY
}