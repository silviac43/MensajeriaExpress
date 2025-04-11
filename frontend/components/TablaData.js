export default class TablaData {
    constructor(content, type = 'td', classContent = '') {
        this.element = document.createElement(type);
        this.element.innerHTML = content;
        if (classContent != '') {
            this.addClass(classContent)
        }
    }

    getElement() {
        return this.element;
    }

    addClass(newClass) {
        this.element.classList.add(newClass);
    }
}