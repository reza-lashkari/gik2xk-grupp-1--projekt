const db = require('../models');
const { createResponsError, createResponsSuccess } = require('../helpers/responsHelper');
async function addProductToCart(customerId, productId, amount) {
    // Hämta eller skapa en varukorg
    const [cart] = await db.carts.findOrCreate({
        where: { customerId, payed: false },
        defaults: { customerId, payed: false }
    });

    // Hämta befintlig produkt i varukorgen
    let cartRows = await db.cartRows.findOne({
        where: { cartId: cart.id, productId }
    });

    if (cartRows) {
        // Uppdatera mängden om produkten redan finns
        cartRows.amount += amount;
        await cartRows.save();
    } else {
        // Lägg till produkten om den inte finns
        cartRows = await db.cartRows.create({
            cartId: cart.id,
            productId,
            amount
        });
    }

    return cartRows;
}
async function getUserCart(customerId) {
    try {
        const latestCart = await db.carts.findOne({
            where: { customerId, payed: false },
            order: [['createdAt', 'DESC']],
            include: [{
                model: db.cartRows,
                include: [db.products]
            }]
        });

        if (!latestCart) {
            return createResponsError(404, "Ingen varukorg hittades");
        }

        // Format the cart data for better readability
        const cartItems = latestCart.cartRows.map(row => {
            return {
                productId: row.product.id,
                title: row.product.title,
                price: row.product.price,
                amount: row.amount,
                totalPrice: row.amount * row.product.price
            };
        });

        return createResponsSuccess(cartItems);
    } catch (error) {
        console.error("Fel vid hämtning av varukorg:", error);
        return createResponsError(500, "Serverfel vid hämtning av varukorg");
    }
}


module.exports = { addProductToCart, getUserCart };