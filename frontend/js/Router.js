export default class Router {
    #routes = {};
    #protectedRoutes = [];
    #appContainer = null;

    #routeChangeListeners = []; // <-- NEW: Stores subscribed callbacks

    constructor(initRoutes, protectedRoutes = []) {
        this.#routes = initRoutes;
        this.#protectedRoutes = protectedRoutes;
        this.#appContainer = document.getElementById('app');
    }

    // getRoutes() {
    //     return this.#routes;
    // }

    // getProtectedRoutes() {
    //     return this.#protectedRoutes;
    // }

    // addRoutes(newRoutes) {
    //     if (typeof newRoutes !== "object") return;
    //     // console.log(newRoutes);
    //     Object.entries(newRoutes).forEach(entry => {
    //         this.#routes[entry[0]] = entry[1];
    //     });
    // }

    // addProtectedRoutes(newProtected) {
    //     newProtected.forEach((n) => this.#protectedRoutes.push(n))
    // }

    // navigateTo(url) {
    //     console.log("router navigateTo " + url);
    //     history.pushState(null, null, url);
    //     this.loadContent(url);
    // }

    // loadContent(url) {

    //     const route = this.#routes[url] || this.#routes["/home"]; // Ruta por defecto

    //     fetch(route)
    //         .then(response => response.text())
    //         .then(html => {
    //             document.getElementById("app").innerHTML = html;
    //         });
    // }

    // redirectTo(url) {
    //     console.log("router redirect to -> " + url);        
    //     history.replaceState(null,null,url)
    //     this.loadContent(url)
    // }

    // NEW: Allow components to subscribe to route changes
    onRouteChange(callback) {
        this.#routeChangeListeners.push(callback);
    }

    // NEW: Notify all listeners when the route changes
    #notifyRouteChange(url) {
        this.#routeChangeListeners.forEach(callback => {
            console.log('Route changes to '+url);
            callback(url)
        });
    }

    enhancedNavigateTo(component, url) {
        if(url == window.location.pathname) {
            console.log("equals");
            return
        }
        history.pushState(null, null, url);
        this.enhancedLoadContent(component)
        
    }

    enhancedLoadContent(component) {
        this.#appContainer.innerHTML = ''; // reset
        this.#appContainer.appendChild(component)
    }

}