import { FreeState } from './States/freeState';
import {State} from './States/state'

export class Woz {
    private state: State;
    private name: string;

    constructor(name: string, state: State) {
        this.state = state;
        this.name = name;
    }

    public print() {
        console.log(this.state, this.name);
    }

    public setState(newState: State) {
        this.state = newState;
    }

    public getState(): State {
        return this.state;
    }

    public getName(): string {
        return this.name;
    }

    public isFree(): boolean {
        return this.state instanceof FreeState;
    }
}