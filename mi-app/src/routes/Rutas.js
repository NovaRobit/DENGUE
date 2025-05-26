import React from 'react';
import { Routes, Route } from "react-router-dom";

// Importamos los componentes que se mostrarán en cada ruta.
import Home from '../components/home';
import Datos from '../components/datos';
import AgregarDatos from '../components/agregardatos';
import Archivos from '../components/archivos';
import VerDatos from "../components/menu";

function Rutas() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/agregardatos' element={<AgregarDatos />} />
        <Route path='/datos' element={<Datos />} />
        <Route path='/archivos' element={<Archivos />} />
        <Route path='/ver-datos' element={<VerDatos />} />
</Routes>
    </div>
  );
}

export default Rutas;


