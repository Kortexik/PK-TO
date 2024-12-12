import { JRG } from "../jednostki";

interface Iterator<T> {
    current(): T | null;
    next(): T | null;
    key(): number;
    valid(): boolean;
    rewind(): void;
}

export class UnitIterator implements Iterator<JRG> {
    private collection: JRG[];
    private position: number = 0;

    private reverse: boolean = false;

    constructor(collection: JRG[], reverse: boolean = false) {
        this.collection = collection;
        this.reverse = reverse;

        if(reverse) {
            this.position = collection.length - 1;
        }
    }

    public rewind() {
        this.position = this.reverse ?
            this.collection.length - 1 :
            0;
    }
    public key(): number {
        return this.position;
    }

    public next(): JRG | null {
        if (!this.valid()) {
            console.error("Iterator out of bounds.");
            return null;
        }
        this.position += this.reverse ? -1 : 1;
        return this.valid() ? this.collection[this.position] : null;
    }
    
    public current(): JRG | null {
        if (!this.valid()) {
            console.error("Iterator is not in a valid state.");
            return null;
        }
        return this.collection[this.position];
    }
    

    public valid(): boolean {
        if (this.reverse) {
            return this.position >= 0;
        }
        return this.position < this.collection.length;
    }


}