export class Product {
    private static id : number = 1;

    private name: String;

   private code: number;

    constructor(name : String){
        this.name = name;
        this.code = Product.id;
        Product.id++;
    }
}