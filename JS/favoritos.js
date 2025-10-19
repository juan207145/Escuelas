function favoritos(){
  appData.favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  if(appData.favoritos.length == 0){
    document.getElementById("root").innerHTML = "No hay favoritos.";
  } else {
    let lista = "";
    for(let i = 0; i < appData.favoritos.length; i++){
      const f = appData.favoritos[i];
      lista += `
        <div class="c-lista-producto" onclick="Detalle(${f.id})">
          <img src="${f.image}" width="100" height="100">
          <p>${f.name}</p>
          <p>Precio: $${f.price}</p>
        </div>`;
    }
    document.getElementById("root").innerHTML = lista;
  }
}

