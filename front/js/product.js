//Récupération de l'id via les paramètres de l'url 
const idProduct = new URL (window.location.href).searchParams.get("id");
console.log("j'ai récupérer l'id suivant: " + idProduct);

//récupération des données de l'API 
async function getProducts(){
    let getProducts = await fecht('http://localhost:3000/api/products');
    return products.json();
};