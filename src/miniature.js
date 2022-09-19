import { createImage } from "./image";
import { createIcon } from "./icon";

export const createMiniature = (multimedia, cover) => {
    const miniature = document.createElement('div');
    const overlay = document.createElement('div');
    miniature.className = 'mm-miniature';
    overlay.className = 'mm-overlay';

    if(typeof cover !== 'undefined' && cover) {
        miniature.className += ' mm-cover';
    }
    
    // Determinar si es imagen o video

    overlay.insertAdjacentElement(
        'beforeend',
        createIcon('delete')
    );

    miniature.insertAdjacentElement(
        'beforeend',
        createImage(multimedia)
    );

    miniature.insertAdjacentElement(
        'beforeend',
        overlay
    );

    return miniature;
};
