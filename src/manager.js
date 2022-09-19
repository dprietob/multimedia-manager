import { createMiniature } from "./miniature";
import { createDragnDrop } from "./dragndrop";
import { createWrapper } from "./wrapper";

export const initializeManager = (manager) => {
    // Loads the multimedia list defined in the data-multimedia-list attribute.
    const loadMultimediaList = () => {
        if(typeof manager.dataset['multimediaList'] !== 'undefined'
            && manager.dataset['multimediaList'].length) {
            return manager.dataset['multimediaList'].split(',');
        }
        return [];
    }

    // Inserts the loaded multimedia into the wrapper.
    const insertLoadedMultimedia = () => {
        for (const multimedia of multimediaList) {
            wrapper.insertAdjacentElement(
                'beforeend', 
                createMiniature(multimedia, !wrapper.hasCover())
            );
        }
    }

    // Dispatches the updateTagsList event. TODO
    const dispatchUpdateTagsListEvent = () => {
        manager.dispatchEvent(new CustomEvent(
            'updateTagsList', 
            {
                bubbles: true,
                detail: {
                    tagsList: tagsList
                }
            }
        ));
    }

    // Inserts a new tag. TODO
    const insertTag = (key) => {
        if (isFinishKey(key)) {
            const text = extractText();
            if (text.length) {
                tagsList.push(text);
                manager.dataset['tagsList'] = tagsList;
                wrapper.insertAdjacentElement('beforeend', createTag(text));
                dispatchUpdateTagsListEvent();
            }
        }
    };

    // Removes an inserted tag. TODO
    const removeTag = (e) => {
        const text = e.detail.tagValue;
        tagsList = tagsList.filter((value) => {
            return value !== text;
        });
        manager.dataset['tagsList'] = tagsList;
        dispatchUpdateTagsListEvent();
    }

    // Multimedia Manager initialization.
    const dragndrop = createDragnDrop(manager.dataset);
    const wrapper = createWrapper();
    let multimediaList = loadMultimediaList();

    manager.className = 'mm-manager';
    manager.dataset['multimediaList'] = multimediaList;
    manager.insertAdjacentElement('beforeend', dragndrop);
    manager.insertAdjacentElement('beforeend', wrapper);

    insertLoadedMultimedia();
    
    dragndrop.addEventListener('keyup', (e) => insertTag(e.keyCode));
    manager.addEventListener('removedTag', (e) => removeTag(e));
};
