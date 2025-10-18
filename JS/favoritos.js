function favoritos(){
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    if(favoritos.length == 0){
        document.getElementById("root").innerHTML = "no hay favoritos";
    }else{
        let lista = "";
        for(let i = 0; i < favoritos.length; i++){
            lista += `
            <div class="c-lista-producto" onclick="Detalle(${favoritos[i].id})">
                <img src="${favoritos[i].image}" width="100" height="100">
                <p>${favoritos[i].name}</p>
                <p>${favoritos[i].price}</p>
            </div>`;
        }
        document.getElementById("root").innerHTML = lista;
    }
}
