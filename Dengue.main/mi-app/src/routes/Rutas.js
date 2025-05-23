// Importamos React, la biblioteca principal para construir interfaces de usuario.
import React from 'react';

// Importamos los componentes `Routes` y `Route` desde `react-router-dom`.
// `Routes` permite agrupar y manejar las rutas de la aplicación.
// `Route` define una ruta específica y qué componente se debe mostrar cuando se visita esa ruta.
import { Routes, Route } from "react-router-dom";

// Importamos los componentes que se mostrarán en cada ruta.
import Home from '../componente/home'; // Página principal o de bienvenida.
import Tabla from '../componente/tabla'; // Componente para mostrar una tabla (probablemente relacionado con alumnos).
import Maestros from '../componente/Maestros'; // Página dedicada a maestros.
import TablaMaestros from '../componente/TablaMaestros'; // Componente para mostrar una tabla específica de maestros.
import Menu from '../componente/menu'; // Aunque está importado, este componente no se usa aquí.

// Creamos el componente `Rutas`, que define las rutas de navegación de la aplicación.
function Rutas() {
  return (
    <div>
      {/* `Routes` agrupa todas las rutas de la aplicación. */}
      <Routes>
        {/* Define una ruta para el componente `Home`. 
            Se mostrará cuando la URL sea exactamente `'/'`. */}
        <Route path='/' element={<Home />} />

        {/* Ruta para el componente `Tabla`. Se mostrará cuando la URL sea `'/tabla'`. */}
        <Route path='/tabla' element={<Tabla />} />

        {/* Ruta para el componente `Maestros`. 
            Se mostrará cuando la URL sea `'/Maestros'`. */}
        <Route path='/Maestros' element={<Maestros />} />

        {/* Ruta para el componente `TablaMaestros`. 
            Se mostrará cuando la URL sea `'/TablaMaestros'`. */}
        <Route path='/TablaMaestros' element={<TablaMaestros />} />
      </Routes>
    </div>
  );
}

// Exportamos el componente `Rutas` para que pueda ser utilizado en otros archivos.
export default Rutas;