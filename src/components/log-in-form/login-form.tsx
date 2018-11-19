import * as React from "react";

import { UsernameComponent } from "../username-component/username-component";
import { PasswordComponent } from "../password-component/password-component";
import { LoginOptionsView } from "../options-component/options-component";
import { FieldStatus } from "../../shared/contracts/field-status";
import { SignOptions } from "../../shared/contracts/signup-options";
import { isUsernameOrPasswordValid } from "../../shared/helpers/registration-form-helpers";

type Dictionary<TFields, TValue> = { [TKey in keyof TFields]: TValue };

interface FormFields {
    username: string;
    password: string;
}

interface State {
    inputDict: Inputs<string>;
    inputErrorDict: Inputs<string>;
    validFields: Dictionary<UserLoginDto, FieldStatus>;
    formFields: UserLoginDto;
    formValid: boolean;
}

interface Props {
    setOption(option: SignOptions, event: React.MouseEvent<HTMLLIElement>): void;
    option: SignOptions;
}
export class LoginFormView extends React.Component<Props, State> {
    public state: State = {
        inputDict: {},
        inputErrorDict: {},
        validFields: {
            password: FieldStatus.Initialized,
            username: FieldStatus.Initialized
        },
        formFields: {
            password: "",
            username: ""
        },
        formValid: false
    };

    private onFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const fieldName = event.currentTarget.name;
        const fieldValue = event.currentTarget.value;

        this.setState(state => {
            state.formFields[fieldName] = fieldValue;
            return LoginFormView.calculateState(state);
        });
    };

    private static calculateState(state: State): State {
        const nextState: State = {
            ...state,
            validFields: {
                username: isUsernameOrPasswordValid(state.formFields.username, 3),
                password: isUsernameOrPasswordValid(state.formFields.password, 7)
            }
        };

        nextState.formValid = Object.keys(nextState.validFields)
            .map(x => nextState.validFields[x])
            .every(x => x === FieldStatus.Correct);
        return nextState;
    }

    private onFormSubmit: React.MouseEventHandler<HTMLFormElement> = event => {
        event.preventDefault();

        console.info("fields", this.state.formFields);
    };

    private getFieldName(name: keyof FormFields): string {
        return name;
    }

    public render(): JSX.Element {
        return (
            <form className="registration-container" onSubmit={this.onFormSubmit}>
                <LoginOptionsView setOption={this.props.setOption} option={this.props.option} />
                <div className="container user-details-container">
                    <UsernameComponent
                        onChange={this.onFieldChange}
                        name={this.getFieldName("username")}
                        value={this.state.formFields.username}
                        fieldStatus={this.state.validFields.username}
                    />
                    <PasswordComponent
                        name={this.getFieldName("password")}
                        value={this.state.formFields.password}
                        onChange={this.onFieldChange}
                        fieldStatus={this.state.validFields.password}
                    />
                    <div className="tos-button">
                        <div className="tos">
                            <a href="https://passport.twitch.tv/password_resets/new?client_id=kimne78kx3ncx6brgo4mv6wki5h1ko">
                                Trouble logging in?
                            </a>
                        </div>
                        <input
                            className={this.state.formValid ? "sign-up enabled" : "sign-up disabled"}
                            type="submit"
                            value="Log In"
                            disabled={!this.state.formValid}
                        />
                    </div>
                </div>
            </form>
        );
    }
}
