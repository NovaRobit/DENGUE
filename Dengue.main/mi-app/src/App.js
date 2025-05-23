// Importamos el archivo CSS para los estilos globales de la aplicación.
import './App.css';

// Importamos el componente `Router` de la librería `react-router-dom`.
// Este componente nos permite manejar las rutas de la aplicación (cambiar de página sin recargar el sitio).
import { BrowserRouter as Router } from "react-router-dom";

// Importamos el componente `Menu`, que probablemente contiene el menú de navegación de la aplicación.
import Menu from './componente/menu';

// Importamos el componente `Rutas`, que probablemente define y gestiona las rutas de la aplicación.
import Rutas from './routes/Rutas';

// Creamos el componente principal de la aplicación.
function App() {

  return (
    // El componente `Router` envuelve toda la aplicación para habilitar el uso de rutas.
    <Router>
      {/* Div principal con una clase de Bootstrap (`container-fluid`) para un diseño responsivo */}
      <div className="container-fluid">
        {/* Incluimos el componente del menú de navegación */}
        <Menu />
        {/* Incluimos el componente que gestiona las rutas de la aplicación */}
        <Rutas />
      </div>
    </Router>
  );
}

// Exportamos el componente `App` para que pueda ser usado en otros archivos, 
// como en el archivo `index.js` que inicia la aplicación.
export default App;

