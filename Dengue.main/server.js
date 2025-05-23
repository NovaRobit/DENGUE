// Importamos las bibliotecas necesarias
// - express: para crear el servidor y manejar las rutas.
// - cors: para permitir el acceso al servidor desde otros dominios.
// - body-parser: para manejar datos enviados en formato JSON o formularios.
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Creamos una instancia de la aplicación Express, que será nuestro servidor.
const app = express();

// Definimos el puerto en el que se ejecutará el servidor.
// Usamos una variable de entorno (process.env.PORT) si está definida, o el puerto 3001 por defecto.
const port = process.env.PORT || 3001;

// Usamos middlewares:
// - cors(): habilita la política CORS para que otros dominios puedan acceder al servidor.
// - bodyParser.json(): permite recibir y procesar datos en formato JSON en las solicitudes.
// - bodyParser.urlencoded(): permite procesar datos enviados desde formularios HTML.
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Importamos las rutas de "alumnos" y "maestros".
// Estas rutas se encargan de manejar las solicitudes relacionadas con cada módulo o entidad.
const alumnosRoutes = require('./routes/alumnos');
const maestrosRoutes = require('./routes/maestros');

// Asignamos las rutas específicas a un prefijo:
// - Las rutas relacionadas con "alumnos" estarán bajo "/api/alumnos".
// - Las rutas relacionadas con "maestros" estarán bajo "/api/maestros".
app.use('/api/alumnos', alumnosRoutes);
app.use('/api/maestros', maestrosRoutes);

// Iniciamos el servidor para que escuche las solicitudes en el puerto definido.
// Una vez activo, se imprime un mensaje en la consola con la URL de acceso.
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
