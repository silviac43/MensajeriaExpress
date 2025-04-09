export class PedidosService {
    static async getPedidos() {
      const token = localStorage.getItem("user");
  
      try {
        const response = await fetch("http://localhost:8080/api/pedidos", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
  
        if (!response.ok) throw new Error("Error al obtener pedidos");
  
        return await response.json();
      } catch (error) {
        console.error("Error en getPedidos:", error);
        return [];
      }
    }
}