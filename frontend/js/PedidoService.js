export default class PedidoService {

    constructor () {}

    async requestPedidos() {
        const data = await this.getPedidos();
        // console.log(data);
        if (data.length != 0 ) {
            let dataConverted = this.convertData(data);
            return dataConverted;
        } else {
            console.error('Error en requestPedidos');
            return {};
        }
        
    }

    convertData(data) {
        let result = data.map((el => {
            return {
                'id': el['id'],
                'Cliente': el['cliente']['nombre'],
                'Dirección de recogida': el['direccionRecogida'],
                'Dirección de entrega': el['direccionEntrega'],
                'Tipo de paquete': el['tipoPaquete'],
                'Estado': el['estado']
            }
        }))
        return result;
    }

    async getPedidos() {
        const token = localStorage.getItem("user");
        try {
            const response = await fetch('http://localhost:8080/api/pedidos', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            if (!response.ok) throw new Error('Error al obtener pedidos.')
            return await response.json();
        } catch (error) {
            console.error("Error en getPedidos:", error);
            return [];
        }
    }

    async deletePedido(id) {
        const token = localStorage.getItem("user");
        try {
            const response = await fetch(`http://localhost:8080/api/pedidos/${id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            if (!response.ok) throw new Error('Error al eliminar el pedido.')
            return response.ok;
        } catch (error) {
            console.error("Error en deletePedido:", error);
            return [];
        }
    }
}