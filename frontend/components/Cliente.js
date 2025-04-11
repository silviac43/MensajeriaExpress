import ClienteService from "../js/ClienteService.js";
import Tabla from "./Tabla.js";
import Form from "./Form.js";

export default class Cliente {
    #table = null;
    #element = null;
    #service = null;
    #createForm = null;
    #addButton = null;

    constructor(htmlContent) {
        this.#element = document.createElement('div');
        this.#element.innerHTML = htmlContent;
        this.#table = new Tabla();
        this.#table.setAcciones([
            {
                title: 'Editar',
                classes: ['btn', 'btn-sm', 'btn-primary', 'action-btn'],
                iconClasses: ['bi', 'bi-pencil-square'],
                onClick: () => {
                    console.log('Editar clicked');
                    
                }
            },
            {
                title: 'Eliminar',
                classes: ['btn', 'btn-sm', 'btn-danger', 'action-btn'],
                iconClasses: ['bi', 'bi-trash-fill'],
                onClick: (rowData) => {
                    // console.log('Deleting client with ID:', rowData.id);
                    const confirmation = window.confirm(`Esta seguro que desea eliminar el cliente ${rowData.Nombre}?`)
                    if(confirmation) {
                        this.deleteCliente(rowData);
                    } else {
                        return;
                    }
                }
            }
        ])
        this.initializeCreateForm();
        this.#service = new ClienteService();
    }

    async deleteCliente(rowData) {
        let response = await this.#service.deleteCliente(rowData.id);
        if (response) {
            window.alert(`El cliente "${rowData.Nombre}" se elimino correctamente!`);
            this.updateTable();
        } else {
            window.alert(`Ha habido un error eliminando a "${rowData.Nombre}" :(`);
            this.updateTable();
        }
    }

    async updateTable() {
        let serviceData = await this.#service.requestClientes();
        let data = {
            content: serviceData,
            headers: Object.keys(serviceData[0])
        }
        // console.log(data);
        this.#table.setData(data);
        this.#table.setTable();
        document.getElementById('content-section').appendChild(this.#table.getElement())
        document.getElementById('content-section').appendChild(this.#createForm.getElement())
        this.addButton();
        
    }

    addButton () {
        let wrapper = document.createElement('div');
        wrapper.setAttribute('class','d-flex justify-content-end')
        this.#addButton = document.createElement('button');
        this.#addButton.classList.add('btn','btn-secondaryplus', 'align-self-start', 'my-3');
        this.#addButton.setAttribute('id', 'add');
        this.#addButton.setAttribute('style', 'width: auto;');
        this.#addButton.innerText = 'Agregar nuevo';
        this.#addButton.onclick = () => this.renderCreateForm();
        console.log(this.#element);
        
        let contentSection = document.getElementById('content-section');
        wrapper.appendChild(this.#addButton)
        contentSection.appendChild(wrapper)
    }

    async initializeCreateForm() {
        let html = await this.getHtml('../createClientForm.html');
        this.#createForm = new Form(html);
        document.getElementById('content-section').appendChild(this.#createForm.getElement());
        this.#createForm.getElement().style.display = 'none';
        this.#createForm.on('submit', async (e) => {
            e.preventDefault();
            const formData = {
                nombre: document.getElementById('nombreInput').value,
                telefono: document.getElementById('telefonoInput').value,
                direccion: document.getElementById('direccionInput').value,
                email: document.getElementById('emailInput').value
            };

            let response = await this.#service.addCliente(formData);
            if(response.ok) {
                this.#createForm.getElement().reset();
                this.#createForm.getElement().style.display = 'none'
                this.#addButton.innerText = 'Agregar nuevo';
            } else {
                console.error('error al registrar cliente');
            }
            
        })
    }

    renderCreateForm() {
        if (this.#createForm.getElement().style.display == 'block') {
            this.#createForm.getElement().style.display = 'none'
            this.#addButton.innerText = 'Agregar nuevo';
        } else {
            this.#createForm.getElement().style.display = 'block';    
            this.#addButton.innerText = 'Cerrar';
            
        }
    }

    async getHtml(route) {
        try {
            // console.log("getHtml route -> " + route);
            const response = await fetch(route);
            if (!response.ok) throw new Error(`Failed to fetch ${route}`);
            const html = await response.text();
            return html;
        } catch (error) {
            if (!response.ok) throw new Error(`Failed to fetch ${route}`);
            return await response.text();
        }
    }

    getElement() {
        return this.#element;
    }
}