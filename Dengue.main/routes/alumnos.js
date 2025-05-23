// Importamos Express para manejar rutas.
// Usamos el método Router() de Express para definir rutas específicas de "alumnos".
const express = require('express');
const router = express.Router();

// Creamos un arreglo con datos de ejemplo para simular una base de datos en memoria.
// Cada objeto representa un alumno con información como matrícula, nombre, edad, carrera, entre otros.

let alumnos = [
  { id: 1, matricula: '23E20096', nombre: 'Mario Aguilar', edad: 19, carrera: 'Sistemas',imagen:'Sin Foto .jpg',semestre:'Tercer Semestre',turno:'Matutino'},
  { id: 3, matricula: '23E20103', nombre: 'Jesus Burelo', edad: 19, carrera: 'Sistemas' ,imagen:'Burelo.jpg',semestre:'Tercer Semestre',turno:'Matutino'},
  { id: 4, matricula: '23E20104', nombre: 'Eduardo Chan', edad: 22, carrera: 'Sistemas', imagen:'Eduardo Chan.jpg',semestre:'Tercer Semestre',turno:'Matutino'},
  { id: 5, matricula: '23E20105', nombre: 'Dayner Cruz', edad: 20, carrera: 'Sistemas' ,imagen:'Dayner Cruz.jpg',semestre:'Tercer Semestre',turno:'Matutino'},
  { id: 6, matricula: '23E20106', nombre: 'Itzel Cruz', edad: 19, carrera: 'Sistemas',imagen:'Sin Foto .jpg',semestre:'Tercer Semestre' ,turno:'Matutino'},
  { id: 7, matricula: '23E20107', nombre: 'Darinel Cruz', edad: 19, carrera: 'Sistemas' ,imagen:'Darinel.jpg',semestre:'Tercer Semestre',turno:'Matutino'},
  { id: 8, matricula: '23E20477', nombre: 'Lucia Damian', edad: 19, carrera: 'Sistemas',imagen:'Lucia Damian.jpg',semestre:'Tercer Semestre' ,turno:'Matutino'},
  { id: 9, matricula: '23E20108', nombre: 'Christian Diaz', edad: 19, carrera: 'Sistemas',imagen:'Christian Diaz.jpg',semestre:'Tercer Semestre',turno:'Matutino'},
  { id: 10, matricula: '23E20110', nombre: 'Axl Gamas', edad: 19, carrera: 'Sistemas',imagen:'Axl Gamas.jpg',semestre:'Tercer Semestre',turno:'Matutino'},
  { id: 11, matricula: '23E20113', nombre: 'Daniela Pozo', edad: 19, carrera: 'Sistemas' ,imagen:'Daniela Pozo.jpg',semestre:'Tercer Semestre',turno:'Matutino'},
  { id: 12, matricula: '23E20115', nombre: 'Marina Guerra', edad: 19, carrera: 'Sistemas', imagen:'Marina Guerra.jpg',semestre:'Tercer Semestre',turno:'Matutino'},
  { id: 13, matricula: '23E20116', nombre: 'Luis Flores', edad: 19, carrera: 'Sistemas' ,imagen:'Luis Flores.jpg',semestre:'Tercer Semestre',turno:'Matutino'},
  { id: 14, matricula: '23E20121', nombre: 'Henris Lopez', edad: 19, carrera: 'Sistemas',imagen:'Henris Lopez.jpg',semestre:'Tercer Semestre' ,turno:'Matutino'},
  { id: 15, matricula: '23E20124', nombre: 'Yahir Meza', edad: 21, carrera: 'Sistemas' ,imagen:'Yahir Meza.jpg',semestre:'Tercer Semestre',turno:'Matutino'},
  { id: 16, matricula: '23E20126', nombre: 'Alejandro Navarro', edad: 19, carrera: 'Sistemas',imagen:'Alejandro Navarro.jpg',semestre:'Tercer Semestre' ,turno:'Matutino'},
  { id: 17, matricula: '23E20127', nombre: 'Gerald Ortiz', edad: 19, carrera: 'Sistemas',imagen:'Gerald Ortiz.jpg',semestre:'Tercer Semestre',turno:'Matutino'},
  { id: 18, matricula: '23E20128', nombre: 'Mario Camara', edad: 19, carrera: 'Sistemas',imagen:'Mario Camara.jpg',semestre:'Tercer Semestre',turno:'Matutino'},
  { id: 19, matricula: '23E20132', nombre: 'Misraim Ruiz', edad: 19, carrera: 'Sistemas' ,imagen:'Michi.jpg',semestre:'Tercer Semestre',turno:'Matutino'},
  { id: 20, matricula: '23E20134', nombre: 'Juan Aguirre', edad: 19, carrera: 'Sistemas', imagen:'Juan Sanchez.jpg',semestre:'Tercer Semestre',turno:'Matutino'},
  { id: 21, matricula: '23E20139', nombre: 'Norberto Vazquez', edad: 19, carrera: 'Sistemas' ,imagen:'Norberto Vazquez.jpg',semestre:'Tercer Semestre',turno:'Matutino'},
  { id: 22, matricula: '23E20140', nombre: 'Yesenia Villa', edad: 19, carrera: 'Sistemas',imagen:'Yesi Villa.jpg',semestre:'Tercer Semestre' ,turno:'Matutino'},
  { id: 23, matricula: '23E20142', nombre: 'Carlos Zetina', edad: 19, carrera: 'Sistemas' ,imagen:'Carlos Zetina2.jpg',semestre:'Tercer Semestre',turno:'Matutino'},
];


// Ruta para obtener todos los alumnos.
// Cuando un cliente accede a esta ruta, devolvemos la lista completa de alumnos en formato JSON.
router.get('/', (req, res) => {
  res.json(alumnos); // Devuelve todos los alumnos en la respuesta.
});

// Ruta para agregar un nuevo alumno.
// Aquí el cliente envía los datos del alumno en el cuerpo de la solicitud.
router.post('/', (req, res) => {
  // Creamos un nuevo alumno con un ID único y los datos enviados por el cliente.
  const nuevoAlumno = { id: alumnos.length + 1, ...req.body };
  alumnos.push(nuevoAlumno); // Agregamos el nuevo alumno al arreglo.
  res.status(201).json(nuevoAlumno); // Respondemos con el alumno recién agregado y un estado HTTP 201.
});

// Ruta para actualizar un alumno existente.
// Se busca el alumno por su ID, que se envía como parte de la URL.
router.put('/:id', (req, res) => {
  // Encontramos el índice del alumno con el ID proporcionado.
  const alumnoIndex = alumnos.findIndex(al => al.id === parseInt(req.params.id));
  if (alumnoIndex === -1) {
    // Si no encontramos el alumno, respondemos con un estado 404 y un mensaje de error.
    return res.status(404).json({ mensaje: 'Alumno no encontrado' });
  }
  // Actualizamos los datos del alumno encontrado con la información enviada en la solicitud.
  alumnos[alumnoIndex] = { ...alumnos[alumnoIndex], ...req.body };
  res.json(alumnos[alumnoIndex]); // Respondemos con los datos del alumno actualizado.
});

// Ruta para eliminar un alumno.
// Recibimos el ID del alumno a eliminar en la URL.
router.delete('/:id', (req, res) => {
  // Filtramos el arreglo para eliminar el alumno con el ID proporcionado.
  const alumnosFiltrados = alumnos.filter(al => al.id !== parseInt(req.params.id));
  // Verificamos si se eliminó algún alumno comparando el tamaño del arreglo.
  const mensaje = alumnosFiltrados.length < alumnos.length ? 'Alumno eliminado' : 'Alumno no encontrado';
  alumnos = alumnosFiltrados; // Actualizamos el arreglo global de alumnos.
  res.json({ mensaje }); // Respondemos con un mensaje indicando el resultado.
});

// Exportamos el router para que pueda ser utilizado en otros archivos.
// Esto es necesario para integrarlo en la aplicación principal de Express.
module.exports = router;
