export class Product {
    private static id : number = 1;

    private name: String;

   private code: number;

   private amount: number;

    constructor(name : String, amount : number) {
        this.name = name;
        this.code = Product.id;
        Product.id++;
        this.amount = amount;
    }

    getAmount() {
        return this.amount;
    }

    getName() {
        return this.name;
    }

    getCode() {
        return this.code;
    }

    toString() {
        return `Product name: ${this.name} code: ${this.code}`;
    }

    
}