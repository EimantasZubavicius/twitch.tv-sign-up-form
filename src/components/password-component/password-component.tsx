import React, { useState } from "react";
import classNames from "classnames";

import { PasswordProgressBar } from "../password-progress-bar/password-progress-bar";
import { FieldStatus } from "../../shared/contracts/field-status";
import { SignOptions } from "../../shared/contracts/signup-options";
import { FieldError } from "@modules/forms";

interface Props {
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    value: string;
    name: string;
    fieldStatus: FieldStatus;
    option?: SignOptions;
    error?: FieldError;
}

export const PasswordComponent = (props: Props): JSX.Element => {
    const [focused, setFocused] = useState(false);
    const [element, setElement] = useState<HTMLInputElement | null>();

    const onInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        event.persist();
        props.onChange(event);
    };

    const onInputFocus: React.FocusEventHandler<HTMLInputElement> = event => {
        setFocused(true);
    };

    const onInputBlur: React.FocusEventHandler<HTMLInputElement> = event => {
        setFocused(true);
    };

    const changePasswordType = (event: React.MouseEvent<HTMLDivElement>) => {
        if (element != null) {
            if (element.type === "password") {
                element.type = "text";
            } else {
                element.type = "password";
            }
            element.focus();
        }
    };

    const onEyeClick: React.Ref<HTMLInputElement> = el => {
        setElement(el);
    };

    const inputDescription = <div>Strong passwords include a mix of lower case letters, upper case letters, and special characters.</div>;
    const errorMessage = <div className="error-message">{props.error && props.error.message}</div>;
    const isFieldIncorrect = props.fieldStatus === FieldStatus.Incorrect && props.error;

    return (
        <div className="parameter password">
            <div className="password-label-wrapper label-wrapper">
                <div className="password-label label">Password</div>
                {props.option === SignOptions.SignUp ? <PasswordProgressBar password={props.value} /> : null}
            </div>
            <div className="password-container">
                <input
                    type="password"
                    className={classNames("input-field full-width password-input", {
                        wrong: isFieldIncorrect
                    })}
                    onChange={onInputChange}
                    value={props.value}
                    onFocus={onInputFocus}
                    onBlur={onInputBlur}
                    name={props.name}
                    ref={onEyeClick}
                />
                <div className="eye-icon">
                    <div
                        className={
                            element != null && element.type === "password"
                                ? "far fa-eye eye-button"
                                : "far fa-eye-slash eye-button"
                        }
                        onClick={changePasswordType}
                    />
                </div>
            </div>
            {props.option === SignOptions.SignUp ? (
                <div className={classNames("animation-target", { full: focused || isFieldIncorrect })}>
                    <div className={classNames("hidden-text", { nonhidden: focused || isFieldIncorrect })}>
                        {isFieldIncorrect ? errorMessage : inputDescription}
                    </div>
                </div>
            ) : null}
        </div>
    );
};
