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
      const product = await db.products.findByPk(productId);
      if (!product) {
          return createResponsError(404, "Produkten hittades inte");
      }

      const newRating = await db.ratings.create({ productId, rating, comment });

      return createResponsSuccess(newRating);
  } catch (error) {
      console.error("Fel vid tillägg av betyg:", error);
      return createResponsError(500, "Serverfel vid tillägg av betyg", error.message);
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

async function create(products){
    const invalidData = validate(products, constraints);
        if (invalidData) {
            return createResponsError(422, invalidData);
        } else {
            try{
               const newProducts = await db.products.create(products);
                return createResponsSuccess(newProducts);
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
      ratings: products.ratings
    };
}

async function update(products, id) {
  const invalidData = validate(products, constraints);
  if (!id) {
    return (422, 'Id är obligatoriskt');
  }
  if (invalidData) {
    return (422, invalidData);
  }
  try {
    const existingProducts = await db.products.findOne({ where: { id } });
    if (!existingProducts) {
      return (404, 'Hittade inget inlägg att uppdatera.');
    }

    // Uppdatera posten
    const updatedProducts = await db.products.update(products, { where: { id } });

    return {
      status: 200,
      message: 'Inlägget uppdaterades framgångsrikt',
      data: updatedProducts,
    };
  } catch (error) {
    return (500, 'Ett oväntat fel inträffade', error);
  }
}





async function destroy(id) {
  if (!id) {
      return createResponsError(422, "Id är obligatoriskt");
  }
  try {
      const deleted = await db.products.destroy({ where: { id } });
      if (!deleted) {
          return createResponsError(404, "Produkten hittades inte");
      }
      return createResponsSuccess({ message: "Produkten har tagits bort" });
  } catch (error) {
      console.error("Fel vid borttagning av produkt:", error);
      return createResponsError(500, "Ett oväntat fel inträffade", error.message);
  }
}

module.exports = {
    addRating,
    getById,
    getAll,
    create,
    update,
    destroy
};