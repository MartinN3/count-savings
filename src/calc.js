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
export const installedAreaTermicVzorec = ({
    ohrevVodyVzorecVysledek
}) => {
    let dailyKwhConsumption = kwhToGj(ohrevVodyVzorecVysledek);
    return dailyKwhConsumption / ( savingsConstants.efficiencyPanelTermic * climaConstants.czechRepublic.dailyIntensitySun)
}

// v m2
// Kolik termickych panelu potrebuju na pokryti vypocitane spotreby
export const installedAreaFveVzorec = ({
    ohrevVodyVzorecVysledek
}) => {
    let dailyKwhConsumption = kwhToGj(ohrevVodyVzorecVysledek);
    return dailyKwhConsumption / ( savingsConstants.efficiencyPanelFVE * climaConstants.czechRepublic.dailyIntensitySun)
}

export const installedPanelsTermic = ({
    installedAreaTermic = installedAreaTermicVzorec(ohrevVodyVzorecVysledek),
}) => {
    return installedAreaTermic / savingsConstants.areaPanelTermic;
}

export const installedPanelsFVE = ({
    installedAreaFVE = installedAreaFveVzorec(ohrevVodyVzorecVysledek),
}) => {
    return installedAreaFVE / savingsConstants.areaPanelFVE;
}

//TODO Kurva bacha vole musis volat return funkce nejak at ti ho posle u obou
export const investmentTermic = () => installedPanelsTermic() * savingsConstants.pricePanelTermic;

export const investmentFVE = () => installedPanelsFVE() * savingsConstants.pricePanelFVE;

export const savingsTermic = () => ( climaConstants.czechRepublic.prumernaDenniZareZa12mesicukWh * installedPanelsTermic() * savingsConstants.efficiencyPanelTermic ); * 30;

export const savingsFVE = () => ( climaConstants.czechRepublic.prumernaDenniZareZa12mesicukWh * installedPanelsFVE() * savingsConstants.efficiencyPanelFVE );

