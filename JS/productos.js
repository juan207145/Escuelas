async function mostrarProductos() {
  const root = document.getElementById("root");
  root.innerHTML = "<h2>Lista de Productos</h2>";

  if (productos.length === 0) {
    productos = await Conexion("All");
  }

  // Generar la lista con descripción, imagen y precio
  let listaHTML = "";
  for (let i = 0; i < productos.length; i++) {
    const p = productos[i];
    const imagen = p.images && p.images.length > 0 ? p.images[0] : "https://via.placeholder.com/150";
    listaHTML += `
      <div class="c-lista-producto" onclick="Detalle(${p.id})">
        <img src="${imagen}" alt="${p.title}" width="150" height="150">
        <h3>${p.title}</h3>
        <p><strong>Precio:</strong> $${p.price}</p>
        <p><strong>Descripción:</strong> ${p.description || "Sin descripción disponible."}</p>
      </div>
    `;
  }

  // Mostrar la lista dentro de un contenedor
  const contenedorLista = document.createElement("section");
  contenedorLista.classList.add("c-lista");
  contenedorLista.id = "la-lista";
  contenedorLista.innerHTML = listaHTML;

  root.appendChild(contenedorLista);
}
