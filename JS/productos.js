async function productos() {
  const root = document.getElementById("root");
  root.innerHTML = "<h2>Lista de Productos</h2>";

 
  if (productos.length === 0) {
    productos = await Conexion("All");
  }

  
  const contenedorLista = document.createElement("section");
  contenedorLista.classList.add("c-lista");
  contenedorLista.id = "la-lista";


  const listaHTML = GenerarLista(productos);
  contenedorLista.innerHTML = listaHTML;


  root.appendChild(contenedorLista);
}
