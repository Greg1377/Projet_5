//Récupération de l'id via les paramètres de l'url
var itemUrl = window.location.href;
var url = new URL(itemUrl);
let idItem = url.searchParams.get("id");

console.log("j'ai récupérer l'id suivant: " + itemUrl);

function getItem() {

    //récupération des données de l'API (création Product)
    fetch("http://localhost:3000/api/products/" + idItem)
        .then(function(response) {
            return response.json();
        })


    .then(function(data) {
        showItem(data);
        getProductForCart(data);
    })
};

// Permet d'afficher les caracteristiques du produit
function showItem(article) {

    //affichage de l'image
    let imgItem = document.createElement("img");
    document.querySelector(".item__img").appendChild(imgItem);
    imgItem.src = article.imageUrl;
    imgItem.alt = article.altTxt;

    //affichage du nom du produit /du prix / de la description
    document.querySelector("#title").innerHTML = article.name;
    document.querySelector("#price").innerHTML = article.price;
    document.querySelector("#description").innerHTML = article.description;

    // affichage des couleurs disponibles

    for (let color of article.colors) {
        let colorOfItem = document.createElement("option");
        document.querySelector("#colors").appendChild(colorOfItem),
            colorOfItem.value = color;
        colorOfItem.innerHTML = color;
    }
};

getItem();

// obtenir des valeurs HTML ) à partir de HTML
//fonction qui obtient la valeur de quantité du formulaire dans le balisage
function qtyValue() {
    let qty = document.getElementById("quantity");
    return qty.value;
}
//fonction qui récupere la valeur de la couleur Kanap dans le balisage
function corlorValue() {
    let color = document.getElementById("colors");
    return color.value;
}
// Sauvegarde le panier dans le localStorage et sérialise la variable
function saveCart(cart) {
    localStorage.setItem("myCart", JSON.stringify(cart));
}

//fonction pour activer les infos du canapé au clic sur le bouton

function getProductForCart(product) {

    const addBtn = document.querySelector("#addToCart");
    const colorChoice = document.querySelector("#colors");
    const productQuantity = document.querySelector("#quantity");

    addBtn.addEventListener("click", function() {
        const myProduct = {

        };
        // Permet de controler qu'une quantité et une couleur sont bien sélectionnées
        if (productQuantity.value !== 0 && colorChoice.value !== "") {

            let cartSaved = JSON.parse(localStorage.getItem("myCart"));
            if (cartSaved) {

                // Permet de controler l'existence du produit dans le panier (même ID et même couleur)
                const productControl = cartSaved.find(sofa => sofa.ID == product._id && sofa.Color == colorChoice.value)
                if (productControl) {
                    let finalQauntity = myProduct.Quantity + productControl.Quantity;
                    productControl.Quantity = finalQauntity;
                    saveCart(cartSaved)
                } else {
                    cartSaved.push(myProduct);
                    saveCart(cartSaved);
                }
            } else {
                cartSaved = [];
                cartSaved.push(myProduct);
                saveCart(cartSaved);
            }
            alert("le produit a été ajouté au panier")
        }
    })
}
