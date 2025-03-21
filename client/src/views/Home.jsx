import ProductList from "../components/ProductList";
import {Grid} from '@mui/material';
import RatingList from "../components/RatingList";
function Home() {
    return (
        <> 
            <Grid container spacing={2} >
                <Grid item xs={12} md={8}> 
                    <ProductList />
                </Grid>
                <Grid item xs={12} md={4}>
                <RatingList />
                </Grid>





            </Grid>
        </>
    );
}

export default Home;