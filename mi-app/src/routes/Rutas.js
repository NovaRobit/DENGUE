import React from 'react';
import { Routes, Route } from "react-router-dom";

// Importamos los componentes que se mostrarán en cada ruta.
import Home from '../components/home';
import Datos from '../components/datos';
import MultiPaso from '../components/Multipaso';
import Archivos from '../components/archivos';
import VerDatos from "../components/menu";
import ResumenRecipientes from '../components/ResumenRecipientes';



function Rutas() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Multipaso' element={<MultiPaso />} />
        <Route path='/datos' element={<Datos />} />
        <Route path='/archivos' element={<Archivos />} />
        <Route path='/ver-datos' element={<VerDatos />} />
        <Route path="/resumen-recipientes" element={<ResumenRecipientes />}/>
</Routes>
    </div>
  );
}

export default Rutas;


