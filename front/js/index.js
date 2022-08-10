// Variable contenant l'adresse de l'API

const ShowItemsApi = "http://localhost:3000/api/products";

// Requête API

fetch(ShowItemsApi)
  .then((reponse) => {
    return reponse.json();
  })

  .then((products) => {
    console.log(products);

    for (donner of products) {
      console.log(donner);
      document.getElementById(
        "items"
      ).innerHTML += `<a href="./product.html?id=${donner._id}">
    <article>
    <img   
        src="${donner.imageUrl}"
         alt="${donner.altTxt}"/>
          <h3 class="productName">${donner.name}</h3>
                <p class="productDescription"> ${donner.description}</p>
             </article>
         </a>`;
    }
  });
