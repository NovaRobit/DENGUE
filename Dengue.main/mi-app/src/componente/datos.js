<!-- Bootstrap CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

<div class="container my-4">
  <h3 class="mb-4">Exploración Entomológica - Formato EA-1</h3>
  <table id="tabla-entomologica" class="table table-bordered table-striped table-sm align-middle text-center">
    <thead class="table-dark">
      <tr>
        <th rowspan="2">#</th>
        <th rowspan="2">Calle</th>
        <th rowspan="2">Hab.</th>
        <th rowspan="2">Manzana</th>
        <th rowspan="2">Sector</th>
        <th colspan="13">Recipientes (E/A/L/P)</th>
        <th rowspan="2">Positivos Totales</th>
      </tr>
      <tr>
        <th>Pilas S.</th>
        <th>Bebederos</th>
        <th>Tanques</th>
        <th>Llantas</th>
        <th>Lote Baldío</th>
        <th>Pozos</th>
        <th>Macetas G.</th>
        <th>Chicos</th>
        <th>Tinacos</th>
        <th>Cubetas</th>
        <th>Cisternas</th>
        <th>Floreros</th>
        <th>Baños</th>
      </tr>
    </thead>
    <tbody>
      <!-- Fila vacía, se puede duplicar dinámicamente -->
      <tr>
        <td id="row-1-numero"></td>
        <td id="row-1-calle"></td>
        <td id="row-1-habitantes"></td>
        <td id="row-1-manzana"></td>
        <td id="row-1-sector"></td>
        <td id="row-1-pilas"></td>
        <td id="row-1-bebederos"></td>
        <td id="row-1-tanques"></td>
        <td id="row-1-llantas"></td>
        <td id="row-1-lotebaldio"></td>
        <td id="row-1-pozos"></td>
        <td id="row-1-macetas"></td>
        <td id="row-1-chicos"></td>
        <td id="row-1-tinacos"></td>
        <td id="row-1-cubetas"></td>
        <td id="row-1-cisternas"></td>
        <td id="row-1-floreros"></td>
        <td id="row-1-banos"></td>
        <td id="row-1-positivos"></td>
      </tr>
    </tbody>
  </table>
</div>

<!-- Axios + JS para poblar los datos -->
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>
  axios.get('https://tu-api.com/entomologia') // reemplaza con tu endpoint real
    .then(response => {
      const data = response.data[0]; // ejemplo para primera casa
      document.getElementById('row-1-numero').innerText = data.numero;
      document.getElementById('row-1-calle').innerText = data.calle;
      document.getElementById('row-1-habitantes').innerText = data.habitantes;
      document.getElementById('row-1-manzana').innerText = data.manzana;
      document.getElementById('row-1-sector').innerText = data.sector;

      document.getElementById('row-1-pilas').innerText = data.pilas;
      document.getElementById('row-1-bebederos').innerText = data.bebederos;
      document.getElementById('row-1-tanques').innerText = data.tanques;
      document.getElementById('row-1-llantas').innerText = data.llantas;
      document.getElementById('row-1-lotebaldio').innerText = data.lote_baldio;
      document.getElementById('row-1-pozos').innerText = data.pozos;
      document.getElementById('row-1-macetas').innerText = data.macetas;
      document.getElementById('row-1-chicos').innerText = data.chicos;
      document.getElementById('row-1-tinacos').innerText = data.tinacos;
      document.getElementById('row-1-cubetas').innerText = data.cubetas;
      document.getElementById('row-1-cisternas').innerText = data.cisternas;
      document.getElementById('row-1-floreros').innerText = data.floreros;
      document.getElementById('row-1-banos').innerText = data.banos;

      document.getElementById('row-1-positivos').innerText = data.positivos_totales;
    })
    .catch(error => {
      console.error('Error cargando los datos:', error);
    });
</script>