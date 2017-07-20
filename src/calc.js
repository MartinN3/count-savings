/**
 * Created by martin on 15.7.17.
 */
/**
 * Created by martin on 15.7.17.
 */

//helper Functions

export const kwhToGj = (dataInKwh) => dataInKwh * 0.0036;

//Constants
export const ohrevVodyConstants = {
    't1': 10, //°C
    't2': 55, //°C
    'z': 0.3, //Ztraty systemu pro ohrev vody
}

export const savingsConstants = {
    'priceKwEnergy': 4, //Kc cena za 1 kilowatt elektriny
    'priceGjEnergy': 580, //Kc cena za 1 gigajoule elektriny
    'priceGjGasEnergy': 415, //Kc cena za 1 gigajoule ohrate vody z vlastniho plynoveho kotle

    'pricePanelFVE': 34000, //Kc Cena za 1kw panelu i s praci
    'areaPanelFVE': 1.4, //m2 - Plocha jednoho panelu
    'efficiencyPanelFVE': 0.2, //%

    'pricePanelTermic': 20000, //Kc Cena za 1kw panel i s praci
    'areaPanelTermic': 2.2, //m2 - Plocha jednoho panelu
    'efficiencyPanelTermic': 0.5,
}

export const climaConstants = {
    'czechRepublic': {
        'dailyIntensitySun': 6.758, //kW/day sunshine per day
        'prumernaDenniZareZa12mesicukWh': 35, //kWh
        'prumernaDenniZareZa12mesicuGj': kwhToGj(35),
    }
}

// v m2
// Kolik termickych panelu potrebuju na pokryti vypocitane spotreby
export const installedAreaFveVzorec = ({
    ohrevVodyVzorecVysledek
}) => {
    let dailyKwhConsumption = kwhToGj(ohrevVodyVzorecVysledek);
    return dailyKwhConsumption / ( savingsConstants.efficiencyPanelFVE * climaConstants.czechRepublic.dailyIntensitySun)
}



// arg installedAreaFveVzorec(ohrevVodyVzorecVysledek)
export const installedPanelsFVEVzorec = ({
    installedAreaFVE,
}) => {
    return installedAreaFVE / savingsConstants.areaPanelFVE;
}


export const investmentFVE = (installedPanelsFVEVysledek) => installedPanelsFVEVysledek * savingsConstants.pricePanelFVE;

export const savingsFVE = (installedPanelsFVEVysledek) =>
    ( climaConstants.czechRepublic.prumernaDenniZareZa12mesicukWh * installedPanelsFVEVysledek * savingsConstants.efficiencyPanelFVE );

export class Termic {
    constructor(vysledek) {
        this.form = {
            input: {
                SimpleForm: vysledek,
            },
            output: {
                SimpleForm: undefined,
            },
            vysledek: {
                installedAreaTermicVzorec: undefined,
                installedPanelsTermicVzorec: undefined,
                investmentTermicVzorec: undefined,
                savingsTermicVzorec: undefined,
            }
        }
    }

    // v m2
    // Kolik termickych panelu potrebuju na pokryti vypocitane spotreby
    installedAreaTermicVzorec = ({
        ohrevVodyVzorecVysledek
    }) => {
        console.log(ohrevVodyVzorecVysledek);
        let dailyKwhConsumption = kwhToGj(ohrevVodyVzorecVysledek);
        return dailyKwhConsumption / ( savingsConstants.efficiencyPanelTermic * climaConstants.czechRepublic.dailyIntensitySun)
    }

    // arg installedAreaTermicVzorec(ohrevVodyVzorecVysledek)
    installedPanelsTermicVzorec = ({
    installedAreaTermicVysledek,
    }) => installedAreaTermicVysledek / savingsConstants.areaPanelTermic;

    investmentTermicVzorec = ({
        installedPanelsTermicVysledek
    }) => installedPanelsTermicVysledek * savingsConstants.pricePanelTermic;

    savingsTermicVzorec = ({
        investmentTermicVysledek
    }) => (climaConstants.czechRepublic.prumernaDenniZareZa12mesicukWh * investmentTermicVysledek * savingsConstants.efficiencyPanelTermic) * 30;

    init() {
        this.form.vysledek.installedAreaTermicVzorec = this.installedAreaTermicVzorec({
            ohrevVodyVzorecVysledek: this.form.input.SimpleForm
        });
        this.form.vysledek.installedPanelsTermicVzorec = this.installedPanelsTermicVzorec({
            installedAreaTermicVysledek: this.form.vysledek.installedAreaTermicVzorec
        });
        this.form.vysledek.investmentTermicVzorec = this.investmentTermicVzorec({
            installedPanelsTermicVysledek: this.form.vysledek.installedPanelsTermicVzorec
        });
        this.form.vysledek.savingsTermicVzorec = this.savingsTermicVzorec({
            investmentTermicVysledek: this.form.vysledek.investmentTermicVzorec
        });

        return this.form.vysledek;
    }
}
