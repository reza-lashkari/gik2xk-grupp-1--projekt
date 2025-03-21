import ProductItemSmall from "./ProductItemSmall";

function ProductList() {
   const products = [
    {
        "id": 1,
        "title": "Sommar dröm",
        "description": "Svart te med smak av hallon och jordgubb 100g",
        "price": 23,
        "imageUrl": "https://quickbutik.imgix.net/50291i/products/636a5f64eef14.jpeg",
        "createdAt": "2025-03-21T08:50:03.000Z",
        "updatedAt": "2025-03-21T08:58:59.000Z"
    },
    {
        "id": 2,
        "title": "Vinter dröm",
        "description": "Svart te med smak av kanel och apelsin 40g",
        "price": 45,
        "imageUrl": "https://feelvivid.fi/3292-large_default/apelsin-kanel-te-20-ps-.jpg",
        "createdAt": "2025-03-21T08:56:09.000Z",
        "updatedAt": "2025-03-21T08:57:38.000Z"
    },
    {
        "id": 3,
        "title": "Ingefära och apelsin",
        "description": "Grönt te med kryddig smak av ingefära och mjuk smak av apelsin 40g",
        "price": 37.98,
        "imageUrl": "https://d1ax460061ulao.cloudfront.net/1000x1000/8/1/819a4559fddc1c6ef3d438b060c30c36.jpg",
        "createdAt": "2025-03-21T09:02:05.000Z",
        "updatedAt": "2025-03-21T09:02:05.000Z"
    },
    {
        "id": 4,
        "title": "Sweet chai",
        "description": "Sött chai te 34g",
        "price": 42,
        "imageUrl": "https://www.b-bio.fr/wp-content/uploads/2021/10/yogi-tea-sweet-chai-fr.600x0.png",
        "createdAt": "2025-03-21T09:05:15.000Z",
        "updatedAt": "2025-03-21T09:05:15.000Z"
    },
    {
        "id": 5,
        "title": "rooibos",
        "description": "Milt te med smak av rooibos 30.6g",
        "price": 42,
        "imageUrl": "https://ec.nice-cdn.com/upload/image/product/large/default/yogi-tea-rooibos-ekologiskt-te-17-paasar-2082513-sv.png",
        "createdAt": "2025-03-21T09:08:05.000Z",
        "updatedAt": "2025-03-21T09:08:05.000Z"
    }
]
    return(
         <ul>
        {products?.length > 0 ? (
            products.map((product) => (
            <li key = {`products_${product.id}`}>
                <ProductItemSmall product={product}/>
        </li>
        ))
    ) : (
         <h3>Produkter saknas</h3>
    )}    
    </ul>  
    );
}

export default ProductList ;