import { faker } from '@faker-js/faker';

function getProduct () {
    return {nombre: faker.commerce.productName(), precio: faker.commerce.price(20, 3000), thumbnail: faker.image.food(640,480,true)}
}

function getProducts(qty) {
    const products = []
    for (let index = 0; index < qty; index++) {
        products.push({id: index, ...getProduct()})
    }
    return products;
}

export { getProducts };