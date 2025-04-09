export default class AuthService {
    static async login(username, password) {
        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombreUsuario: username, password })
            })
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Login failed with status ${response.status}`);
            }
            console.log("login successfull!");
            let data = await response.json();

            this.sethAuthData(data.token);

            return data;
        } catch (error) {
            console.error('Login error -> ', error.message);
            throw error;
        }
    }

    static sethAuthData(token) {
        localStorage.setItem('user', token);
        localStorage.setItem('isAuthenticated', 'true');
        // Dispatch global event ??????
        document.dispatchEvent(new CustomEvent('authStateChanged'));
    }

    static async register ({nombreUsuario, email, password, tipo}) {
        try { 
            const response = await fetch('http://localhost:8080/auth/register', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombreUsuario,
                    email,
                    password,
                    tipo
                })
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Registration failed with status ${response.status}`);
            }
            console.log("Register successfull!");
            let data = await response.json();
            return data.message;
        } catch (error) {
            console.error('Register error -> ', error.message);
            throw error;
        }
    }

    static logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
        console.log("Logged out successfully");
        document.dispatchEvent(new CustomEvent('authStateChanged'));
    }

    static isAuthenticated() {
        return (
            localStorage.getItem('isAuthenticated') === 'true'
        )
    }

    static getToken() {
        return localStorage.getItem('user');
    }
}