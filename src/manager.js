import { createMultimedia } from './multimedia'
import { createDragnDrop } from './dragndrop'
import { createWrapper } from './wrapper'

export const initializeManager = (manager) => {
    const loadMultimediaList = () => {
        if (typeof manager.dataset.multimediaList !== 'undefined' &&
            manager.dataset.multimediaList.length) {
            return manager.dataset.multimediaList.split(',')
        }
        return []
    }

    const insertLoadedMultimedia = () => {
        for (const multimedia of multimediaList) {
            wrapper.insertAdjacentElement(
                'beforeend',
                createMultimedia(multimedia, manager.dataset)
            )
        }
    }

    const dispatchUpdateMultimediaListEvent = () => {
        manager.dispatchEvent(new CustomEvent(
            'updateMultimediaList',
            {
                bubbles: true,
                detail: {
                    multimediaList
                }
            }
        ))
    }

    const insertMultimedia = (key) => {
        // if (isFinishKey(key)) {
        //     const text = extractText()
        //     if (text.length) {
        //         tagsList.push(text)
        //         manager.dataset['tagsList'] = tagsList
        //         wrapper.insertAdjacentElement('beforeend', createTag(text))
        //         dispatchUpdateTagsListEvent()
        //     }
        // }
    }

    const removeMultimedia = (e) => {
        const source = e.detail.source
        multimediaList = multimediaList.filter((value) => {
            return value !== source
        })
        manager.dataset.multimediaList = multimediaList
        dispatchUpdateMultimediaListEvent()
    }

    const updateMultimedia = (e) => {
        const source = e.detail.source
        const newIndex = e.detail.newIndex
        const oldIndex = e.detail.oldIndex

        if (newIndex >= multimediaList.length) {
            let k = newIndex - multimediaList.length + 1
            while (k--) {
                multimediaList.push(source)
            }
        }
        multimediaList.splice(newIndex, 0, multimediaList.splice(oldIndex, 1)[0])
        manager.dataset.multimediaList = multimediaList
        dispatchUpdateMultimediaListEvent()
    }

    const dragndrop = createDragnDrop(manager.dataset)
    const wrapper = createWrapper()
    let multimediaList = loadMultimediaList()

    manager.className = 'mm-manager'
    manager.dataset.multimediaList = multimediaList
    manager.insertAdjacentElement('beforeend', dragndrop)
    manager.insertAdjacentElement('beforeend', wrapper)

    insertLoadedMultimedia()

    dragndrop.addEventListener('keyup', (e) => insertMultimedia(e.keyCode))
    manager.addEventListener('removedMultimedia', (e) => removeMultimedia(e))
    manager.addEventListener('updatedMultimedia', (e) => updateMultimedia(e))
}
