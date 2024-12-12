import { Observer } from './Observer/observer';
import { FreeState } from './States/freeState';
import { Woz } from './woz';
import { SimulationEvent } from './event';
import { Strategy } from './Strategy/strategy';
import { PZStrategy } from './Strategy/pz';
import { MZStrategy } from './Strategy/mz';
import { getRandomTime } from './utility';
import { OccupiedState } from './States/occupiedState';

export class JRG implements Observer {
    private coordinates: number[];
    private name: string;
    private wozy: Woz[] = [];
    private dispatchedWozy: Woz[] = [];
    private strategy: Strategy | null = null;

    public constructor(coordinates: number[], name: string) {
        this.coordinates = coordinates;
        this.name = name;

        for (let i = 0; i < 5; i++) {
            this.wozy.push(new Woz(`w${i + 1}`, new FreeState()));
        }
    }

    public setStrategy(param: Strategy): void {
        this.strategy = param;
    }

    public print(): void {
        console.log(this.name, this.coordinates, this.wozy);
    }

    public getWozy(): Woz[] {
        return this.wozy;
    }

    public getName(): string {
        return this.name;
    }

    public getCoordinates(): number[] {
        return this.coordinates;
    }

    public updateForVehicles(event: SimulationEvent, vehiclesNeeded: number): number {
        console.log(`${this.name} received event: ${event.checkType()} at ${event.getCoordinates()}`);
        
        switch (event.checkType()) {
            case "Pożar":
                this.setStrategy(new PZStrategy());
                break;
            case "Miejscowe Zagrożenie":
                this.setStrategy(new MZStrategy());
                break;
            default:
                console.error(`Unknown event type: ${event.checkType()}`);
                return 0;
        }
        if (!this.strategy) {
            console.error(`No strategy set for event type: ${event.checkType()}`);
            return 0;
        }
    
        const usedVehicles = this.strategy.execute(this, vehiclesNeeded); 
        
        const vehiclesToDispatch = Math.min(vehiclesNeeded, usedVehicles.length);
        for (let i = 0; i < vehiclesToDispatch; i++) {
            usedVehicles[i].setState(new OccupiedState());
            this.dispatchedWozy.push(usedVehicles[i]);
        }
    
        this.simulateEventHandling();
        return vehiclesToDispatch;
    }
    
    private simulateEventHandling(): void {
        const arrivalTime = getRandomTime(0, 3);
    
        setTimeout(() => {
            const isFalseAlarm = Math.random() < 0.05;
    
            if (isFalseAlarm) {
                console.log(`${this.name}: False alarm! Vehicles returning immediately.`);
                this.handleVehicleReturn(getRandomTime(0, 3));
            } else {
                const actionTime = getRandomTime(5, 25);
                console.log(`${this.name}: Vehicles handling the event for ${actionTime / 1000} seconds.`);
    
                setTimeout(() => {
                    console.log(`${this.name}: Event handled. Vehicles returning.`);
                    this.handleVehicleReturn(getRandomTime(0, 3));
                }, actionTime);
            }
        }, arrivalTime);
    }
    

    private handleVehicleReturn(returnTime: number): void {
        console.log(`${this.name} vehicles will return in ${returnTime / 1000} seconds...`);

        setTimeout(() => {
            for (const woz of this.dispatchedWozy) {
                woz.setState(new FreeState());
                console.log(`${woz.getName()} has returned to free state.`);
            }

            this.dispatchedWozy = [];
        }, returnTime);
    }


    public getDispatchedWozy(): Woz[] {
        return this.dispatchedWozy;
    }
}