import { createLabel } from './label'

export const createDragnDrop = (options) => {
    const dnd = document.createElement('div')
    dnd.className = 'mm-dnd'

    let title = 'Drag images or videos here for uploading'
    let subtitle = 'or click here to search for them'
    let icon = 'cloud_upload'

    if (typeof options.multimediaTitle !== 'undefined' &&
        options.multimediaTitle.length) {
        title = options.multimediaTitle
    }

    if (typeof options.multimediaSubtitle !== 'undefined' &&
        options.multimediaSubtitle.length) {
        subtitle = options.multimediaSubtitle
    }

    if (typeof options.multimediaIcon !== 'undefined' &&
        options.multimediaIcon.length) {
        icon = options.multimediaIcon
    }

    dnd.insertAdjacentElement(
        'beforeend',
        createLabel(title, 'mm-title', icon)
    )
    dnd.insertAdjacentElement(
        'beforeend',
        createLabel(subtitle, 'mm-subtitle')
    )

    return dnd
}
