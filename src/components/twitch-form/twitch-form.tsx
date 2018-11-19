import * as React from "react";

import { SignOptions } from "../../shared/contracts/signup-options";
import { LoginFormView } from "../log-in-form/login-form";
import { RegistrationFormView } from "../registration-form/registration-form";

import "./twitch-form.scss";

interface State {
    option: SignOptions;
}

export class TwitchForm extends React.Component<{}, State> {
    public state: State = {
        option: SignOptions.LogIn
    };

    private setOption = (option: SignOptions, event: React.MouseEvent<HTMLLIElement>) => {
        this.setState({
            option: option
        });
    };

    public render(): JSX.Element {
        return (
            <div className="twitch-form-container">
                {this.state.option === SignOptions.LogIn ? (
                    <LoginFormView setOption={this.setOption} option={this.state.option} />
                ) : (
                    <RegistrationFormView setOption={this.setOption} option={this.state.option} />
                )}
            </div>
        );
    }
}
