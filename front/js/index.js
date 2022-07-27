// Création du htlm à inséret dans le DOM pour chaque produit

function showItems (e){
    return
    <a href="./product.html?id=$(e._id)">

    <article>
         <img src="${e.imageUrl}"{e.altTex}>
         <h1 class="productTitle">${e.title}<h1>
         <P class="productDescription">${e.description}<p>
         </article>
         </a>;
}