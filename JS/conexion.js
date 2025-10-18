let productos = [];
let totalProductos = 200; 

async function Conexion(tipo) {
  if (tipo === "All") {
    const res = await fetch("https://api.escuelajs.co/api/v1/products");
    const data = await res.json();
    return data;
  } else if (tipo === "Categorias") {
    const res = await fetch("https://api.escuelajs.co/api/v1/categories");
    const data = await res.json();
    return data;
  }
}

async function General() {
  if (productos.length === 0) {
    productos = await Conexion("All");
  }
  home(); 
}

async function ConexionCategorias() {
  const res = await fetch(`https://api.escuelajs.co/api/v1/categories`);
  const data = await res.json();
  return data;
}


async function FiltroConexion(categoriaElegida) {
  const productosFiltrados = await Conexion(categoriaElegida);
  document.getElementById("la-lista").innerHTML = "";
  const listaFiltro = GenerarLista(productosFiltrados);
  document.getElementById("la-lista").innerHTML = listaFiltro;
}
