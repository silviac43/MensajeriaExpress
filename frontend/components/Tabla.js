import TablaData from "./TablaData.js";

export default class Tabla {
    #header = null;
    #body = null;
    #element = null;
    #data = null;

    constructor() {
        this.#element = document.createElement('table');
        this.#element.classList.add('table','table-bordered','table-striped');
        this.#header = document.createElement('thead');
        this.#header.classList.add('table-dark');
        // this.#data = data;
        this.#body = document.createElement('tbody');
        // this.setHeader();
        // this.setBody();
        // console.log('tabla constructor',this.#header);
        
    }

    setData(data) {
        this.#data = data;
    }

    setTable() {
        this.setHeader();
        this.setBody();
    }

    setHeader() {
        let row = document.createElement('tr');
        this.#data.headers.forEach(header => {
            let th = new TablaData(header, 'th');
            row.appendChild(th.getElement())
        });
        // console.log('setHeader', this.#header);
        
        this.#header.appendChild(row);
        this.#element.appendChild(this.#header);
    }

    setBody() {
        this.#data.content.forEach(rowContent => {
            console.log(Object.values(rowContent));
            
            let row = document.createElement('tr');
            Object.values(rowContent).forEach(el => {
                let td = new TablaData(el,'td');
                row.appendChild(td.getElement());
            })
            this.#body.appendChild(row);
        })
        this.#element.appendChild(this.#body);
    }

    getElement() {
        return this.#element;
    }
}