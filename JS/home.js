function GenerarLista(arrayProductos) {
  let listaHTML = "";
  for (let i = 0; i < arrayProductos.length; i++) {
    const p = arrayProductos[i];
    listaHTML += `
      <div class="c-lista-producto" onclick="Detalle(${p.id})">
        <img src="${p.images[0]}" alt="${p.title}" width="100" height="100">
        <p><strong>${p.title}</strong></p>
        <p>Precio:${p.price}</p>
      </div>
    `;
  }
  return listaHTML;
}

function buscadorfuncion(texto) {
    if (texto.length >= 3) {
        const filtrados = [];
        for (let i = 0; i < productos.length; i++) {
        const nombre = productos[i].title.toLowerCase();
        if (nombre.includes(texto.toLowerCase())) {
            filtrados.push(productos[i]);
        }
        }
        const listaProductos = GenerarLista(filtrados);
        document.getElementById("la-lista").innerHTML = listaProductos;
    } else if (texto.length === 0) {
  
        const listaProductos = GenerarLista(productos);
        document.getElementById("la-lista").innerHTML = listaProductos;
    }
}


function home() {
  const root = document.getElementById("root");
  root.innerHTML = "";


  const buscador = document.createElement("input");
  buscador.classList.add("c-buscador");
  buscador.type = "text";
  buscador.placeholder = "Buscar producto...";
  buscador.addEventListener("input", () => {
    buscadorfuncion(buscador.value);
  });


  const filtro = document.createElement("div");

    ConexionCategorias().then((categorias) => {
    for (let i = 0; i < categorias.length; i++) {
        if (categorias[i].name === "Test FROM VB.net") continue; 
        const btn = document.createElement("button");
        btn.textContent = categorias[i].name;
        const idCategoria = categorias[i].id;

        btn.addEventListener("click", () => {
        FiltroConexion(idCategoria);
        });

        filtro.appendChild(btn);
    }
    });



  
  const listaProductos = GenerarLista(productos);
  const contenedorLista = document.createElement("section");
  contenedorLista.classList.add("c-lista");
  contenedorLista.id = "la-lista";
  contenedorLista.innerHTML = listaProductos;


  root.appendChild(buscador);
  root.appendChild(filtro);
  root.appendChild(contenedorLista);
}
