import * as React from "react";
import classNames from "classnames";

import { FieldStatus } from "../../shared/contracts/field-status";

interface Props {
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    value: string;
    name: string;
    fieldStatus: FieldStatus;
}

export const EmailComponent: React.FC<Props> = (props: Props) => {
    const [focused, setFocused] = React.useState(false);

    const onEmailInput: React.ChangeEventHandler<HTMLInputElement> = event => {
        event.persist();
        props.onChange(event);
    };

    const onInputFocus: React.FocusEventHandler<HTMLInputElement> = event => {
        setFocused(true);
    };

    const onInputBlur: React.FocusEventHandler<HTMLInputElement> = event => {
        setFocused(false);
    };

    const inputDescription = <div>You'll need to verify that you own this email account.</div>;
    const errorMessage = <div className="error-message">*Please enter a valid email.</div>;

    return (
        <div className="parameter email">
            <div className="email-label-wrapper label-wrapper">
                <div className="email-label label">Email</div>
                {props.fieldStatus === FieldStatus.Correct ? <div className="fas fa-check-circle icon strong" /> : null}
            </div>
            <input
                className={classNames("input-field full-width email-input", {
                    wrong: props.fieldStatus === FieldStatus.Incorrect
                })}
                onChange={onEmailInput}
                value={props.value}
                onFocus={onInputFocus}
                onBlur={onInputBlur}
                name={props.name}
            />
            <div className={classNames("animation-target", { full: focused })}>
                <div className={classNames("hidden-text", { nonhidden: focused })}>
                    {props.fieldStatus === FieldStatus.Incorrect ? errorMessage : inputDescription}
                </div>
            </div>
        </div>
    );
};
