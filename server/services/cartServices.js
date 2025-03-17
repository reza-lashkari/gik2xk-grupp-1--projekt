const { Cart } = require('../models');

async function addProductToCart(customerId, productId, amount) {
    // Hämta eller skapa en varukorg
    const [cart] = await Cart.findOrCreate({
        where: { customerId, payed: false },
        defaults: { customerId, payed: false }
    });

    // Hämta befintlig produkt i varukorgen
    let cartRow = await db.cartRow.findOne({
        where: { cartId: cart.id, productId }
    });

    if (cartRow) {
        // Uppdatera mängden om produkten redan finns
        cartRow.amount += amount;
        await cartRow.save();
    } else {
        // Lägg till produkten om den inte finns
        cartRow = await db.cartRow.create({
            cartId: cart.id,
            productId,
            amount
        });
    }

    return cartRow;
}
async function getUserCart(customerId) {
    try {
        const latestCart = await db.carts.findOne({
            where: { customerId, payed: false },
            order: [['createdAt', 'DESC']],
            include: [{
                model: db.cartRow,
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