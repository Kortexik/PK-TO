const minX: number = 49.95855025648944;
const maxX: number = 50.154564013341734;
const minY: number = 19.688292482742394;
const maxY: number = 20.02470275868903;


export function getRandomEvent(): number {
    if (Math.random() < 0.1) {
        return 2
    } else {
        return 1
    }
}

export function getRandomNumber(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

export function getRandomCoordinates(): number[] {
    return [getRandomNumber(minX, maxX), getRandomNumber(minY, maxY)];
}

export function getBaliceCoordinates(): number[] {
    return [50.079264550808084, 19.79044019003577];
}

export function getRandomTime(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min) * 1000;
}


export function randomFivePercent(): boolean {
    if (Math.random() < 0.05) {
        return true;
    } else {
        return false;
    }
}

export function randomActionsTime(): number {
    return (Math.random() * (25 - 5) + 5) * 1000;
}

export function degToRad(degrees: number): number {
    return degrees * (Math.PI / 180);
}

export function calculateHaversineDistance(coord1: number[], coord2: number[]): number {
    const R = 6371; // Earth's radius in kilometers
    const lat1 = degToRad(coord1[0]);
    const lon1 = degToRad(coord1[1]);
    const lat2 = degToRad(coord2[0]);
    const lon2 = degToRad(coord2[1]);

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}