export default class Form {
    constructor(htmlContent) {
        this.htmlContent = htmlContent;
        this.element = document.createElement('FORM');
        this.element.innerHTML = this.htmlContent;
    }

    on(event, callback) {
        this.element.addEventListener(event, callback);
        return this;
    }
    // appendTo(selector) {
    //     const container = document.querySelector(selector);
    //     container?.appendChild(this.element);
    //     return this;
    // }

    // addClass(className) {
    //     this.element.classList.add(className);
    //     return this;
    // }
    getElement() {
        return this.element;
    }

}