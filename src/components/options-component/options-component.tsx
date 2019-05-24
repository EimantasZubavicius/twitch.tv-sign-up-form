import React from "react";
import classNames from "classnames";

import { SignOptions } from "../../shared/contracts/signup-options";

interface Props {
    setOption(option: SignOptions): void;
    option: SignOptions;
}

export const LoginOptionsView = (props: Props): JSX.Element => {
    return (
        <div>
            <div className="header">
                <img src="http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c540.png" className="header-icon" />
                <div className="header-text">Join Twitch today</div>
            </div>
            <ul className="container-options">
                <li
                    className={classNames("container-option", {
                        selected: props.option === SignOptions.LogIn,
                        unselected: props.option === SignOptions.SignUp
                    })}
                    onClick={() => props.setOption(SignOptions.LogIn)}
                >
                    Log In
                </li>
                <li
                    className={classNames("container-option", {
                        selected: props.option === SignOptions.SignUp,
                        unselected: props.option === SignOptions.LogIn
                    })}
                    onClick={() => props.setOption(SignOptions.SignUp)}
                >
                    Sign Up
                </li>
            </ul>
            <div className="container user-details-container" />
        </div>
    );
};
