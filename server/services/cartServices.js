// cartServices.js
const { Cart, cartRow } = require('../models');

async function addProductToCart(userId, productId, amount) {
    // Hämta den senaste öppna varukorgen eller skapa en ny
    const [cart] = await Cart.findOrCreate({
        where: { userId, status: 'open' },
    });

    // Kontrollera om produkten redan finns i varukorgen
    let cartRow = await cartRow.findOne({
        where: { cartId: cart.id, productId }
    });

    if (cartRow) {
        // Uppdatera antalet om produkten redan finns
        cartRow.amount += amount;
        await cartRow.save();
    } else {
        // Lägg till produkten i varukorgen
        cartRow = await cartRow.create({
            cartId: cart.id,
            productId,
            amount,
        });
    }

    return cartRow;
}

module.exports = { addProductToCart };