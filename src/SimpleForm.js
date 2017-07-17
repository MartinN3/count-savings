import React, {Component} from 'react';
import {Page, Navbar, Popup, ContentBlockTitle, List, ListItem, FormLabel, FormInput, Button, GridCol, GridRow, ContentBlock, ButtonsSegmented} from 'framework7-react';
import { ohrevVodyConstants } from './calc';
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
                popupVisible: false
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
                                console.log(this.state);

                            }}>Send</Button>
                    </ContentBlock>
                    <Popup opened={this.state.output.popupVisible} theme="lightblue">
                        <ContentBlock>
                            <p>Vysledek vysel {this.state.output.SimpleForm}. Jedna se o standartni pripad.</p>
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