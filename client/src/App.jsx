import { Link, Outlet } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';

function App() {
  return (
    <>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx = {{backgroundColor: 'gold'}}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/">Hem</Link>
            </Typography>
            <Button color="inherit">
              <Link to="/Products/new">Lägg till produkt</Link>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

    
      <Outlet />


      <Box
        component="footer"
        sx={{
          width: '100%',
          bgcolor: 'gold',
          color: 'black',
          textAlign: 'center',
          py: 2,
          mt: 4,
        }}
      >
        <Typography variant="body2">
          © 2024 Webbshoppen. Alla rättigheter reserverade.
        </Typography>
      </Box>
    </>
  );
}

export default App;