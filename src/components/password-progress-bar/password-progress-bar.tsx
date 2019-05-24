import React, { useEffect, useState } from "react";
import classNames from "classnames";

import { PasswordStrength } from "../../shared/contracts/password-strength";
import { getPasswordStrength } from "../../shared/helpers/registration-form-helpers";

interface Props {
    password: string;
}

export const PasswordProgressBar = (props: Props): JSX.Element => {
    const [passwordStrength, setPasswordStrength] = useState(PasswordStrength.Empty);

    const renderProgressBarText = (): string => {
        switch (passwordStrength) {
            case PasswordStrength.Weak: {
                return "Weak";
            }

            case PasswordStrength.VeryWeak: {
                return "Very weak";
            }

            case PasswordStrength.Strong: {
                return "Strong";
            }

            case PasswordStrength.VeryStrong: {
                return "Very strong";
            }

            default: {
                return "";
            }
        }
    };

    useEffect(() => {
        setPasswordStrength(getPasswordStrength(props.password));
    }, [props.password]);

    return (
        <div
            className={classNames("bar-wrapper", {
                weak: passwordStrength === PasswordStrength.Weak || passwordStrength === PasswordStrength.VeryWeak,
                strong: passwordStrength === PasswordStrength.Strong || passwordStrength === PasswordStrength.VeryStrong,
                bad: passwordStrength === PasswordStrength.Bad,
                empty: passwordStrength === PasswordStrength.Empty
            })}
        >
            {passwordStrength === PasswordStrength.Empty ? null : (
                <div
                    className={classNames("fas icon", {
                        "fa-check-circle": passwordStrength === PasswordStrength.Strong || passwordStrength === PasswordStrength.VeryStrong,
                        "fa-exclamation-triangle":
                            passwordStrength === PasswordStrength.Weak || passwordStrength === PasswordStrength.VeryWeak,
                        "fa-times-circle": passwordStrength === PasswordStrength.Bad
                    })}
                />
            )}
            <div className="level">{renderProgressBarText()}</div>
            <div className="progress-bar">
                <div
                    className={classNames("filler", {
                        "very-weak": passwordStrength === PasswordStrength.VeryWeak,
                        weak: passwordStrength === PasswordStrength.Weak,
                        strong: passwordStrength === PasswordStrength.Strong,
                        "very-strong": passwordStrength === PasswordStrength.VeryStrong,
                        bad: passwordStrength === PasswordStrength.Bad,
                        empty: passwordStrength === PasswordStrength.Empty
                    })}
                />
            </div>
        </div>
    );
};
