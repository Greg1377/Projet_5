// Récupération du panier depuis le localStorage
let cart = JSON.parse(localStorage.getItem("myCart")) || [];

// Déclaration de cartContainer en dehors de la fonction displayCart
const cartContainer = document.getElementById("cart__items");
const totalItemsContainer = document.getElementById("totalQuantity");
const totalPriceContainer = document.getElementById("totalPrice");

// Initialisation de totalAmount et totalItems en dehors de la fonction displayCart
let totalAmount = 0;
let totalItems = 0;

// Fonction pour valider le prénom
function validateFirstName(firstName) {
    const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ-]+$/;
    return regex.test(firstName);
}

// Fonction pour valider le nom
function validateLastName(lastName) {
    const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ-]+$/;
    return regex.test(lastName);
}

// Fonction pour valider l'adresse
function validateAddress(address) {
    return address.length >= 5;
}

// Fonction pour valider la ville (en prenant en compte les caractères accentués)
function validateCity(city) {
    const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ-\s]+$/;
    return regex.test(city);
}

// Fonction pour valider l'adresse e-mail
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Fonction pour afficher un message d'erreur
function displayErrorMessage(field, message) {
    let errorMsgElement = document.getElementById(`${field}ErrorMsg`);

    if (!errorMsgElement) {
        errorMsgElement = document.createElement('p');
        errorMsgElement.id = `${field}ErrorMsg`;
        document.querySelector(`[name="${field}"]`).parentNode.appendChild(errorMsgElement);
    }

    errorMsgElement.textContent = message;
}

// Fonction pour effacer les messages d'erreur
function clearErrorMessages() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach((errorMsg) => {
        errorMsg.textContent = '';
    });
}

// Fonction pour valider le formulaire
function validateForm(firstName, lastName, address, city, email) {
    clearErrorMessages();
    let isValid = true;

    if (!validateFirstName(firstName)) {
        displayErrorMessage('firstName', 'Le prénom doit contenir uniquement des lettres.');
        isValid = false;
    }

    if (!validateLastName(lastName)) {
        displayErrorMessage('lastName', 'Le nom doit contenir uniquement des lettres.');
        isValid = false;
    }

    if (!validateAddress(address)) {
        displayErrorMessage('address', 'L\'adresse doit contenir au moins 5 caractères.');
        isValid = false;
    }

    if (!validateCity(city)) {
        displayErrorMessage('city', 'La ville doit contenir uniquement des lettres.');
        isValid = false;
    }

    if (!validateEmail(email)) {
        displayErrorMessage('email', 'L\'adresse e-mail n\'est pas valide.');
        isValid = false;
    }

    return isValid;
}

// Fonction pour mettre à jour l'affichage du total
function updateTotalDisplay() {
    if (totalItemsContainer && totalPriceContainer) {
        totalItemsContainer.textContent = totalItems.toString();
        totalPriceContainer.textContent = ` ${totalAmount.toFixed(2)}€`;
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

// Fonction pour sauvegarder le panier dans le localStorage et sérialiser la variable
function saveCart(cart) {
    localStorage.setItem("myCart", JSON.stringify(cart));
}

// Fonction pour afficher le panier
function displayCart(myCart) {
    cartContainer.innerHTML = "";
    totalItems = 0;
    totalAmount = 0;

    for (const product of myCart) {
        const cartItem = document.createElement("article");
        cartItem.classList.add("cart__item");
        cartItem.setAttribute("data-id", product.ID);

        totalItems += product.Quantity;
        totalAmount += product.price * product.Quantity;

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

        cartContainer.appendChild(cartItem);
    }

    updateTotalDisplay();
}

// Gestionnaire d'événement pour le clic sur le bouton de commande
function orderButtonClickHandler(event) {
    event.preventDefault();
    console.log("Clic sur le bouton de commande.");

    const firstNameElement = document.getElementById('firstName');

    if (firstNameElement) {
        console.log("Élément avec l'ID 'firstName' trouvé.");
    } else {
        console.log("Élément avec l'ID 'firstName' non trouvé.");
    }

    const firstName = firstNameElement.value;
    const lastName = document.getElementById('lastName').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const email = document.getElementById('email').value;

    if (validateForm(firstName, lastName, address, city, email)) {
        console.log('Formulaire valide. Envoyer les données à l\'API.');
    } else {
        console.log('Formulaire invalide. Vérifiez les messages d\'erreur.');
    }
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

// Ajout de gestionnaires d'événements pour les actions
document.getElementById('order').addEventListener('click', orderButtonClickHandler);
cartContainer.addEventListener("change", quantityChangeHandler);
cartContainer.addEventListener("click", deleteItemClickHandler);

// Appel de la fonction pour afficher le panier lors du chargement de la page
document.addEventListener("DOMContentLoaded", function () {
    displayCart(cart);
    updateTotalDisplay();
});
