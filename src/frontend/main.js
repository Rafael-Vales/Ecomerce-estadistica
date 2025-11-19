const API_URL = "http://localhost:3000";

let chartPromedios = null; // para destruir gráficos previos

function formatNumber(num) {
  return num.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// ---------------- REGISTRAR VENTA ----------------
document.getElementById("ventaForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const venta = {
    fecha: document.getElementById("fecha").value,
    cantidad: Number(document.getElementById("cantidad").value),
    metodo_pago: document.getElementById("metodo_pago").value,
    total: Number(document.getElementById("total").value), // AHORA EXISTE EN HTML
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

  loadDashboard();
});

// ---------------- DASHBOARD ----------------
async function loadDashboard() {

  // 1) Promedios
  const promRes = await fetch(`${API_URL}/estadisticas/promedios`);
  const promedios = await promRes.json();

  if (!promedios.promediosPorDia) return;

  const labels = promedios.promediosPorDia.map(x => String(x.dia));
  const valores = promedios.promediosPorDia.map(x => x.promedio);

  // Destruir gráfico anterior
  if (chartPromedios) chartPromedios.destroy();

  chartPromedios = new Chart(document.getElementById("chartPromediosDia"), {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Promedio diario",
          data: valores,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 2,
          borderRadius: 8,
        }
      ]
    },
    options: { responsive: true }
  });

  // 2) Desvío
  const desvRes = await fetch(`${API_URL}/estadisticas/desvio`);
  const desvio = await desvRes.json();
  document.getElementById("desvioTexto").innerText =
    `El desvío estándar del total vendido es: ${formatNumber(desvio.desvio)}`;

  // 3) Correlación
  const corrRes = await fetch(`${API_URL}/estadisticas/correlacion`);
  const correlacion = await corrRes.json();
  document.getElementById("correlacionTexto").innerText =
    `Correlación Precio ↔ Cantidad: ${formatNumber(correlacion.correlacionPrecioCantidad)}`;
}

window.addEventListener("DOMContentLoaded", loadDashboard);

// ---------------- REGISTRAR CLIENTE ----------------
document.getElementById("clienteForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const cliente = {
    nombre: document.getElementById("clienteNombre").value,
    apellido: document.getElementById("clienteApellido").value,
    email: document.getElementById("clienteEmail").value,
    ciudad: document.getElementById("clienteCiudad").value,
    edad: Number(document.getElementById("clienteEdad").value),
  };

  const res = await fetch(`${API_URL}/clientes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente),
  });

  alert("Cliente registrado con éxito");
});

// ---------------- REGISTRAR PRODUCTO ----------------
document.getElementById("productoForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const producto = {
    nombre: document.getElementById("productoNombre").value,
    categoria: document.getElementById("productoCategoria").value,
    precio_unitario: Number(document.getElementById("productoPrecio").value),
    stock: Number(document.getElementById("productoStock").value),
  };

  const res = await fetch(`${API_URL}/productos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto)
  });

  alert("Producto registrado con éxito");
});