export default class AccionButon {
    #element = null;
    #icon = null;
    #onClick = null;
    #rowData = null;

    constructor({title, classes, iconClasses, onClick}, rowData = null) {
        this.#element = document.createElement('button');
        this.#icon = document.createElement('i');
        this.#onClick = onClick;
        this.#rowData = rowData;

        classes.forEach(x => {
            this.#element.classList.add(x);
        });
        iconClasses.forEach(x => {
            this.#icon.classList.add(x);
        })
        this.#element.setAttribute('title',title);
        this.#element.type = 'button';
        this.#element.addEventListener('click', (e) => {
            e.preventDefault();
            if (typeof this.#onClick === 'function') {
                this.#onClick(this.#rowData);  // Pass rowData to the click handler
            }
        });
 
        
        
        this.#element.appendChild(this.#icon);
    }

    getElement() {
        return this.#element;
    }
}