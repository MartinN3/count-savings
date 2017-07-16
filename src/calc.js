/**
 * Created by martin on 15.7.17.
 */
/**
 * Created by martin on 15.7.17.
 */

//Constants

const ohrevVodyConstants = {
    't1': 10, //°C
    't2': 55, //°C
    'z': 0.3, //Ztraty systemu pro ohrev vody
}

const savingsConstants = {

    'priceKwEnergy': 4, //Kc cena za 1 kilowatt elektriny
    'priceGjEnergy': 600, //Kc cena za 1 gigajoule elektriny

    'pricePanelFVE': 34000, //Kc Cena za 1kw panelu i s praci
    'areaPanelFVE': 1.4, //m2 - Plocha jednoho panelu
    'efficiencyPanelFVE': 0.2, //%

    'pricePanelTermic': 20000, //Kc Cena za 1kw panel i s praci
    'areaPanelTermic': 2.2, //m2 - Plocha jednoho panelu
    'efficiencyPanelTermic': 0.5,

}

const climaConstants = {
    'czechRepublic': {
        'dailyIntensitySun': 6.58, //kW/day sunshine per day
        'prumernaDenniZareZa12mesicukWh': 35, //kWh
        'prumernaDenniZareZa12mesicuGj': 35 * 0.0036,
    }
}

//SimpleCalc

const simpleCalcConstants = {
    'pocetOsob': 3,
    'spotrebaTUV': 50, //Litres day
    'denniSpotreba': {
        'spotrebice': 7.36, //kWh day
    },
};

const ohrevVodyVzorec = ({
    pocetOsob = simpleCalcConstants['pocetOsob'],
    spotrebaTUV = simpleCalcConstants['spotrebaTUV'],
    z = ohrevVodyConstants['z'],
    t1 = ohrevVodyConstants['t1'],
    t2 = ohrevVodyConstants['t2']
}) => {
  return ( 1 + z ) * ( 1000 * 4.186 * ( ( pocetOsob * spotrebaTUV ) / 1000 ) * ( t2 - t1 ) ) / 1000000;
};

//Vzorec

const ohrevVodyVzorce = {
    'spotrebaTUV': ohrevVodyVzorec(
        ohrevVodyConstants['z'],
        simpleCalcConstants['pocetOsob'],
        simpleCalcConstants['spotrebaTUV'],
        ohrevVodyConstants['t1'],
        ohrevVodyConstants['t2']
    )
}


console.log(ohrevVodyVzorce);