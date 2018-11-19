import * as React from "react";
import classNames from "classnames";

import { SignOptions } from "../../shared/contracts/signup-options";

interface Props {
    setOption(option: SignOptions, event: React.MouseEvent<HTMLLIElement>): void;
    option: SignOptions;
}

export class LoginOptionsView extends React.Component<Props> {
    public render(): JSX.Element {
        return (
            <div>
                <div className="header">
                    <img src="http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c540.png" className="header-icon" />
                    <div className="header-text">Join Twitch today</div>
                </div>
                <ul className="container-options">
                    <li
                        className={classNames("container-option", {
                            selected: this.props.option === SignOptions.LogIn,
                            unselected: this.props.option === SignOptions.SignUp
                        })}
                        onClick={event => this.props.setOption(SignOptions.LogIn, event)}
                    >
                        Log In
                    </li>
                    <li
                        className={classNames("container-option", {
                            selected: this.props.option === SignOptions.SignUp,
                            unselected: this.props.option === SignOptions.LogIn
                        })}
                        onClick={event => this.props.setOption(SignOptions.SignUp, event)}
                    >
                        Sign Up
                    </li>
                </ul>
                <div className="container user-details-container" />
            </div>
        );
    }
}
