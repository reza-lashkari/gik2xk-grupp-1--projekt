import { Typography } from "@mui/material";



function ProductItemLarge({ product } ) {
    return ( <div>
        <h3>{product.title}</h3>
        <img width="200" src={product.imageUrl} alt={product.title} />
        <Typography variant="body2">Beskrivning: {product.description}</Typography>
        <Typography variant="h6">Pris: {product.price} kr</Typography>
    </div> );
}

export default ProductItemLarge;