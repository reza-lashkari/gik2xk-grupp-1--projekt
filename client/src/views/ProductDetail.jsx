import { Button } from "@mui/material";
import ProductItemLarge from "../components/ProductItemLarge";
import { useNavigate } from "react-router-dom";
import RatingForm from "../components/RatingForm";
import Rating from "../components/Rating";


function ProductDetail() {
    const product = {
        "id": 1,
        "title": "Sommar dröm",
        "description": "Svart te medsmak av hallon och jordgubb 100g",
        "price": 23,
        "imageUrl": "https://quickbutik.imgix.net/50291i/products/636a5f64eef14.jpeg",
        "createdAt": "2025-03-21T08:50:03.000Z",
        "updatedAt": "2025-03-21T08:58:59.000Z",
        "ratings": [
            {
                "id": 1,
                "rating": 4,
                "createdAt": "2025-03-21T12:53:21.000Z",
                "updatedAt": "2025-03-21T12:53:21.000Z",
                "productId": 1
            }
        ],
        "averageRating": "4.0"
    };

    const navigate = useNavigate();

    return (
        <div>
            <ProductItemLarge product={product} />
            <Button onClick={() => navigate(-1)}>Tillbaka</Button>
            <Button onClick={() => navigate(`/products/${product.id}/edit`)}>Ändra</Button>
            <RatingForm />
            {product.ratings && product.ratings.map((rating, i) => (
                <Rating key={`rating_${i}`} rating={rating} />
            ))}
        </div>
    );
}

export default ProductDetail;