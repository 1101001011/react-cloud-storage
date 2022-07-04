import React from 'react';

export const calcLocation = (e: React.MouseEvent<HTMLDivElement>, element: HTMLElement) => {
    if (((e.clientX + (element.getBoundingClientRect().right - element.getBoundingClientRect().left)) > window.innerWidth) &&
        (e.clientY + (element.getBoundingClientRect().bottom - element.getBoundingClientRect().top)) > window.innerHeight) {
        element.style.left = String(e.clientX - (element.getBoundingClientRect().right - element.getBoundingClientRect().left)) + 'px'
        element.style.top = String(e.clientY - (element.getBoundingClientRect().bottom - element.getBoundingClientRect().top)) + 'px'
    } else if ((e.clientY + (element.getBoundingClientRect().bottom - element.getBoundingClientRect().top)) > window.innerHeight) {
        element.style.left = String(e.clientX) + 'px'
        element.style.top = String(e.clientY - (element.getBoundingClientRect().bottom - element.getBoundingClientRect().top)) + 'px'
    } else if ((e.clientX + (element.getBoundingClientRect().right - element.getBoundingClientRect().left)) > window.innerWidth) {
        element.style.left = String(e.clientX - (element.getBoundingClientRect().right - element.getBoundingClientRect().left)) + 'px'
        element.style.top = String(e.clientY) + 'px'
    } else {
        element.style.left = String(e.clientX) + 'px'
        element.style.top = String(e.clientY) + 'px'
    }
}