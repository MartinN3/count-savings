import React from 'react';

class SimpleForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            input: {
                email: "",
                name: ""
            },
            blurred: {
                email: false,
                name: false
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

    handleBlur(fieldName) {
        this.setState(state => ({
            ...state,
            blurred: {
                ...state.blurred,
                [fieldName]: true
            }
        }))
    }


    validate() {
        const errors = {};
        const {input} = this.state;

        if (!input.email) {
            errors.email = 'Email is required';
        }

        if (!input.name) {
            errors.name = 'Name is required';
        }

        return {
            errors,
            isValid: Object.keys(errors).length === 0
        };
    }

    render() {
        const {input, blurred} = this.state;
        const {errors, isValid} = this.validate();
        return (
            <form onSubmit={(e) => {e.preventDefault(); console.log(this.state)}}>
                <div>
                    <input
                        name="email"
                        placeholder="email"
                        value={input.email}
                        onBlur={() => this.handleBlur('email')}
                        onChange={e => this.handleInputChange({email: e.target.value})}
                    />
                    {blurred.email && !!errors.email && <span>{errors.email}</span>}
                </div>
                <div>
                    <input
                        name="name"
                        placeholder="name"
                        value={input.name}
                        onBlur={() => this.handleBlur('name')}
                        onChange={e => this.handleInputChange({name: e.target.value})}
                    />
                    {blurred.name && !!errors.name && <span>{errors.name}</span>}
                </div>
                <div>
                    <button type="submit" disabled={!isValid}>
                        Submit
                    </button>
                </div>
            </form>
        );
    }
}

export default SimpleForm;