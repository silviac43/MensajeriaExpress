-- Crear el esquema
CREATE SCHEMA IF NOT EXISTS mensajeria;

-- Crear la tabla usuario
CREATE TABLE mensajeria.usuario (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombreUsuario VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    tipo ENUM('admin_general', 'admin_mensajeria', 'mensajero') NOT NULL
);

-- Crear la tabla empresa_mensajeria
CREATE TABLE mensajeria.empresa_mensajeria (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    administrador_id BIGINT UNSIGNED UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    FOREIGN KEY (administrador_id) REFERENCES mensajeria.usuario(id) ON DELETE CASCADE
);

-- Crear la tabla cliente
CREATE TABLE mensajeria.cliente (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(15) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE
);

-- Crear la tabla pedido
CREATE TABLE mensajeria.pedido (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    cliente_id BIGINT UNSIGNED NOT NULL,
    empresa_id BIGINT UNSIGNED NOT NULL,
    direccion_recogida VARCHAR(255) NOT NULL,
    direccion_entrega VARCHAR(255) NOT NULL,
    tipo_paquete VARCHAR(100) NOT NULL,
    estado VARCHAR(20) NOT NULL CHECK (estado IN ('PENDIENTE', 'ASIGNADO', 'EN_TRANSITO', 'ENTREGADO')),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notas TEXT,
    FOREIGN KEY (cliente_id) REFERENCES mensajeria.cliente(id) ON DELETE CASCADE,
    FOREIGN KEY (empresa_id) REFERENCES mensajeria.empresa_mensajeria(id) ON DELETE CASCADE
);

-- Crear la tabla mensajero
CREATE TABLE mensajeria.mensajero (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    usuario_id BIGINT UNSIGNED UNIQUE NOT NULL,
    empresa_id BIGINT UNSIGNED NOT NULL,
    disponibilidad BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (usuario_id) REFERENCES mensajeria.usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (empresa_id) REFERENCES mensajeria.empresa_mensajeria(id) ON DELETE CASCADE
);

-- Crear la tabla asignacion_pedido
CREATE TABLE mensajeria.asignacion_pedido (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    pedido_id BIGINT UNSIGNED NOT NULL,
    mensajero_id BIGINT UNSIGNED NOT NULL,
    fecha_asignacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pedido_id) REFERENCES mensajeria.pedido(id) ON DELETE CASCADE,
    FOREIGN KEY (mensajero_id) REFERENCES mensajeria.mensajero(id) ON DELETE CASCADE
);

-- Crear la tabla historial_pedido
CREATE TABLE mensajeria.historial_pedido (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    pedido_id BIGINT UNSIGNED NOT NULL,
    estado VARCHAR(20) NOT NULL CHECK (estado IN ('PENDIENTE', 'ASIGNADO', 'EN_TRANSITO', 'ENTREGADO')),
    fecha_cambio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pedido_id) REFERENCES mensajeria.pedido(id) ON DELETE CASCADE
);

-- Insertar datos en la tabla usuario
INSERT INTO mensajeria.usuario (nombreUsuario, email, password, tipo) VALUES
('Admin General', 'admin@example.com', 'admin123', 'admin_general'),
('Administrador Mensajería 1', 'admin1@mensajeria.com', 'admin123', 'admin_mensajeria'),
('Administrador Mensajería 2', 'admin2@mensajeria.com', 'admin123', 'admin_mensajeria');

-- Obtener los IDs generados
SELECT * FROM mensajeria.usuario;

-- Insertar datos en la tabla empresa_mensajeria (ajustar ID según el SELECT anterior)
INSERT INTO mensajeria.empresa_mensajeria (nombre, administrador_id) VALUES
('Mensajería Rápida', 2),
('Express Entregas', 3);

-- Insertar datos en la tabla cliente
INSERT INTO mensajeria.cliente (nombre, telefono, direccion, email) VALUES
('Juan Pérez', '3123456789', 'Calle 123, Bogotá', 'juan.perez@example.com'),
('María López', '3159876543', 'Carrera 45, Medellín', 'maria.lopez@example.com'),
('Carlos Ramírez', '3104567890', 'Avenida Siempre Viva, Cali', 'carlos.ramirez@example.com');

-- Insertar datos en la tabla pedido
INSERT INTO mensajeria.pedido (cliente_id, empresa_id, direccion_recogida, direccion_entrega, tipo_paquete, estado, notas) VALUES
(1, 1, 'Calle 123, Bogotá', 'Carrera 50, Bogotá', 'Documento', 'PENDIENTE', 'Entrega urgente'),
(2, 1, 'Carrera 45, Medellín', 'Avenida 30, Medellín', 'Caja pequeña', 'ASIGNADO', 'Manejar con cuidado'),
(3, 2, 'Avenida Siempre Viva, Cali', 'Centro Comercial Chipichape, Cali', 'Sobre', 'EN_TRANSITO', 'Entrega antes de las 5 pm');
