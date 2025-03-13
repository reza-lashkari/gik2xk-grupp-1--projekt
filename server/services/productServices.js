const db = require('../models');
const {
    createResponsSuccess,
    createResponsError,
    createResponsMessage
} = require('../helpers/responsHelper');
const validate= require('validate.js');
const constraints = {
    title: {
        length: {
            minimum: 2,
            maximum: 100,
            tooShort: '^Titeln måste vara minst %{count} tecken lång.',
            tooLong: '^Titeln får inte vara längre än %{count} tecken lång.'
        }
    }
};

async function getById(id) {
  try {
    const product = await db.products.findOne({ // 🔥 Ensure `products` is lowercase!
      where: { id },
      include: [
        {
          model: db.ratings,  // 🔥 Ensure `ratings` is lowercase!
          as: "ratings" // This should match the alias defined in associations
        }
      ]
    });

    if (!product) {
      return createResponsError(404, "Produkten hittades inte");
    }

    return createResponsSuccess(product);
  } catch (error) {
    console.error("Fel vid hämtning av produkt:", error);  // 🔥 Log the actual error!
    return createResponsError(500, error.message || "Serverfel vid hämtning av produkt");
  }
}



async function addRating(productId, rating, comment) {
  try {
    // Kontrollera att produkten finns
    const product = await db.products.findByPk(productId);
    if (!product) {
      return { status: 404, data: { message: "Produkten hittades inte" } };
    }

    // Skapa och spara betyget i databasen
    const newRating = await db.ratings.create({
      product_id: productId,
      rating: rating,
      comment: comment
    });

    return { status: 201, data: newRating };
  } catch (error) {
    console.error("Fel vid tillägg av betyg:", error);
    return { status: 500, data: { message: "Serverfel vid tillägg av betyg" } };
  }
}


async function getAll(){
 try{
  const allProducts = await db.products.findAll(  );
  return createResponsSuccess(allProducts.map((products) => _formatProducts(products)));
}catch(error){
    return createResponsError(error.status,error.message);
}
  
}

async function create(product){
    const invalidData = validate(product, constraints);
        if (invalidData) {
            return createResponsError(422, invalidData);
        } else {
            try{
               const newProduct = await db.products.create(product);
                return createResponsSuccess(newProduct);
            }catch(error) {
                return createResponsError(error.status, error.message);
            }
           
        }
}

function _formatProducts(products) {
      return {
      id: products.id,
      title: products.title,
      imageUrl: products.imageUrl,
      createdAt: products.createdAt,
      updatedAt: products.updatedAt,
      ratings: []
    };
}

function update(){}
function destroy(){}

module.exports = {
    getById,
    getAll,
    create,
    update,
    destroy
};