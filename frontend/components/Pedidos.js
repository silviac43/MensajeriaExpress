import { PedidosService } from "../js/PedidosService.js";

export default class Pedidos {
    constructor(htmlContent) {
        this.htmlContent = htmlContent;
        this.element = document.createElement('div');
        this.element.innerHTML = this.htmlContent;
        this.element.classList.add("mt-5")
        this.container = document.getElementById('contenido-dinamico')
        this.subnav = document.getElementById('sub-nav')
    }

    on(event, callback) {
        this.element.addEventListener(event, callback);
        return this;
    }

    // async renderContent() {
    //     let container = document.getElementById('contenido-dinamico');
    //     container.innerHTML = `
    //     <h4>Listado de Pedidos</h4>
    //     <table class="table table-striped">
    //         <thead>
    //         <tr>
    //             <th>Cliente</th>
    //             <th>Empresa</th>
    //             <th>Dirección Recogida</th>
    //             <th>Dirección Entrega</th>
    //             <th>Tipo Paquete</th>
    //             <th>Estado</th>
    //             <th>Notas</th>
    //         </tr>
    //         </thead>
    //         <tbody id="tabla-listado">
    //         <tr><td colspan="7" class="text-center">Cargando...</td></tr>
    //         </tbody>
    //     </table>
    //     `;
    //     const pedidos = await PedidosService.getPedidos();
    //     this.renderTabla(pedidos);
    // }

    // renderTabla(pedidos) {
    //     const tbody = document.getElementById("tabla-listado");
    //     tbody.innerHTML = "";
    
    //     if (!pedidos || pedidos.length === 0) {
    //       tbody.innerHTML = `<tr><td colspan="7" class="text-center">No hay pedidos.</td></tr>`;
    //       return;
    //     }
    
    //     pedidos.forEach(pedido => {
    //       const fila = document.createElement("tr");
    //       fila.innerHTML = `
    //         <td>${pedido.cliente?.nombre || `ID: ${pedido.cliente?.id}`}</td>
    //         <td>${pedido.empresa?.nombre || `ID: ${pedido.empresa?.id}`}</td>
    //         <td>${pedido.direccionRecogida}</td>
    //         <td>${pedido.direccionEntrega}</td>
    //         <td>${pedido.tipoPaquete}</td>
    //         <td>${pedido.estado}</td>
    //         <td>${pedido.notas || 'Sin notas'}</td>
    //       `;
    //       tbody.appendChild(fila);
    //     });
    // }

    async render() {

        this.subnav.innerHTML = `<div class="btn-group mb-3">
                <button class="btn btn-outline-primary" id="btn-listar">Listar</button>
                <button class="btn btn-outline-success" id="btn-agregar">Agregar</button>
                <button class="btn btn-outline-warning" id="btn-editar">Editar</button>
                <button class="btn btn-outline-danger" id="btn-eliminar">Eliminar</button>
            </div>`

        this.container.innerHTML = `
            <div id="listar-pedidos" class="seccion"></div>
            <div id="agregar-pedido" class="seccion d-none"></div>
            <div id="editar-pedido" class="seccion d-none"></div>
            <div id="eliminar-pedido" class="seccion d-none"></div>
        `;
    
        this.setupEventListeners();
        this.showSection("listar-pedidos");
        this.cargarListado(); // ejemplo
    }
    
    setupEventListeners() {
        document.getElementById('btn-listar').addEventListener("click", () => {
            console.log('clicked');
            
          this.showSection("listar-pedidos");
          this.cargarListado();
        });
        this.subnav.querySelector("#btn-agregar").addEventListener("click", () => {
          this.showSection("agregar-pedido");
          // this.renderFormularioAgregar();
        });
    
        // Y así para los demás botones...
      }
    
      showSection(id) {
        const secciones = this.container.querySelectorAll(".seccion");
        secciones.forEach(sec => sec.classList.add("d-none"));
        const activa = this.container.querySelector(`#${id}`);
        if (activa) activa.classList.remove("d-none");
      }
    
      async cargarListado() {
        const pedidos = await PedidosService.getPedidos();
        const contenedor = this.container.querySelector("#listar-pedidos");
        contenedor.innerHTML = this.renderTabla(pedidos);
      }
    
      renderTabla(pedidos) {
        if (!pedidos || pedidos.length === 0) {
          return `<p class="text-center">No hay pedidos.</p>`;
        }
    
        return `
          <table class="table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Empresa</th>
                <th>Dirección Recogida</th>
                <th>Dirección Entrega</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th>Notas</th>
              </tr>
            </thead>
            <tbody>
              ${pedidos.map(p => `
                <tr>
                  <td>${p.cliente?.nombre || `ID: ${p.cliente?.id}`}</td>
                  <td>${p.empresa?.nombre || `ID: ${p.empresa?.id}`}</td>
                  <td>${p.direccionRecogida}</td>
                  <td>${p.direccionEntrega}</td>
                  <td>${p.tipoPaquete}</td>
                  <td>${p.estado}</td>
                  <td>${p.notas}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        `;
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