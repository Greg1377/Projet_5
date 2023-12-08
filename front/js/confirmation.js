// Fonction pour récupérer le numéro de commande depuis l'URL
function getOrderIdFromURL() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get('orderId');
}


