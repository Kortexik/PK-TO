import { SimulationEvent } from "../event";

export interface Observer {
    updateForVehicles(event: SimulationEvent, vehiclesNeeded: number): number;
}