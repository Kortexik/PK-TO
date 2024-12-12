import { JRG } from "../jednostki";
import { OccupiedState } from "../States/occupiedState";
import { Strategy } from "./strategy";
import { Woz } from "../woz";

export class PZStrategy implements Strategy {
    public execute(unit: JRG, vehiclesNeeded: number): Woz[] {
        const usedVehicles: Woz[] = [];

        for (const woz of unit.getWozy()) {
            if (usedVehicles.length < vehiclesNeeded && woz.isFree()) {
                woz.setState(new OccupiedState());
                usedVehicles.push(woz);
            }
        }

        console.log(`${unit.getName()}, PZStrategy executed used vehicles: ${usedVehicles.map((woz) => woz.getName())}`);
        return usedVehicles;
    }
}
