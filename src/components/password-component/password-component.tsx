import * as React from "react";
import classNames from "classnames";

import { PasswordProgressBar } from "../password-progress-bar/password-progress-bar";
import { FieldStatus } from "../../shared/contracts/field-status";
import { SignOptions } from "../../shared/contracts/signup-options";

interface State {
    focused: boolean;
}

interface Props {
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    value: string;
    name: string;
    fieldStatus: FieldStatus;
    option?: SignOptions;
}

export class PasswordComponent extends React.Component<Props, State> {
    public state: State = {
        focused: false
    };

    private onInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        event.persist();
        this.props.onChange(event);
    };

    private onInputFocus: React.FocusEventHandler<HTMLInputElement> = event => {
        this.setState({ focused: true });
    };

    private onInputBlur: React.FocusEventHandler<HTMLInputElement> = event => {
        this.setState({ focused: false });
    };

    private changePasswordType = (event: React.MouseEvent<HTMLDivElement>) => {
        if (this.element != null) {
            if (this.element.type === "password") {
                this.element.type = "text";
            } else {
                this.element.type = "password";
            }
            this.element.focus();
        }
    };

    protected element: HTMLInputElement | null = null;

    protected onEyeClick: React.Ref<HTMLInputElement> = element => {
        this.element = element;
    };

    public render(): JSX.Element {
        const inputDescription = (
            <div>Strong passwords include a mix of lower case letters, upper case letters, and special characters.</div>
        );
        const errorMessage = <div className="error-message">*Passwords must be at least 8 characters long.</div>;

        return (
            <div className="parameter password">
                <div className="password-label-wrapper label-wrapper">
                    <div className="password-label label">Password</div>
                    {this.props.option === SignOptions.SignUp ? <PasswordProgressBar password={this.props.value} /> : null}
                </div>
                <div className="password-container">
                    <input
                        type="password"
                        className={classNames("input-field full-width password-input", {
                            wrong: this.props.fieldStatus === FieldStatus.Incorrect
                        })}
                        onChange={this.onInputChange}
                        value={this.props.value}
                        onFocus={this.onInputFocus}
                        onBlur={this.onInputBlur}
                        name={this.props.name}
                        ref={this.onEyeClick}
                    />
                    <div className="eye-icon">
                        <div
                            className={
                                this.element != null && this.element.type === "password"
                                    ? "far fa-eye eye-button"
                                    : "far fa-eye-slash eye-button"
                            }
                            onClick={this.changePasswordType}
                        />
                    </div>
                </div>
                {this.props.option === SignOptions.SignUp ? (
                    <div className={classNames("animation-target", { full: this.state.focused })}>
                        <div className={classNames("hidden-text", { nonhidden: this.state.focused })}>
                            {this.props.fieldStatus === FieldStatus.Incorrect ? errorMessage : inputDescription}
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}
