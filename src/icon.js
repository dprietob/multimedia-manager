export const createIcon = (icon, callback) => {
    const i = document.createElement('i')
    i.className = 'material-symbols-outlined'
    i.innerHTML = icon

    if (typeof callback === 'function') {
        i.addEventListener('click', callback)
    }

    return i
}
