import React from 'react';
import { Routes, Route } from "react-router-dom";

// Importamos los componentes que se mostrarán en cada ruta.
import Home from '../componente/home';
import Datos from '../componente/datos';
import AgregarDatos from '../componente/agregardatos';
import Archivos from '../componente/archivos';

function Rutas() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/agregardatos' element={<AgregarDatos />} />
        <Route path='/datos' element={<Datos />} />
        <Route path='/archivos' element={<Archivos />} />
      </Routes>
    </div>
  );
}

export default Rutas;


