// Récupération du panier depuis le stockage local
let cart = JSON.parse(localStorage.getItem("myCart")) || [];

// Déclarations des constantes en dehors de la fonction displayCart
const cartContainer = document.getElementById("cart__items");
const totalItemsContainer = document.getElementById("totalQuantity");
const totalPriceContainer = document.getElementById("totalPrice");

// Initialisation de totalAmount et totalItems en dehors de la fonction displayCart
let totalAmount = 0;
let totalItems = 0;

// Gestionnaire d'événement pour le clic sur le bouton de commande
document.getElementById('order').addEventListener('click', orderButtonClickHandler);

// Gestionnaire d'événement pour le changement de quantité
cartContainer.addEventListener("change", quantityChangeHandler);

// Gestionnaire d'événement pour le clic sur le bouton de suppression
cartContainer.addEventListener("click", deleteItemClickHandler);

// Appel de la fonction pour afficher le panier lors du chargement de la page
document.addEventListener("DOMContentLoaded", function () {
  displayCart(cart);
  updateTotalDisplay();

  // Ajout des gestionnaires d'événements pour chaque champ de saisie du formulaire
  const firstNameInput = document.querySelector("#firstName");
  const lastNameInput = document.querySelector("#lastName");
  const addressInput = document.querySelector("#address");
  const cityInput = document.querySelector("#city");
  const emailInput = document.querySelector("#email");

  // Fonction pour valider les champs du formulaire à chaque saisie
  function handleInputValidation(event, validationFunction) {
    const inputValue = event.target.value;
    if (validationFunction(inputValue)) {
      // Efface les messages d'erreur lorsqu'il est valide
      clearErrorMessages(event.target.id);
    }
  }

  // Ajout des gestionnaires d'événements pour chaque champ du formulaire
  firstNameInput.addEventListener("input", function (event) {
    handleInputValidation(event, validateFirstName);
  });

  lastNameInput.addEventListener("input", function (event) {
    handleInputValidation(event, validateLastName);
  });

  addressInput.addEventListener("input", function (event) {
    handleInputValidation(event, validateAddress);
  });

  cityInput.addEventListener("input", function (event) {
    handleInputValidation(event, validateCity);
  });

  emailInput.addEventListener("input", function (event) {
    handleInputValidation(event, validateEmail);
  });
});

// Fonction pour effacer les messages d'erreur d'un champ spécifique
function clearErrorMessages(fieldId) {
  const errorElement = document.getElementById(`${fieldId}ErrorMsg`);
  if (errorElement) {
    errorElement.textContent = '';
  }
}

// Fonction pour afficher les messages d'erreur
function displayErrorMessage(field, message) {
  const errorElement = document.getElementById(`${field}ErrorMsg`);
  if (errorElement) {
    errorElement.textContent = message;
  }
}

// Fonctions de validation du formulaire

// Fonction pour valider le prénom
function validateFirstName(firstName) {
  const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ-]+$/;
  const isValid = regex.test(firstName);

  if (isValid) {
    clearErrorMessages('firstName');
  } else {
    displayErrorMessage('firstName', 'Veuillez entrer un prénom valide.');
  }

  return isValid;
}

// Fonction pour valider le nom
function validateLastName(lastName) {
  const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ-]+$/;
  const isValid = regex.test(lastName);

  if (isValid) {
    clearErrorMessages('lastName');
  } else {
    displayErrorMessage('lastName', 'Veuillez entrer un nom valide.');
  }

  return isValid;
}

// Fonction pour valider l'adresse
function validateAddress(address) {
  const isValid = address.length >= 5;

  if (isValid) {
    clearErrorMessages('address');
  } else {
    displayErrorMessage('address', 'Veuillez entrer une adresse valide (au moins 5 caractères).');
  }

  return isValid;
}

// Fonction pour valider la ville (en prenant en compte les caractères accentués)
function validateCity(city) {
  const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ-\s]+$/;
  const isValid = regex.test(city);

  if (isValid) {
    clearErrorMessages('city');
  } else {
    displayErrorMessage('city', 'Veuillez entrer une ville valide.');
  }

  return isValid;
}

// Fonction pour valider l'adresse e-mail
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = regex.test(email);

  if (isValid) {
    clearErrorMessages('email');
  } else {
    displayErrorMessage('email', 'Veuillez entrer une adresse e-mail valide.');
  }

  return isValid;
}

// Fonction pour valider l'ensemble du formulaire
function validateForm(firstName, lastName, address, city, email) {
  clearErrorMessages();
  let isValid = true;

  // Vérifie chaque champ du formulaire
  if (!validateFirstName(firstName) || !validateLastName(lastName) || !validateAddress(address) || !validateCity(city) || !validateEmail(email)) {
    isValid = false;
  }

  return isValid;
}

// Fonction pour mettre à jour l'affichage du total
function updateTotalDisplay() {
  if (totalItemsContainer && totalPriceContainer) {
    totalItemsContainer.textContent = totalItems.toString();
    totalPriceContainer.textContent = ` ${totalAmount.toFixed(2)}`;
  }
}

// Fonction pour mettre à jour la quantité du produit
function updateProductQuantity(productId, newQuantity) {
  const product = cart.find((p) => p.ID === productId);

  if (product) {
    product.Quantity = newQuantity;
  }
}

// Fonction pour supprimer un produit du panier
function removeProduct(productId) {
  cart = cart.filter((product) => product.ID !== productId);
  saveCart(cart);
}

// Fonction pour sauvegarder le panier dans le stockage local
function saveCart(cart) {
  localStorage.setItem("myCart", JSON.stringify(cart));
}

// Fonction pour afficher le panier
function displayCart(myCart) {
  cartContainer.innerHTML = "";
  totalItems = 0;
  totalAmount = 0;

  const cartOrder = document.querySelector(".cart__order");

  if (myCart.length === 0) {
    // Affiche un message si le panier est vide
    const emptyCartMessage = document.createElement("p");
    emptyCartMessage.textContent = "Votre panier est vide.";
    cartContainer.appendChild(emptyCartMessage);
    cartOrder.style.display = "none";
  } else {
    // Boucle à travers les produits du panier et les affiche
    for (const product of myCart) {
      const cartItem = document.createElement("article");
      cartItem.classList.add("cart__item");
      cartItem.setAttribute("data-id", product.ID);

      // Met à jour le totalItems et totalAmount
      totalItems += product.Quantity;
      totalAmount += product.price * product.Quantity;

      // Crée la structure HTML pour chaque produit du panier
      cartItem.innerHTML = `
        <div class="cart__item__img">
          <img src="${product.imageUrl}" alt="Photographie d'un produit">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${product.name}</h2>
            <p>Prix unitaire: ${product.price.toFixed(2)}€</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="quantity-input" data-product-id="${product.ID}" value="${product.Quantity}" min="1">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      `;

      // Ajoute le produit au panier
      cartContainer.appendChild(cartItem);
    }
  }

  // Met à jour l'affichage total
  updateTotalDisplay();
}

// Gestionnaire d'événement pour le clic sur le bouton de commande
function orderButtonClickHandler(event) {
  event.preventDefault();

  // Récupération des données du formulaire
  const firstName = document.querySelector("#firstName").value;
  const lastName = document.querySelector("#lastName").value;
  const address = document.querySelector("#address").value;
  const city = document.querySelector("#city").value;
  const email = document.querySelector("#email").value;

  // Validation du formulaire
  if (validateForm(firstName, lastName, address, city, email)) {
    // Création d'un tableau contenant les ID des produits du panier
    const productIds = cart.map(product => product.ID);

    // Préparation des données à envoyer dans la requête
    const requestData = {
      contact: {
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        email: email
      },
      products: productIds
    };

    // Configuration des options pour la requête fetch
    const options = {
      method: 'POST', // ou 'PUT' si votre API requiert une méthode HTTP différente
      headers: {
        'Content-Type': 'application/json'
        // Ajoutez d'autres en-têtes si votre API les requiert
      },
      body: JSON.stringify(requestData)
    };

    // Appel de l'API
    fetch("http://localhost:3000/api/products/order", options)
      .then(response => response.json())
      .then(data => {
        // Redirection vers la page de confirmation avec l'orderId dans l'URL
        document.location.href = `confirmation.html?orderId=${data.orderId}`;
      })
      .catch(err => {
        console.log("Erreur Fetch product.js", err);
        alert("Un problème a été rencontré lors de l'envoi du formulaire.");
      });

    // Affichage de l'alerte de commande réussie
    alert("Commande validée !");
  } else ;

}

// Gestionnaire d'événement pour le changement de quantité
function quantityChangeHandler(event) {
  if (event.target.classList.contains("quantity-input")) {
    const productId = event.target.getAttribute("data-product-id");
    const newQuantity = parseInt(event.target.value);
    updateProductQuantity(productId, newQuantity);
    saveCart(cart);
    displayCart(cart);
    updateTotalDisplay();
  }
}

// Gestionnaire d'événement pour le clic sur le bouton de suppression
function deleteItemClickHandler(event) {
  if (event.target.classList.contains("deleteItem")) {
    const productId = event.target.closest(".cart__item").getAttribute("data-id");
    removeProduct(productId);
    displayCart(cart);
    updateTotalDisplay();
  }
}
//fin de ma page panier
