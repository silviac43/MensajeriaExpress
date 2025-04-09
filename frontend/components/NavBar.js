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
        if (!link) return;
  
        e.preventDefault();
        const path = new URL(link.href).pathname;
        router.enhancedNavigateTo(this.routes[path], path); // Pass DOM element only
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