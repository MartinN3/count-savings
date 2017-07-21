import React, {Component} from 'react';
import {Page, Navbar, NavRight, Link, Popup, View, Pages, List, ListItem, FormInput, Button, ContentBlock } from 'framework7-react';
import { ohrevVodyConstants, Termic } from './calc';
//SimpleCalc

const simpleCalcConstants = {
    'pocetOsob': 3,
    'spotrebaTUV': 50, //Litres day
    'denniSpotreba': {
        'spotrebice': 7360, //wh day
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

export class SimpleForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            input: {
                pocetOsob: "",
                spotrebaTUV: ""
            },
            output: {
                SimpleForm: '',
                popupVisible: false,
                Termic: {},
            }
        };

    }

    handleInputChange(newPartialInput) {
        this.setState(state => ({
            ...state,
            input: {
                ...state.input,
                ...newPartialInput
            }
        }))
    }

    handleOutput(newOutput) {
        this.setState(state => ({
            ...state,
            output: {
                ...state.output,
                ...newOutput
            }
        }))
    }

    validate() {
        const errors = {};
        const {input} = this.state;

        if (!input.pocetOsob) {
            errors.pocetOsob = 'Vyplňte počet osob v domácnosti';
        }

        if (!input.spotrebaTUV) {
            errors.spotrebaTUV = 'Vyplňte roční spotřebu teplé vody';
        }

        return {
            errors,
            isValid: Object.keys(errors).length === 0
        };
    }

    render() {
        const {input, output} = this.state;
        const {errors, isValid} = this.validate();
        return (
            <Page>
                <Navbar backLink="Back" title="Kalkulačka spotřeby" sliding />

                <ContentBlock inner>
                    <p>Představujeme vám univerzální kalkulačku spotřeby elektrické energie v domácnosti</p>
                </ContentBlock>

                <List form>
                    <ListItem>
                        <FormInput
                            type="number"
                            placeholder="Počet osob v domácnosti"
                            value={input.pocetOsob}
                            onChange={(e) => this.handleInputChange({pocetOsob: parseInt(e.target.value)})}
                        />
                    </ListItem>
                    <ListItem>
                        <FormInput
                            type="number"
                            placeholder="Roční spotřeba teplé vody"
                            value={input.spotrebaTUV}
                            onChange={(e) => this.handleInputChange({spotrebaTUV: parseInt(e.target.value)})}
                        />
                    </ListItem>
                    <ContentBlock>
                        <Button
                            big
                            fill
                            color="green"
                            openPopup="#outputPopup"
                            disabled={!isValid}
                            onClick={(e) => {
                                e.preventDefault();
                                this.handleOutput({
                                    SimpleForm: ohrevVodyVzorec({
                                        pocetOsob: this.state.input.pocetOsob === "" ? undefined : this.state.input.pocetOsob,
                                        spotrebaTUV: this.state.input.spotrebaTUV === "" ? undefined : this.state.input.spotrebaTUV,
                                    }),
                                    popupVisible: true
                                });
                                const c = new Termic(this.state.output.SimpleForm);
                                this.handleOutput({
                                    Termic: c.init(),
                                });
                                console.log(this.state);

                            }}>Send</Button>
                    </ContentBlock>
                    <Popup id="outputPopup" opened={this.state.output.popupVisible} theme="lightblue">
                        <ContentBlock>
                            <p>Vysledek vysel {this.state.output.SimpleForm}. Jedna se o standartni pripad.</p>
                            <p>Instalovana plocha termiky {this.state.output.Termic.installedAreaTermicVzorec} m2</p>
                            <p>Instalovane panely termiky {this.state.output.Termic.installedPanelsTermicVzorec} ks</p>
                            <p>Investice do termickych panelu {this.state.output.Termic.investmentTermicVzorec} kc</p>
                            <p>Uspory diky termice {this.state.output.Termic.savingsTermicVzorec} kc</p>
                            <p><a onClick={() => {
                                this.handleOutput({
                                    popupVisible: false,
                                });
                            }}>Close popup</a></p>
                        </ContentBlock>
                    </Popup>
                </List>
            </Page>
        );
    }
};