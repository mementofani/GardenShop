class Fertilizer {

    #weight: number;

    constructor(weight: number) {
        this.#weight = weight;
    }
    get weight() {
        return this.#weight;
    }
    
}


