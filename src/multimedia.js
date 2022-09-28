import { createImage } from './image'
import { createOverlay } from './overlay'

export const createMultimedia = (source, options) => {
    const getNodeIndex = (node) => {
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
        while (!target.classList.contains('mm-multimedia')) {
            target = target.parentElement
        }
        return target
    }

    const onDragStart = (event) => {
        hideRemove()
        event.dataTransfer.setData(
            'text/plain',
            getNodeIndex(getTarget(event))
        )
    }

    const onDrop = (event) => {
        cancelDefault(event)

        const oldIndex = event.dataTransfer.getData('text/plain')
        const target = getTarget(event)
        const newIndex = getNodeIndex(target)
        const dropped = getNodeAt(oldIndex)

        if (newIndex < oldIndex) {
            target.insertAdjacentElement('beforebegin', dropped)
        } else {
            target.insertAdjacentElement('afterend', dropped)
        }

        multimedia.dispatchEvent(new CustomEvent(
            'updatedMultimedia',
            {
                bubbles: true,
                detail: {
                    source,
                    newIndex,
                    oldIndex
                }
            }
        ))
    }

    const cancelDefault = (event) => {
        event.preventDefault()
        event.stopPropagation()
        return false
    }

    const showRemove = () => {
        const move = multimedia.querySelector('.mm-move')
        const remove = multimedia.querySelector('.mm-remove')

        if (remove.classList.contains('visible')) {
            move.classList.remove('hidden')
            remove.classList.remove('visible')
        } else {
            move.classList.add('hidden')
            remove.classList.add('visible')
        }
    }

    const hideRemove = () => {
        const move = multimedia.querySelector('.mm-move')
        const remove = multimedia.querySelector('.mm-remove')

        move.classList.remove('hidden')
        remove.classList.remove('visible')
    }

    const remove = () => {
        let msg = 'Are you sure you want delete this item?'

        if (typeof options.multimediaRemoveMsg !== 'undefined') {
            msg = options.multimediaRemoveMsg
        }

        if (confirm(msg)) {
            multimedia.dispatchEvent(new CustomEvent(
                'removedMultimedia',
                {
                    bubbles: true,
                    detail: {
                        source
                    }
                }
            ))

            multimedia.remove()
        }
    }

    const multimedia = document.createElement('div')
    multimedia.draggable = true
    multimedia.className = 'mm-multimedia'

    // Determinar si es imagen o video

    multimedia.insertAdjacentElement(
        'beforeend',
        createImage(source)
    )

    multimedia.insertAdjacentElement(
        'beforeend',
        createOverlay('mm-remove', 'delete', remove)
    )

    multimedia.insertAdjacentElement(
        'beforeend',
        createOverlay('mm-move', 'open_with')
    )

    multimedia.addEventListener('dragstart', onDragStart)
    multimedia.addEventListener('drop', onDrop)
    multimedia.addEventListener('dragenter', cancelDefault)
    multimedia.addEventListener('dragover', cancelDefault)
    multimedia.addEventListener('click', showRemove)

    return multimedia
}
