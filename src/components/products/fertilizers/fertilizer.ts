

export class Fertilizer {

     private weight: number;

    constructor(weight: number) {
        this.weight = weight;
    }

    getweight() {
        return this.weight;
    }
    toString() {
        return `Fertilizer weight: ${this.getweight()}`;
    }

    
}


