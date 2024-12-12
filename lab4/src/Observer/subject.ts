import {Observer} from './observer'
import { SimulationEvent } from '../event';
import { JRG } from '../jednostki';

export interface Subject {
    addObserver(observer: Observer): void;
    removeObserver(observer: Observer): void;
    notifyObserver(unit: JRG, event: SimulationEvent, vehiclesNeeded: number): number;
}