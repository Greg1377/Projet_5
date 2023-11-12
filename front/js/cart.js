// Récupération du panier depuis le localStorage
const cart = JSON.parse(localStorage.getItem("myCart")) || [];

// Affichage du panier sur la page
function displayCart() {
  // Récupération du conteneur du panier dans le HTML
  const cartContainer = document.getElementById("cart__items");

  // Vider le contenu du conteneur du panier
  cartContainer.innerHTML = "";

  // Boucle à travers chaque produit dans le panier
  for (const product of cart) {
    // Création d'un élément div pour chaque produit dans le panier
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    // Affichage des informations du produit dans l'élément div
    cartItem.innerHTML = `
      <div class="cart-item__info">
        <h3>${product.name}</h3>
        <p>Couleur: ${product.color}</p>
        <p>Quantité: ${product.quantity}</p>
      </div>
      <div class="cart-item__price">
        <p>${product.price}€</p>
      </div>
    `;

    // Ajout de l'élément div représentant le produit au conteneur du panier
    cartContainer.appendChild(cartItem);
  }

  // Affichage du total du panier
  const total = calculateTotal(cart);
  const totalContainer = document.getElementById("cartTotal");
  totalContainer.innerHTML = `<p>Total: ${total}€</p>`;
}

// Fonction pour calculer le total du panier (à adapter selon votre structure de données)
function calculateTotal(cart) {
  let total = 0;
  for (const product of cart) {
    total += product.price * product.quantity;
  }
  return total;
}

// Appel de la fonction pour afficher le panier lors du chargement de la page
displayCart();

