// Imagen de respaldo si la API devuelve una vacía o rota
const IMAGEN_PRED = "https://via.placeholder.com/100x100?text=No+Image";

// Función que genera la lista de productos
function GenerarLista(arrayProductos) {
  let listaHTML = "";

  if (!arrayProductos || arrayProductos.length === 0) {
    return "<p>No hay productos para mostrar.</p>";
  }

  for (let i = 0; i < arrayProductos.length; i++) {
    const p = arrayProductos[i];

    // Verificar que tenga al menos una imagen válida
    let imgSrc = IMAGEN_PRED;
    if (p.images && p.images.length > 0) {
      const imagenValida = p.images.find(img => img && img.startsWith("http"));
      if (imagenValida) imgSrc = imagenValida;
    }

    listaHTML += `
      <div class="c-lista-producto" onclick="Detalle(${p.id})">
        <img src="${imgSrc}" alt="${p.title}" width="100" height="100" onerror="this.src='${IMAGEN_PRED}'">
        <p><strong>${p.title}</strong></p>
        <p>Precio: ${p.price}</p>
      </div>
    `;
  }

  return listaHTML;
}

// Función del buscador
function buscadorfuncion(texto) {
  if (!appData?.productos) return;

  if (texto.length >= 3) {
    const filtrados = appData.productos.filter(p =>
      p.title.toLowerCase().includes(texto.toLowerCase())
    );
    document.getElementById("la-lista").innerHTML = GenerarLista(filtrados);
  } else if (texto.length === 0) {
    document.getElementById("la-lista").innerHTML = GenerarLista(appData.productos);
  }
}

// Función principal
async function home() {
  const root = document.getElementById("root");
  root.innerHTML = "";

  // Crear buscador
  const buscador = document.createElement("input");
  buscador.classList.add("c-buscador");
  buscador.type = "text";
  buscador.placeholder = "Buscar producto...";
  buscador.addEventListener("input", () => buscadorfuncion(buscador.value));

  // Crear contenedor de filtros
  const filtro = document.createElement("div");

  // Cargar categorías desde la API
  ConexionCategorias().then((categorias) => {
    for (let i = 0; i < categorias.length; i++) {
      const nombre = categorias[i].name?.trim();

      if (
        !nombre ||
        nombre.toLowerCase().includes("test") ||
        nombre.toLowerCase() === "string" ||
        nombre.toLowerCase().includes("category")
      ) {
        continue;
      }

      const btn = document.createElement("button");
      btn.textContent = nombre;
      const idCategoria = categorias[i].id;

      btn.addEventListener("click", () => {
        FiltroConexion(idCategoria);
      });

      filtro.appendChild(btn);
    }
  });

  // Crear contenedor de lista
  const contenedorLista = document.createElement("section");
  contenedorLista.classList.add("c-lista");
  contenedorLista.id = "la-lista";

  //  Asegurarse de cargar los productos antes de mostrarlos
  if (!appData?.productos) {
    appData = appData || {};
    try {
      const respuesta = await fetch("https://api.escuelajs.co/api/v1/products");
      appData.productos = await respuesta.json();
    } catch (error) {
      console.error("Error al cargar productos:", error);
      contenedorLista.innerHTML = "<p>Error al cargar los productos.</p>";
    }
  }

  // Generar y mostrar lista de productos
  contenedorLista.innerHTML = GenerarLista(appData.productos);

  // Insertar todo en la raíz
  root.appendChild(buscador);
  root.appendChild(filtro);
  root.appendChild(contenedorLista);
}
