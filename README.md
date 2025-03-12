# 📦 Sistema de Mensajería Express

## 📌 Descripción
Este proyecto es una plataforma digital diseñada para optimizar la gestión de pedidos y entregas en empresas de mensajería express. Permite a las empresas asignar pedidos a mensajeros, realizar seguimiento en tiempo real y mejorar la organización de sus operaciones. 

## 🚀 Características Principales
- **Registro y autenticación de usuarios** (administradores y mensajeros)
- **Gestión de empresas de mensajería**
- **Registro y administración de clientes**
- **Creación y asignación de pedidos** a mensajeros
- **Seguimiento de pedidos** en tiempo real
- **Historial y reportes de pedidos**
- **Panel de información de clientes frecuentes**


## ⚙️ Instalación y Configuración
### 1️⃣ Clonar el Repositorio
```bash
git clone https://github.com/silviac43/mensajeria-express.git
cd mensajeria-express
```
### 2️⃣ Configurar el Backend
1. Instalar dependencias:
```bash
cd backend
mvn clean install
```
2. Configurar la base de datos en `application.properties`.
3. Iniciar el servidor:
```bash
mvn spring-boot:run
```

### 3️⃣ Configurar el Frontend
1. Instalar dependencias:
```bash
cd frontend
npm install
```
2. Ejecutar la aplicación:
```bash
ng serve --port=4600
```

## 💬 Autores
- Dilan Esteban Rey Sepulveda - 2190397
- Silvia Alejandra Cárdenas Santos - 2210102
