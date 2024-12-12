import { JRG } from "../jednostki";
import { Woz } from "../woz";

export interface Strategy {
    execute(unit: JRG, vehiclesNeeded: number): Woz[];
}
