import App from './App.js'

// Configuración de la aplicación
const config = {
  routes: {
    "/login": "login.html",
    "/register": "register.html",
    "/pedidos": "pedidos.html",
    "/clientes": "clientes.html"
  }
};



document.addEventListener("DOMContentLoaded", () => {
    const app = new App(config);
    app.init()
})
