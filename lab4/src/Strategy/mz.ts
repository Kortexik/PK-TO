import { JRG } from "../jednostki";
import { OccupiedState } from "../States/occupiedState";
import { Woz } from "../woz";
import { Strategy } from "./strategy";

export class MZStrategy implements Strategy {
    public execute(unit: JRG, vehiclesNeeded: number): Woz[] {
        const usedVehicles: Woz[] = [];

        for (const woz of unit.getWozy()) {
            if (usedVehicles.length < vehiclesNeeded && woz.isFree()) {
                woz.setState(new OccupiedState());
                usedVehicles.push(woz);
            }
        }

        console.log(`${unit.getName()}, MZStrategy executed used vehicles: ${usedVehicles.map((woz) => woz.getName())}`);
        return usedVehicles;
    }
}
