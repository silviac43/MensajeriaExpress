import PedidoService from "../js/PedidoService.js";
import Tabla from "./Tabla.js";

export default class Pedido {
    #table = null;
    #element = null;
    #service = null;
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
            // {
            //     title: 'Ver más',
            //     classes: ['btn', 'btn-sm', 'btn-info', 'action-btn'],
            //     iconClasses: ['bi', 'bi-eye-fill'],
            //     onClick: (rowData) => {
            //         console.log(rowData);
                    
            //         window.alert('Notas adicionales del pedido ID ' + rowData.id + ':\n' + rowData.notas);
                    
            //     }
            // },
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
        
        
        
        // console.log(this.#addButton);
        
        
        // this.#element.appendChild(this.#addButton)
        this.#service = new PedidoService();
    }

    // addButton( ) {
    //     this.#addButton = document.createElement('button');
    //     this.#addButton.classList.add('btn','btn-secondaryplus', 'align-self-end', 'my-3');
    //     this.#addButton.setAttribute('id', 'add');
    //     this.#addButton.setAttribute('style', 'width: auto;');
    //     this.#addButton.innerText = 'Agregar nuevo';
    //     this.#addButton.onclick = () => console.log('clicked');
    //     console.log(this.#element);
        
    //     // let contentSection = document.getElementById('content-section');
    //     // contentSection.insertBefore(addButton, contentSection);
    //     // console.log(this.#element);
    // }

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