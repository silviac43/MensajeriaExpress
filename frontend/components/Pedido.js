import PedidoService from "../js/PedidoService.js";
import Tabla from "./Tabla.js";

export default class Pedido {
    #table = null;
    #element = null;
    #container = null;
    #service = null;

    constructor(htmlContent) {
        this.#element = document.createElement('div');
        this.#element.innerHTML = htmlContent;
        this.#table = new Tabla();
        this.#service = new PedidoService();
    }

    async updateTable() {
        let serviceData = await this.#service.requestPedidos();
        let data = {
            content: serviceData,
            headers: Object.keys(serviceData[0])
        }
        console.log(data);
        this.#table.setData(data);
        this.#table.setTable();
        document.getElementById('content-section').appendChild(this.#table.getElement())
    }

    async getData() {

    }

    getElement() {
        return this.#element;
    }

}