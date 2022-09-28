import { createIcon } from './icon'

export const createOverlay = (className, icon, callback) => {
    const overlay = document.createElement('div')
    overlay.className = 'mm-overlay ' + className
    overlay.insertAdjacentElement('beforeend', createIcon(icon, callback))

    return overlay
}
