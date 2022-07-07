export const calcLocationCreateMenu = (createButton: HTMLElement, sortContextMenu: HTMLElement) => {
    const leftX = String(createButton.getBoundingClientRect().right - createButton.getBoundingClientRect().width) + 'px'
    const topY = String(createButton.getBoundingClientRect().top + 50) + 'px'
    sortContextMenu.style.left = leftX
    sortContextMenu.style.top = topY
}