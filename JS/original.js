async function filtrarPorPrecio() {
  const root = document.getElementById("root");
  root.innerHTML = "<h2>Filtrar productos por precio</h2>";

  // Si los productos no están cargados, los trae de la API
  if (productos.length === 0) {
    productos = await Conexion("All");
  }


  const inputMin = document.createElement("input");
  inputMin.type = "number";
  inputMin.placeholder = "Precio mínimo";
  inputMin.id = "precio-min";

  const inputMax = document.createElement("input");
  inputMax.type = "number";
  inputMax.placeholder = "Precio máximo";
  inputMax.id = "precio-max";

  // Botón para aplicar el filtro
  const btnFiltrar = document.createElement("button");
  btnFiltrar.textContent = "Aplicar filtro";

  btnFiltrar.addEventListener("click", () => {
    const min = parseFloat(inputMin.value) || 0;
    const max = parseFloat(inputMax.value) || Infinity;

    const filtrados = productos.filter(p => p.price >= min && p.price <= max);

    if (filtrados.length === 0) {
      root.innerHTML += "<p>No se encontraron productos en ese rango de precios.</p>";
      return;
    }

    const listaHTML = GenerarLista(filtrados);
    document.getElementById("la-lista")?.remove(); // eliminar lista previa si existe

    const contenedorLista = document.createElement("section");
    contenedorLista.classList.add("c-lista");
    contenedorLista.id = "la-lista";
    contenedorLista.innerHTML = listaHTML;
    root.appendChild(contenedorLista);
  });

  // Agregar los elementos al DOM
  root.appendChild(inputMin);
  root.appendChild(inputMax);
  root.appendChild(btnFiltrar);
}
