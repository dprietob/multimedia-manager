import { createIcon } from './icon'

export const createLabel = (text, className, icon) => {
    const label = document.createElement('div')
    label.className = 'mm-label ' + className
    label.innerHTML = text

    if (typeof icon !== 'undefined') {
        label.insertAdjacentElement('beforeend', createIcon(icon))
    }

    return label
}
