import { Product } from "../product";


export class Fertilizer extends Product {

     private weight: number;

    constructor(name: string, amount: number, weight: number) {
        super(name,amount);
        this.weight = weight;
    }

    getweight() {
        return this.weight;
    }
    toString() {
        return `Fertilizer weight: ${this.getweight()}`;
    }

    
}


