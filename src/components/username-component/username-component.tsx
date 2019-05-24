import * as React from "react";
import classNames from "classnames";

import { FieldStatus } from "../../shared/contracts/field-status";
import { SignOptions } from "../../shared/contracts/signup-options";

interface Props {
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    value: string;
    name: string;
    fieldStatus: FieldStatus;
    option?: SignOptions;
}

export const UsernameComponent: React.FC<Props> = props => {
    const [focused, setFocused] = React.useState(false);

    const onInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        event.persist();
        props.onChange(event);
    };

    const onInputFocus: React.FocusEventHandler<HTMLInputElement> = event => {
        setFocused(true);
    };

    const onInputBlur: React.FocusEventHandler<HTMLInputElement> = event => {
        setFocused(false);
    };

    const inputDescription = <div>This is the name people will know you by on this website. You can always change it later.</div>;
    const errorMessage = <div className="error-message">*This username is unavailable.</div>;

    return (
        <div className="parameter username">
            <div className="username-label-wrapper label-wrapper">
                <div className="username-label label">Username</div>
                {props.option === SignOptions.SignUp ? (
                    props.fieldStatus === FieldStatus.Correct ? (
                        <div className="fas fa-check-circle icon strong" />
                    ) : null
                ) : null}
            </div>
            <input
                className={classNames("input-field date username-input", { wrong: props.fieldStatus === FieldStatus.Incorrect })}
                name={props.name}
                onChange={onInputChange}
                value={props.value}
                onFocus={onInputFocus}
                onBlur={onInputBlur}
            />
            {props.option === SignOptions.SignUp ? (
                <div className={classNames("animation-target", { full: focused })}>
                    <div className={classNames("hidden-text", { nonhidden: focused })}>
                        {props.fieldStatus === FieldStatus.Incorrect ? errorMessage : inputDescription}
                    </div>
                </div>
            ) : null}
        </div>
    );
};
