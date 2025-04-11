import PedidoService from "../js/PedidoService.js";
import Tabla from "./Tabla.js";

export default class Pedido {
    #table = null;
    #element = null;
    #service = null;
    #createForm = null;
    // #addButton = null;

    constructor(htmlContent) {
        this.#element = document.createElement('div');
        this.#element.innerHTML = htmlContent;
        this.#table = new Tabla();
        this.#createForm = 
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
                    console.log('Eliminar pedido clicked');
                    const confirmation = window.confirm(`Esta seguro que desea eliminar el pedido con ID ${rowData.id}?`)
                    if(confirmation) {
                        this.deletePedido(rowData);
                    } else {
                        return;
                    }
                }
            }
        ]);
        this.#service = new PedidoService();
    }

    

    async deletePedido(rowData) {
        let response = await this.#service.deletePedido(rowData.id);
        if (response) {
            window.alert(`El pedido con ID "${rowData.id}" se elimino correctamente!`);
            this.updateTable();
        } else {
            window.alert(`Ha habido un error eliminando el pedido "${rowData.id}" :(`);
            this.updateTable();
        }
    }

    async updateTable() {
        let serviceData = await this.#service.requestPedidos();
        
        let data = {
            content: serviceData,
            headers: Object.keys(serviceData[0])
        }
        this.#table.setData(data);
        this.#table.setTable();
        document.getElementById('content-section').appendChild(this.#table.getElement())
    }

    getElement() {
        return this.#element;
    }

}