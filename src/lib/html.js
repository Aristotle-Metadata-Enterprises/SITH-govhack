export function buildElement(tagName, attrs, text) {
    let elem = document.createElement(tagName)
    for (let item of Object.entries(attrs)) {
        elem.setAttribute(item[0], item[1])
    }
    if (text) {
        elem.appendChild(document.createTextNode(text))
    }
    return elem
}
