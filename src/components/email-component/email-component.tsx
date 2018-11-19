import * as React from "react";
import classNames from "classnames";

import { FieldStatus } from "../../shared/contracts/field-status";

interface State {
    focused: boolean;
}

interface Props {
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    value: string;
    name: string;
    fieldStatus: FieldStatus;
}

export class EmailComponent extends React.Component<Props, State> {
    public state: State = {
        focused: false
    };

    private onEmailInput: React.ChangeEventHandler<HTMLInputElement> = event => {
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
        const inputDescription = <div>You'll need to verify that you own this email account.</div>;
        const errorMessage = <div className="error-message">*Please enter a valid email.</div>;

        return (
            <div className="parameter email">
                <div className="email-label-wrapper label-wrapper">
                    <div className="email-label label">Email</div>
                    {this.props.fieldStatus === FieldStatus.Correct ? <div className="fas fa-check-circle icon strong" /> : null}
                </div>
                <input
                    className={classNames("input-field full-width email-input", {
                        wrong: this.props.fieldStatus === FieldStatus.Incorrect
                    })}
                    onChange={this.onEmailInput}
                    value={this.props.value}
                    onFocus={this.onInputFocus}
                    onBlur={this.onInputBlur}
                    name={this.props.name}
                />
                <div className={classNames("animation-target", { full: this.state.focused })}>
                    <div className={classNames("hidden-text", { nonhidden: this.state.focused })}>
                        {this.props.fieldStatus === FieldStatus.Incorrect ? errorMessage : inputDescription}
                    </div>
                </div>
            </div>
        );
    }
}
