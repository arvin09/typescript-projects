import { IsNumber, IsPositive, IsNotEmpty } from "class-validator"

export class Product {
    @IsNotEmpty()
    title: string;

    @IsNumber()
    @IsPositive()
    price: number;

    constructor(t:string, p:number) {
        this.title = t;
        this.price = p;
    }

    getInformation() {
        const info = [this.title, `INR ${this.price}`];
        console.log(info);
    }
}