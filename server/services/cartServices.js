// cartServices.js
const { Cart, CartRow } = require('../models');

async function addProductToCart(costumerId, productId, amount) {
    // Hämta den senaste öppna varukorgen eller skapa en ny
    const [cart] = await Cart.findOrCreate({
        where: { customerId, status: 'open' },
    });

    // Kontrollera om produkten redan finns i varukorgen
    let cartRow = await CartRow.findOne({
        where: { cartId: cart.id, productId }
    });

    if (cartRow) {
        // Uppdatera antalet om produkten redan finns
        cartRow.amount += amount;
        await cartRow.save();
    } else {
        // Lägg till produkten i varukorgen
        cartRow = await CartRow.create({
            cartId: cart.id,
            productId,
            amount,
        });
    }

    return cartRow;
}

module.exports = { addProductToCart };