import * as React from "react";
import classNames from "classnames";

import { PasswordStrength } from "../../shared/contracts/password-strength";
import { getPasswordStrength } from "../../shared/helpers/registration-form-helpers";

interface State {
    passwordStrength: PasswordStrength;
}

interface Props {
    password: string;
}

export class PasswordProgressBar extends React.Component<Props, State> {
    public state: State = {
        passwordStrength: PasswordStrength.Empty
    };

    public static getDerivedStateFromProps(props: Props, state: State): State {
        return { passwordStrength: getPasswordStrength(props.password) };
    }

    private renderProgressBarText(): string {
        switch (this.state.passwordStrength) {
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
    }

    public render(): JSX.Element {
        return (
            <div
                className={classNames("bar-wrapper", {
                    weak:
                        this.state.passwordStrength === PasswordStrength.Weak || this.state.passwordStrength === PasswordStrength.VeryWeak,
                    strong:
                        this.state.passwordStrength === PasswordStrength.Strong ||
                        this.state.passwordStrength === PasswordStrength.VeryStrong,
                    bad: this.state.passwordStrength === PasswordStrength.Bad,
                    empty: this.state.passwordStrength === PasswordStrength.Empty
                })}
            >
                {this.state.passwordStrength === PasswordStrength.Empty ? null : (
                    <div
                        className={classNames("fas icon", {
                            "fa-check-circle":
                                this.state.passwordStrength === PasswordStrength.Strong ||
                                this.state.passwordStrength === PasswordStrength.VeryStrong,
                            "fa-exclamation-triangle":
                                this.state.passwordStrength === PasswordStrength.Weak ||
                                this.state.passwordStrength === PasswordStrength.VeryWeak,
                            "fa-times-circle": this.state.passwordStrength === PasswordStrength.Bad
                        })}
                    />
                )}
                <div className="level">{this.renderProgressBarText()}</div>
                <div className="progress-bar">
                    <div
                        className={classNames("filler", {
                            "very-weak": this.state.passwordStrength === PasswordStrength.VeryWeak,
                            weak: this.state.passwordStrength === PasswordStrength.Weak,
                            strong: this.state.passwordStrength === PasswordStrength.Strong,
                            "very-strong": this.state.passwordStrength === PasswordStrength.VeryStrong,
                            bad: this.state.passwordStrength === PasswordStrength.Bad,
                            empty: this.state.passwordStrength === PasswordStrength.Empty
                        })}
                    />
                </div>
            </div>
        );
    }
}
