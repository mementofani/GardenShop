export class Product {
    private static id : number = 1;

    private name: String;

   private code: number;

    constructor(name : String){
        this.name = name;
        this.code = Product.id;
        Product.id++;
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