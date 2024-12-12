import { State } from './state'
import { Woz } from '../woz'
import { FreeState } from './freeState'

export class OccupiedState implements State {
    public changeState(woz: Woz) {
        woz.setState(new FreeState)
    }

    public handleState(): void {
        console.log("Handling o'ccupied state...")
    }
}