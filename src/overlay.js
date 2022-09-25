import { createIcon } from './icon'

export const createOverlay = (className, icon) => {
    const overlay = document.createElement('div')
    overlay.className = 'mm-overlay ' + className
    overlay.insertAdjacentElement('beforeend', createIcon(icon))

    return overlay
}
