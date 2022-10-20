const product_storage_data = require('../Ecommerce/strings')

function price_calculate(prod_data) {
    return new Promise(
        (resolve, reject) => {
            try {

                let price_value = 0;
                let prod = [];
                for (let i = 0; i < prod_data.length; i++) {
                    let pr = product_storage_data.find(elem =>
                        elem.product_id == prod_data[i].product_id)

                    const quant = parseInt(prod_data[i].quantity);

                    const price_of_product = (pr.product_price) * quant;
                    price_value += price_of_product;
                    const { product_id, product_name, product_price, product_rating } = pr;

                    prod.push({
                        product_id, product_name, product_price, product_rating
                        , quant, price_of_product
                    })
                }
                resolve({
                    price: {
                        price_v: price_value,
                        tax_v: 10,
                        total: price_value + 10
                    },
                    products: prod
                })
            } catch (error) {
                reject(error)
            }
        })
}
module.exports = price_calculate;
