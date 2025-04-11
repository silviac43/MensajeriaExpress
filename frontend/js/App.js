import AuthService from "./AuthService.js";
import PedidoService from "./PedidoService.js";
import Router from "./Router.js";
import Form from "../components/Form.js";
import NavBar from "../components/NavBar.js";
import Pedidos from "../components/Pedido.js";
import Cliente from "../components/Cliente.js";

export default class App {
    #router = null;
    // #pedidoService = null;

    constructor(config) {
        this.config = config;
        this.state = {
            isAuthenticated: false,
            user: null
        }
    }

    async init() {
        // Inicializa servicios
        // this.initServices();

        // Inicializa el router del contenido
        this.#router = new Router(this.config.routes);
        
        await this.initComponents();
        
        // console.log(this.clientesSection);
        
        this.loginNavBar.setRoutes({
            '/login': this.formLogin,
            '/register': this.formRegister
        })
        this.logedNavBar.setRoutes({
            '/pedidos': this.pedidosSection,
            '/clientes': this.clientesSection
        })

        // Inicializa el estado de autenticacion
        this.initializeAuth();

        document.addEventListener('authStateChanged', 
            () => this.handleAuthChange());
        window.addEventListener('storage', 
            (e) => this.handleStorageChange(e));

        // await this.renderComponents();
        
    }
    async initComponents () { // se puede convertir mas adelante en init components
        this.formLogin = await this.createLoginForm();
        this.formRegister = await this.createRegisterForm();
        this.loginNavBar = await this.createNavBar('loginNav.html');
        this.logedNavBar = await this.createLogedNavBar();
        this.pedidosSection = await this.createPedidosSection();
        this.clientesSection = await this.createClientesSection();
        this.#router.onRouteChange((url) => {
            if (this.state.isAuthenticated && this.state.user) {
                if (url === '/clientes') {
                    this.clientesSection.updateTable();
                } else if (url === '/pedidos') {
                    this.pedidosSection.updateTable();
                }
            }
        });
    }

    async createLogedNavBar() {
        let logedNav = await this.createNavBar('loggedNavBar.html');
        let logOutItem = document.createElement('li');
        let logOutLink = document.createElement('a');
        logOutItem.classList.add('nav-item');
        logOutLink.classList.add('nav-link','mx-4');
        logOutLink.onclick = this.logOut;
        logOutLink.innerText = 'Log out';
        logOutLink.setAttribute('id','log-out');
        logOutLink.setAttribute('active', 'true'); 
        logOutItem.appendChild(logOutLink)
        logedNav.getElement().childNodes[2].appendChild(logOutItem);
        return logedNav
    }

    logOut() {
        AuthService.logout();
    }

    async initializeAuth() {
        try {
            await this.updateAuthState();
        } catch (error) {
            console.error('Fallo en la comprobación inicial de autenticación -> ', error);
        }
    }

    async updateAuthState() {
        this.state.isAuthenticated = AuthService.isAuthenticated();
        this.state.user = AuthService.getToken();
        await this.renderComponents();
    }

    async renderComponents() {
        try {
            if (this.state.isAuthenticated && this.state.user) {
                this.renderNav(this.logedNavBar.getElement())
                this.renderAuthenticatedContent()
            } else {
                this.renderNav(this.loginNavBar.getElement())
                this.renderUnauthenticatedContent();
            }
        } catch (error) {
            console.error('Actualizacion de render fallida -> ', error);
        }
    }

    renderAuthenticatedContent() {
        // console.log('authenticated section');
        const currentPath = window.location.pathname;
        
        console.log(currentPath);
        if (currentPath == '/clientes'){
            // this.clientesSection.updateTable();
            this.renderContent(this.clientesSection.getElement(), '/clientes')
        } else {
            this.pedidosSection.updateTable();
            this.renderContent(this.pedidosSection.getElement(), '/pedidos')
        }
        
        // if(currentPath === '/pedidos') {
        //     this.pedidosSection.updateTable();
        //     this.renderContent(this.pedidosSection.getElement(), '/pedidos')
        // } else if (currentPath == '/clientes'){
        //     this.renderContent(this.pedidosSection.getElement(), '/pedidos')
        // }
    }

    renderUnauthenticatedContent() {
        const currentPath = window.location.pathname;
        if(currentPath === '/register') {
            this.renderContent(this.formRegister.getElement(), '/register')
        } else {
            this.renderContent(this.formLogin.getElement(), '/login');
        }
    }

    renderContent(component, url) {
        this.#router.enhancedNavigateTo(component, url)
    }

    renderNav(component) {
        let navbar = document.getElementById('navbar');
        navbar.innerHTML = ''
        navbar.appendChild(component)
    }

    async getHtml(route) {
        try {
            // console.log("getHtml route -> " + route);
            const response = await fetch(route);
            if (!response.ok) throw new Error(`Failed to fetch ${route}`);
            const html = await response.text();
            return html;
        } catch (error) {
            if (!response.ok) throw new Error(`Failed to fetch ${route}`);
            return await response.text();
        }
    }

    // Event handlers
    async handleAuthChange() {
        try {
            await this.updateAuthState();
        } catch (error) {
            console.error("Error en la gestión del cambio de estado de autenticación -> ", error);
        }
    }
    
    async handleStorageChange(e) {
        if (e.key === 'isAuthenticated' || e.key === 'user') {
            await this.handleAuthChange();
        }
    }

    async handleAuth({user, pass}) {
        return await AuthService.login(user, pass);      
    }

    async handleRegister(data) {
        return await AuthService.register(data);
    }

    // async handleRegister({})

    updateState(isAuthenticated, user) {
        this.state = {
            isAuthenticated,
            user
        } 
        
    }

    // initServices() {
    //     // this.#pedidoService = new PedidoService();
    // }

    // Creo el register form
    async createRegisterForm() {
        let htmlRegisterForm = await this.getHtml('register.html') 
        const registerForm = new Form(htmlRegisterForm)
        registerForm.on("submit", async (e) => {
            e.preventDefault();
            let data = {
                nombreUsuario: document.getElementById('userInput').value,
                email: document.getElementById('emailInput').value,
                password: document.getElementById('passInput').value,
                tipo: document.getElementById('userType').value
            }
            try {
                const response = await this.handleRegister(data);
                if(!response) throw new Error("No message in response");
                this.showTemporaryMessage(response)
                console.log(response);
                
            } catch(error) {
                this.showTemporaryMessage('Error en el registro', true);
            }
        })
        return registerForm;
    }

    showFormMessage(text, isError = false) {
        const msgElement = document.getElementById('formMessage');
        msgElement.textContent = text;
        msgElement.style.display = 'block';
        msgElement.style.color = isError ? '#dc3545' : '#28a745'; // Red for error, green for success
    }

    showTemporaryMessage(text, isError = false, duration = 3000) {
        this.showFormMessage(text, isError);
        setTimeout(() => {
          document.getElementById('formMessage').style.display = 'none';
        }, duration);
      }

    // Creo el login form
    async createLoginForm() {
        let htmlFormLogin = await this.getHtml('login.html') 
        const formLogin = new Form(htmlFormLogin)
        formLogin.on("submit", async (e) => {
            e.preventDefault();
            let data = {
                user: document.getElementById('userInput').value,
                pass: document.getElementById('passInput').value
            }
            try {
                const token = await this.handleAuth(data);
                if(!token) throw new Error("Token not found in response");
                // console.log("Token llego a App!");
                this.updateState(true,token)
                
            } catch(error) {
                console.error("Error -> ", error.message)
            }
        })
        
        return formLogin;
    }

    async createPedidosSection() {
        let html = await this.getHtml('Pedido.html');
        const pedidosSection = new Pedidos(html);
        // pedidosSection.addButton();
        return pedidosSection;
    }

    async createClientesSection() {
        let html = await this.getHtml('Cliente.html');
        const clientesSection = new Cliente(html);
        return clientesSection;
    }

    async createNavBar (htmlRoute) {
        
        let html = await this.getHtml(htmlRoute);
        const nav = new NavBar(html);
        nav.handleClicks(this.#router)
        return nav;
    }

    // Manejador de rutas
    setupRouteHandlers() {
        // Maneja el boton adelante / atras del browser
        window.addEventListener('popstate', () => {
            this.renderComponents();
        });
    

    }

}

