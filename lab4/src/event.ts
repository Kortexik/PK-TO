export enum EventType {
    PZ = 1,
    MZ = 2
}
export class SimulationEvent {
    private type: EventType;
    private coordinates: number[];

    constructor(type: EventType, coordinates: number[]) {
        this.type = type;
        this.coordinates = coordinates;
    }

    public checkType(): string {
        if (this.type == 1) {
            return "Pożar";
        } else {
            return "Miejscowe Zagrożenie";
        }
    }

    public getCoordinates(): number[] {
        return this.coordinates;
    }
}