export const createWrapper = () => {
    const wrapper = document.createElement('div')
    wrapper.className = 'mm-wrapper'
    wrapper.hasCover = () => {
        return wrapper.children.length > 0
    }

    return wrapper
}
