import AccionButon from "./AccionButon.js";

export default class Acciones {
    #element = null;
    #actions = null;
    #rowData = null;

    constructor (actions, rowData = null) {
        this.#element = document.createElement('div');
        this.#actions = actions;
        this.#rowData = rowData;
        this.initializeButtons();
    }

    initializeButtons() {
        this.#actions.forEach(action => {            
            let button = new AccionButon(action, this.#rowData);
            this.#element.appendChild(button.getElement());
        });
    }

    getElement() {
        return this.#element;
    }

}