import 'reflect-metadata';
import  { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Product } from "./product.model";


// const p = new Product('Book', 5.99);

const products = [
    { title: 'A Carpet', price: 26.55 },
    { title: 'A Book', price: 15.99 }
]

const newProd = new Product('', -4.09);
validate(newProd).then(err => {
    if(err.length > 0) {
        console.log(err);
    } else {
        console.log(newProd);
    }
})

// const loadedProducts = products.map(prod => {
//     return new Product(prod.title, prod.price);
// })

const loadedProducts = plainToClass(Product, products);

console.log(loadedProducts);