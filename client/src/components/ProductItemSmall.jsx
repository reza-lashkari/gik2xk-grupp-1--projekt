import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function ProductItemSmall({ product }) {
    return (
        <Card sx={{ maxWidth: 300, border: "1px solid #ddd", borderRadius: 2, boxShadow: 2 }}>
            <CardActionArea component={Link} to={`/products/${product.id}`}>
                <CardContent>
                    <Typography variant="h6">{product.title}</Typography>
                    <Box display="flex" justifyContent="center">
                        <img width="200" src={product.imageUrl} alt={product.title} />
                    </Box>
                    <Typography variant="body2">Beskrivning: {product.description}</Typography>
                    <Typography variant="h6">Pris: {product.price} kr</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default ProductItemSmall;