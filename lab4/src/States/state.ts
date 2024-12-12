import { Woz } from '../woz';

export interface State {
    changeState(woz: Woz): void;
    handleState(): void;
}
