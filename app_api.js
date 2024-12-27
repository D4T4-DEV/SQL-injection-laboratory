import express from 'express'
import mysql from 'mysql2'

// Inicializacion de express
const app = express();

// Middleware para poder obtener el contenido de las solicitudes POST en formularios
app.use(express.urlencoded({ extended: true })); // Aceptar Cadenas o arreglos
app.use(express.json()); // Entender datos en Formato JSON


// Cadena de conexion
const db = mysql.createConnection({
    host: 'localhost',
    user: 'user_bd_inyeccion',
    password: 'SoyUnUsu3rPru3ba:D',
    database: 'INYECTION_SQL',
    port: 3006
});

// Conexion a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos exitosa');
});

// ENDPOINT DE LOGIN (Vulnerable)
app.post('/login-inj-sql', (req, res) => {
    const { username, password } = req.body;

    // Consulta vulnerable a SQL Injection
    const query = `SELECT * FROM Usuarios WHERE usuario = '${username}' AND contraseña = '${password}'`;

    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Error interno del servidor');
            console.error(err);
            return;
        }

        if (results.length > 0) {
            res.send({
                msg: 'Inicio de sesión exitoso', 
                data: results[0], 
                consulta: `SELECT * FROM Usuarios WHERE usuario = '${username}' AND contraseña = '${password}'`
            });
        } else {
            res.status(401).send('Usuario o contraseña incorrectos');
        }
    });
});

// ENDPOINT DE LOGIN (No vulnerable)
app.post('/login-no-inj-sql', (req, res) => {
    const { username, password } = req.body;

    // Consulta vulnerable a SQL Injection
    const query = 'SELECT * FROM Usuarios WHERE usuario = ? AND contraseña = ?';

    db.query(query, [username, password], (err, results) => {
        if (err) {
            res.status(500).send('Error interno del servidor');
            console.error(err);
            return;
        }

        if (results.length > 0) {
            res.send({
                msg: 'Inicio de sesión exitoso', 
                data: results[0], 
                consulta: `SELECT * FROM Usuarios WHERE usuario = ? AND contraseña = ? -> ? Parametros de [usuario: ${username}, contraseña: ${password}]`
            });
        } else {
            res.status(401).send('Usuario o contraseña incorrectos');
        }
    });
});

const PORT =  3002;
const URL_API = 'localhost';
const PROTOCOL = 'http';

app.listen(PORT, () => {
    console.log(`Escuchando en ${PROTOCOL}://${URL_API}:${PORT}/`);
});