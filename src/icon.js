export const createIcon = (icon) => {
    const i = document.createElement('i')
    i.className = 'material-symbols-outlined'
    i.innerHTML = icon

    return i
}
