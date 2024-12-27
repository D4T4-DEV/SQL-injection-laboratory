-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS INYECTION_SQL;

-- Usar la base de datos
USE INYECTION_SQL;

-- Crear la tabla de usuarios
CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos de ejemplo
INSERT INTO Usuarios (usuario, contraseña)
VALUES 
('usuario1', 'password123'),
('usuario2', 'passw0rd'),
('usuario3', 'qwerty');