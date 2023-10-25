import {Product} from '../product'

export class Plant extends Product {

    private color: number;

    constructor(name : String ,color : number){
        super(name);
        this.color = color;
    }
    getColor(){
        return this.color;
    }
}