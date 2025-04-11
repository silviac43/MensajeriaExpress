export default class NavBar {
    constructor(htmlContent) {
      this.htmlContent = htmlContent;
      this.element = document.createElement('div');
      this.element.innerHTML = this.htmlContent;
    }
  
    handleClicks(router) {
      
      // Use arrow function to auto-bind `this`
      this.element.addEventListener("click", (e) => {
        const link = e.target.closest("[data-link]");
        // console.log(link);
        
        if (!link) return;
        // console.log(link);
        
        e.preventDefault();
        const path = new URL(link.href).pathname;
        if (path == '/clientes' || path == '/pedidos') {
          document.getElementById('content-section').innerHTML = ''
          this.routes[path].updateTable();
        }
        router.enhancedNavigateTo(this.routes[path].getElement(), path); // 
      });
    }
  
    getElement() {
      return this.element;
    }
  
    // Optional cleanup
    destroy() {
      this.element.removeEventListener("click", this.handleClick);
    }

    setRoutes(routes) {
        this.routes = routes;
    }
  }