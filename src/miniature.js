import { createImage } from './image'
import { createIcon } from './icon'
import { createOverlay } from './overlay'

export const createMiniature = (multimedia) => {
    const getIndex = (node) => {
        return Array.prototype.indexOf.call(
            document.querySelector('.mm-wrapper').children,
            node
        )
    }

    const getNodeAt = (index) => {
        return document.querySelector('.mm-wrapper').children[index]
    }

    const getTarget = (event) => {
        let target = event.target
        while (!target.classList.contains('mm-miniature')) {
            target = target.parentElement
        }
        return target
    }

    const dragStart = (event) => {
        event.dataTransfer.setData(
            'text/plain',
            getIndex(getTarget(event))
        )
    }

    const dropped = (event) => {
        cancelDefault(event)

        const oldIndex = event.dataTransfer.getData('text/plain')
        const target = getTarget(event)
        const newIndex = getIndex(target)
        const dropped = getNodeAt(oldIndex)

        if (newIndex < oldIndex) {
            target.insertAdjacentElement('beforebegin', dropped)
        } else {
            target.insertAdjacentElement('afterend', dropped)
        }
    }

    const cancelDefault = (event) => {
        event.preventDefault()
        event.stopPropagation()
        return false
    }

    const miniature = document.createElement('div')
    const overlay = document.createElement('div')
    miniature.draggable = true
    miniature.className = 'mm-miniature'

    // Determinar si es imagen o video

    overlay.insertAdjacentElement(
        'beforeend',
        createIcon('open_with')
    )

    miniature.insertAdjacentElement(
        'beforeend',
        createImage(multimedia)
    )

    miniature.insertAdjacentElement(
        'beforeend',
        createOverlay('mm-delete', 'delete')
    )

    miniature.insertAdjacentElement(
        'beforeend',
        createOverlay('mm-move', 'open_with')
    )

    miniature.addEventListener('dragstart', dragStart)
    miniature.addEventListener('drop', dropped)
    miniature.addEventListener('dragenter', cancelDefault)
    miniature.addEventListener('dragover', cancelDefault)

    return miniature
}
