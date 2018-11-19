import * as React from "react";
import classNames from "classnames";

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

export class UsernameComponent extends React.Component<Props, State> {
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

    public render(): JSX.Element {
        const inputDescription = <div>This is the name people will know you by on this website. You can always change it later.</div>;
        const errorMessage = <div className="error-message">*This username is unavailable.</div>;

        return (
            <div className="parameter username">
                <div className="username-label-wrapper label-wrapper">
                    <div className="username-label label">Username</div>
                    {this.props.option === SignOptions.SignUp ? (
                        this.props.fieldStatus === FieldStatus.Correct ? (
                            <div className="fas fa-check-circle icon strong" />
                        ) : null
                    ) : null}
                </div>
                <input
                    className={classNames("input-field date username-input", { wrong: this.props.fieldStatus === FieldStatus.Incorrect })}
                    name={this.props.name}
                    onChange={this.onInputChange}
                    value={this.props.value}
                    onFocus={this.onInputFocus}
                    onBlur={this.onInputBlur}
                />
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
