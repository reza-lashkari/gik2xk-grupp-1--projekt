function ProductItemSmall({product}) {
    return <>
     <h3>{product.title}</h3>
             <img src={product.imageUrl} alt={product.title} />
        <p>Beskrivning: {product.description}</p>
        <p>Pris: {product.price} kr</p>
    </>
}

export default ProductItemSmall;