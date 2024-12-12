import { UnitIterator } from './Iterator/iterator'; // Assuming the iterator is in this path
import { SimulationEvent } from './event';
import { Subject } from './Observer/subject';
import { Observer } from './Observer/observer';
import { getRandomEvent, getBaliceCoordinates, calculateHaversineDistance } from './utility';
import { JRG } from './jednostki';

export class SKKM implements Subject {
    private events: SimulationEvent[] = [];
    private observers: Observer[] = [];

    public createEvent(): void {
        const newEvent = new SimulationEvent(getRandomEvent(), getBaliceCoordinates());
        this.events.push(newEvent);

        const sortedUnits = this.findUnitsSortedByDistance(newEvent);

        const iterator = new UnitIterator(sortedUnits);

        let vehiclesNeeded = newEvent.checkType() === "Pożar" ? 3 : 2;

        while (iterator.valid() && vehiclesNeeded > 0) {
            const currentUnit = iterator.current();
            if (currentUnit) {
                const dispatchedVehicles = this.notifyObserver(currentUnit, newEvent, vehiclesNeeded);
                vehiclesNeeded -= dispatchedVehicles;

                if (vehiclesNeeded > 0) {
                    console.log(`Not enough vehicles in unit: ${currentUnit.getName()}. Checking the next unit...`);
                }
            }
            iterator.next();
        }

        if (vehiclesNeeded > 0) {
            console.log('Not enough vehicles available to fully handle the event.');
        }
    }

    public findUnitsSortedByDistance(event: SimulationEvent): JRG[] {
        const eventCoords = event.getCoordinates();

        const unitsWithDistances: { unit: JRG; distance: number }[] = this.observers
            .filter((observer) => observer instanceof JRG)
            .map((observer: JRG) => {
                const unitCoords = observer.getCoordinates();
                const distance = calculateHaversineDistance(eventCoords, unitCoords);
                return { unit: observer, distance };
            });

        unitsWithDistances.sort((a, b) => a.distance - b.distance);
        return unitsWithDistances.map((entry) => entry.unit);
    }

    public addObserver(observer: Observer): void {
        this.observers.push(observer);
    }

    public removeObserver(observer: Observer): void {
        const index = this.observers.indexOf(observer);
        this.observers.splice(index, 1);
    }

    public notifyObserver(unit: JRG, event: SimulationEvent, vehiclesNeeded: number): number {
        const dispatchedVehicles = unit.updateForVehicles(event, vehiclesNeeded);
        if (dispatchedVehicles > 0) {
            console.log(`${unit.getName()} dispatched ${dispatchedVehicles} vehicles for event: ${event.checkType()} at ${event.getCoordinates()}`);
        } else {
            console.log(`${unit.getName()} has no available vehicles for this event.`);
        }
        return dispatchedVehicles;
    }

    public getEvents(): SimulationEvent[] {
        return this.events;
    }

}

