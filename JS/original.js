function filtrarPorPrecio() {
  const root = document.getElementById("root");
  root.innerHTML = "<h2>Filtrar Productos por Precio</h2>";

  // Input para establecer el precio máximo
  const input = document.createElement("input");
  input.type = "number";
  input.placeholder = "Ingrese precio máximo";
  input.classList.add("c-buscador");

  // Botón para aplicar el filtro
  const boton = document.createElement("button");
  boton.textContent = "Aplicar filtro";

  // Contenedor para los resultados
  const contenedor = document.createElement("section");
  contenedor.classList.add("c-lista");
  contenedor.id = "lista-precio";

  // Al presionar el botón, filtramos
  boton.addEventListener("click", () => {
    const precioMax = parseFloat(input.value);
    if (isNaN(precioMax)) {
      alert("Por favor ingrese un número válido.");
      return;
    }

    appData.filtroPrecio = precioMax; // guardamos el valor en el objeto compartido

    const filtrados = appData.productos.filter(p => p.price <= precioMax);
    contenedor.innerHTML = GenerarLista(filtrados);

    if (filtrados.length === 0) {
      contenedor.innerHTML = "<p>No hay productos dentro de ese rango de precio.</p>";
    }
  });

  root.appendChild(input);
  root.appendChild(boton);
  root.appendChild(contenedor);
}
