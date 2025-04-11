import TablaData from "./TablaData.js";
import Acciones from "./Acciones.js";

export default class Tabla {
    #header = null;
    #body = null;
    #element = null;
    #data = null;
    #acciones = null;

    constructor() {
        this.#element = document.createElement('table');
        this.#element.classList.add('table', 'table-bordered', 'table-striped');
        this.resetElements(); // Initialize header and body
    }

    resetElements() {
        this.#header = document.createElement('thead');
        this.#header.classList.add('table-dark');
        this.#body = document.createElement('tbody');
    }

    setData(data) {
        this.#data = data;
    }

    setTable() {
        this.#element.innerHTML = ''; 
        this.resetElements(); 
        this.setHeader();
        this.setBody();
    }

    setHeader() {
        let row = document.createElement('tr');
        this.#data.headers.forEach(header => {
            let th = new TablaData(header, 'th');
            row.appendChild(th.getElement())
        });
        let acciones = new TablaData('Acciones', 'th');
        row.appendChild(acciones.getElement())
        
        this.#header.appendChild(row);
        this.#element.appendChild(this.#header);
    }

    setBody() {
        this.#body.innerHTML = '';
        this.#data.content.forEach(rowContent => {
            let row = document.createElement('tr');
            Object.entries(rowContent).forEach(entry => {
                let td = null;
                if(entry[0] == 'Estado') {
                    td = new TablaData(`<span class="badge bg-warning">${entry[1]}</span>`,'td')
                } else {
                    td = new TablaData(entry[1],'td');
                }
                row.appendChild(td.getElement());
            })

            let acciones = this.getAcciones(rowContent);
            row.appendChild(acciones.getElement());
            this.#body.appendChild(row);
        })
        this.#element.appendChild(this.#body);
    }

    setAcciones(acciones) {
        this.#acciones = acciones;
    }

    getAcciones (rowData = null) {
        return new Acciones(this.#acciones, rowData)
    }

    getElement() {
        return this.#element;
    }
}