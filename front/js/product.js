// Récupération de l'id via les paramètres de l'url
var itemUrl = window.location.href;
var url = new URL(itemUrl);
let idItem = url.searchParams.get("id");

console.log("J'ai récupéré l'id suivant : " + idItem);

function getItem() {
    // Récupération des données de l'API (création Product)
    fetch("http://localhost:3000/api/products/" + idItem)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            showItem(data);
            getProductForCart(data);
        });
}

// Permet d'afficher les caractéristiques du produit
function showItem(article) {
    // Affichage de l'image
    let imgItem = document.createElement("img");
    document.querySelector(".item__img").appendChild(imgItem);
    imgItem.src = article.imageUrl;
    imgItem.alt = article.altTxt;
    imgItem.width = "300";


    // Affichage du nom du produit / du prix / de la description
    document.querySelector("#title").innerHTML = article.name;
    document.querySelector("#price").innerHTML = article.price;
    document.querySelector("#description").innerHTML = article.description;

    // Affichage des couleurs disponibles
    for (let color of article.colors) {
        let colorOfItem = document.createElement("option");
        document.querySelector("#colors").appendChild(colorOfItem);
        colorOfItem.value = color;
        colorOfItem.innerHTML = color;
    }
}

getItem();

// Fonction pour obtenir la valeur de quantité du formulaire dans le balisage
function qtyValue() {
    let qty = document.getElementById("quantity");
    return qty.value;
}

// Fonction pour récupérer la valeur de la couleur du canapé dans le balisage
function colorValue() {
    let color = document.getElementById("colors");
    return color.value;
}

// Sauvegarde le panier dans le localStorage et sérialise la variable
function saveCart(cart) {
    localStorage.setItem("myCart", JSON.stringify(cart));
}

// Fonction pour ajouter le produit au panier au clic sur le bouton
function getProductForCart(product) {
    const addBtn = document.querySelector("#addToCart");
    const colorChoice = document.querySelector("#colors");
    const productQuantity = document.querySelector("#quantity");

    addBtn.addEventListener("click", function () {
        // Création de l'objet myProduct avec les propriétés nécessaires
        const myProduct = {
            ID: product._id,
            name: product.name,
             price: product.price,
            Quantity: parseInt(productQuantity.value),
            Color: colorChoice.value,
            imageUrl:product.imageUrl
        };


        // Contrôle de la quantité et de la couleur sélectionnées
        if (myProduct.Quantity !== 0 && myProduct.Color !== "") {
            let cartSaved = JSON.parse(localStorage.getItem("myCart")) || [];

            // Contrôle de l'existence du produit dans le panier (même ID et même couleur)
            const productControl = cartSaved.find(sofa => sofa.ID == myProduct.ID && sofa.Color == myProduct.Color);

            if (productControl) {
                let finalQuantity = myProduct.Quantity + productControl.Quantity;
                productControl.Quantity = finalQuantity;
            } else {
                cartSaved.push(myProduct);
            }

            // Sauvegarde du panier dans le localStorage
            saveCart(cartSaved);

            alert("Le produit a été ajouté au panier");
        } else {
            // Si la quantité ou la couleur n'est pas sélectionnée, afficher un message d'erreur ou prendre une autre action.
            alert("Veuillez sélectionner une quantité et une couleur");
        }
    });
}
