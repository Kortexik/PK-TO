import { Woz } from '../woz';
import { State } from './state';

export class FreeState implements State {
    public changeState(woz: Woz): void {
        woz.setState(new FreeState());
    }

    public handleState(): void {
        console.log("Handling free state...");
    }
}