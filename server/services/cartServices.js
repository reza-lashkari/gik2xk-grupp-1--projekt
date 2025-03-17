const { Cart, CartRow } = require('../models');

async function addProductToCart(customerId, productId, amount) {
    // Hämta eller skapa en varukorg
    const [cart] = await Cart.findOrCreate({
        where: { customerId, status: 'open' },
        defaults: { customerId, status: 'open' }
    });

    // Hämta befintlig produkt i varukorgen
    let cartRow = await CartRow.findOne({
        where: { cartId: cart.id, productId }
    });

    if (cartRow) {
        // Uppdatera mängden om produkten redan finns
        cartRow.amount += amount;
        await cartRow.save();
    } else {
        // Lägg till produkten om den inte finns
        cartRow = await CartRow.create({
            cartId: cart.id,
            productId,
            amount
        });
    }

    return cartRow;
}

module.exports = { addProductToCart };