const API_URL = "http://localhost:3000";

// -------------------------------------
// Registrar una venta
// -------------------------------------
document.getElementById("ventaForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const venta = {
    fecha: document.getElementById("fecha").value,
    cantidad: Number(document.getElementById("cantidad").value),
    metodo_pago: document.getElementById("metodo_pago").value,
    total: Number(document.getElementById("total").value),
    clienteId: Number(document.getElementById("clienteId").value),
    productoId: Number(document.getElementById("productoId").value)
  };

  const res = await fetch(`${API_URL}/ventas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(venta)
  });

  const data = await res.json();
  alert("Venta registrada con éxito");
  console.log("Venta:", data);
});

// -------------------------------------
// Mostrar Dashboard
// -------------------------------------
document.getElementById("cargarDatos").addEventListener("click", async () => {

  // 1) Traer promedios
  const promRes = await fetch(`${API_URL}/estadisticas/promedios`);
  const promedios = await promRes.json();

  // Gráfico Promedio por día
  const labels = promedios.promediosPorDia.map(x => x.dia);
  const valores = promedios.promediosPorDia.map(x => x.promedio);

  new Chart(document.getElementById("chartPromediosDia"), {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Promedio diario",
        data: valores,
        borderColor: "blue"
      }]
    }
  });

  
  const desvRes = await fetch(`${API_URL}/estadisticas/desvio`);
  const desvio = await desvRes.json();

  document.getElementById("desvioTexto").innerText =
    `El desvío estándar del total vendido es: ${desvio.desvio.toFixed(2)}`;

  // 3) Correlación
  const corrRes = await fetch(`${API_URL}/estadisticas/correlacion`);
  const correlacion = await corrRes.json();

  document.getElementById("correlacionTexto").innerText =
    `Correlación Precio ↔ Cantidad: ${correlacion.correlacionPrecioCantidad.toFixed(3)}`;

});