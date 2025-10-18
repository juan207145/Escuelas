var esFavorito = false;


function toggleFavorito(paramid, paramname, paramimagen, paramprecio) {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  let existe = false;

 
  for (let i = 0; i < favoritos.length; i++) {
    if (favoritos[i].id === paramid) {
      existe = true;
      break;
    }
  }

  if (existe) {
    favoritos = favoritos.filter(prod => prod.id !== paramid);
    esFavorito = false;
  } else {
    // Agregar a favoritos
    favoritos.push({
      id: paramid,
      name: paramname,
      image: paramimagen,
      price: paramprecio
    });
    esFavorito = true;
  }


  localStorage.setItem("favoritos", JSON.stringify(favoritos));


  const boton = document.querySelector(`#corazon-${paramid}`);
  if (boton) boton.textContent = esFavorito ? "❤️" : "🤍";
}


async function Detalle(parametro) {
  const root = document.getElementById("root");
  root.innerHTML = "";

  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${parametro}`);
  const data = await res.json();


  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  esFavorito = favoritos.some(prod => prod.id === data.id);


  const imagen = data.images && data.images.length > 0 ? data.images[0] : "https://via.placeholder.com/150";

  
  const detalle = `
    <section class="c-detalle">
      <img src="${imagen}" alt="${data.title}" height="200" width="auto">
      <h3>${data.title}</h3>
      <p><strong>ID:</strong> ${data.id}</p>
      <p><strong> Precio:</strong> ${data.price}</p>
      <p><strong> Categoría:</strong> ${data.category?.name || "Sin categoría"}</p>
      <p><strong> Descripción:</strong> ${data.description}</p>

      <button onClick="toggleFavorito(${data.id}, '${data.title}', '${imagen}', ${data.price})">
        <span id="corazon-${data.id}">${esFavorito ? '❤️' : '🤍'}</span> Favorito
      </button>
    </section>
  `;

  root.innerHTML = detalle;
}


function favoritos() {
  const root = document.getElementById("root");
  root.innerHTML = "<h2>❤️ Mis Favoritos</h2>";

  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  if (favoritos.length === 0) {
    root.innerHTML += "<p>No tienes productos favoritos aún.</p>";
    return;
  }

  const contenedor = document.createElement("section");
  contenedor.classList.add("c-lista");

  favoritos.forEach((prod) => {
    contenedor.innerHTML += `
      <div class="c-lista-producto" onclick="Detalle(${prod.id})">
        <img src="${prod.image}" alt="${prod.name}" width="100" height="100">
        <p><strong>${prod.name}</strong></p>
        <p>💲${prod.price}</p>
      </div>
    `;
  });

  root.appendChild(contenedor);
}
