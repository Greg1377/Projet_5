// affichage des produits du Panier
//let showItem = JSON.parse(localStorage.getItem("myCart"));

function getCart() {
    let cart = JSON.parse(localStorage.getItem("myCart"));
    for (let i in cart) {
        document.querySelector("#cart__items").innerHTML += showCart(cart[i]);
    }
}

function showCart(product) {
    return `<article class="cart__item" data-id="${product.ID}" data-color="${product.Color}">
                <div class="cart__item__img">
                  <img src="${product.imageUrl}" alt="${product.altText}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${product.Name} </h2>
                    <p>${product.Color}</p>
                    <p>${product.Price} € </p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.Qunatity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`
}
getCart();

//permet recuperer le panier de l'ajouter et d'enregistrer le nouveau panier
function changeQuantity(product, quantity) {
    let cart = getCart();
    let foundProduct = cart.find(p => p.id == product.id);
    if (foundProduct != undefined) {
        foundProduct.quantity += quantity;
        if (foundProduct.quantity <= 0) {
            removeFromCart(foundProduct);
        } else {
            saveCart(cart);
        }
    }
}
