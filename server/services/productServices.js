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
async function getAll(){
 try{
  const allProducts = await db.products.findAll();
  return createResponsSuccess(allProducts);
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
function update(){}
function destroy(){}

module.exports = {
    getAll,
    create,
    update,
    destroy
};