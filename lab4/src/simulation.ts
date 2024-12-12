import { SKKM } from './skkm';
import { JRG } from './jednostki';
import { Observer } from './Observer/observer';

export class Simulation {
    private skkm: SKKM;
    private jrgCollection: JRG[];

    constructor() {
        this.skkm = new SKKM();
        this.jrgCollection = [
            new JRG([50.059963031580764, 19.943171084919683], "Jednostka Ratowniczo Gaśnicza nr 1"),
            new JRG([50.037077887215204, 19.945406379920552], "Jednostka Ratowniczo Gaśnicza nr 2"),
            new JRG([50.07591350797821, 19.88779656876308], "Jednostka Ratowniczo Gaśnicza nr 3"),
            new JRG([50.03889365314448, 20.01325673333259], "Jednostka Ratowniczo Gaśnicza nr 4"),
            new JRG([50.09199052712424, 19.92053195526966], "Jednostka Ratowniczo Gaśnicza nr 5"),
            new JRG([50.02689357286301, 20.042102115788804], "Jednostka Ratowniczo Gaśnicza nr 6"),
            new JRG([50.09423503830333, 19.97808183886506], "Jednostka Ratowniczo Gaśnicza nr 7"),
            new JRG([49.9684788830731, 19.799921493171208], "Jednostka Ratowniczo Gaśnicza Skawina"),
            new JRG([50.079264550808084, 19.79044019003577], "Jednostka Ratowniczo Gaśnicza Balice"),
            new JRG([50.077180117092745, 20.032838313827646], "Jednostka Ratowniczo Gaśnicza Aspirantów PSP")
        ];

        for (const jrg of this.jrgCollection) {
            this.skkm.addObserver(jrg);
        }
    }

    public runSimulation(): void {
        setInterval(() => {
            this.skkm.createEvent();
        }, 5000);
    }
}

let sim = new Simulation();
sim.runSimulation();