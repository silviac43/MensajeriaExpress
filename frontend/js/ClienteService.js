export default class ClienteService{

    constructor () {}

    async requestClientes() {
        const data = await this.getClientes();
        if (data.length != 0 ) {
            let dataConverted = this.convertData(data);
            return dataConverted;
        } else {
            console.error('Error en requestClientes');
            return {};
        }
    }

    convertData(data) {
        let result = data.map((el => {
            return {
                'id': el['id'],
                'Nombre': el['nombre'],
                'Telefono': el['telefono'],
                'Dirección': el['direccion'],
                'Email': el['email']
            }
        }))
        return result;
    }

    async getClientes() {
        const token = localStorage.getItem("user");
        try {
            const response = await fetch('http://localhost:8080/api/clientes', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            if (!response.ok) throw new Error('Error al obtener clientes.')
            return await response.json();
        } catch (error) {
            console.error("Error en getClientes:", error);
            return [];
        }
    }

    async deleteCliente(id) {
        const token = localStorage.getItem("user");
        try {
            const response = await fetch(`http://localhost:8080/api/clientes/${id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            if (!response.ok) throw new Error('Error al eliminar el cliente.')
            return response.ok;
        } catch (error) {
            console.error("Error en deleteCliente:", error);
            return [];
        }
    }

    async addCliente(data) {
        const token = localStorage.getItem("user");
        try {
            const response = await fetch('http://localhost:8080/api/clientes', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data)
            });
        
            if (response.ok) {
                alert('Cliente registrado con éxito!');
                return response;
            } else {
                throw new Error('Error en el registro');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al registrar el cliente');
        }
    }

    async updateCliente(data, id) {
        const token = localStorage.getItem("user");
        try {
            const response = await fetch(`http://localhost:8080/api/clientes/${id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data)
            });
        
            if (response.ok) {
                alert('Cliente actualizado con éxito!');
                return response;
            } else {
                throw new Error('Error en la actualizacion.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al actualizar el cliente');
        }
    }
}

// INSERT INTO cliente (nombre, telefono, direccion, email) 
// VALUES 
// ('Juan Pérez', '555-1234', 'Calle Principal 123', 'juan.pere2@example.com'),
// ('María García', '555-5678', 'Avenida Central 456', 'maria.garcia@example.com'),
// ('Carlos López', '555-9012', 'Boulevard Norte 789', 'carlos.lopez@example.com'),
// ('Ana Martínez', '555-3456', 'Plaza Sur 321', 'ana.martinez@example.com'),
// ('Luis Rodríguez', '555-7890', 'Calle Este 654', 'luis.rodriguez@example.com');

// INSERT INTO pedido (cliente_id, empresa_id, direccion_recogida, direccion_entrega, tipo_paquete, estado, notas)
// VALUES
// (1, 1, 'Calle Primavera 45', 'Avenida Libertad 120', 'Documentos', 'PENDIENTE', 'Entregar antes de las 15:00'),
// (2, 1, 'Boulevard Central 200', 'Calle Flores 33', 'Pequeño', 'EN_TRANSITO', 'Fragil - Manejar con cuidado'),
// (3, 2, 'Plaza Mayor 12', 'Callejon San Miguel 8', 'Mediano', 'ENTREGADO', 'Requería firma del destinatario'),
// (1, 1, 'Avenida Norte 500', 'Calle Sur 25', 'Grande', 'PENDIENTE', 'Paquete pesado - necesita 2 personas'),
// (2, 2, 'Callejon del Rosal 15', 'Boulevard Industrial 300', 'Documentos', 'ENTREGADO', 'Cliente canceló el envío');

