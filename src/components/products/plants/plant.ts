import {Product} from '../product'

export class Plant extends Product {

    private color: number;

    constructor(name : String ,color : number , amount: number){
        super(name,amount);
        this.color = color;
    }
    getColor(){
        return this.color;
    }
}