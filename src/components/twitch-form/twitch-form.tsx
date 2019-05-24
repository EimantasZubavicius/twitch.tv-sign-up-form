import React, { useState } from "react";

import { SignOptions } from "../../shared/contracts/signup-options";
import { LoginFormView } from "../log-in-form/login-form";
import { RegistrationFormView } from "../registration-form/registration-form";

import "./twitch-form.scss";

export const TwitchForm = (): JSX.Element => {
    const [option, setOption] = useState<SignOptions>(SignOptions.LogIn);

    const setOptionFn = (newOption: SignOptions) => {
        setOption(newOption);
    };

    return (
        <div className="twitch-form-container">
            {option === SignOptions.LogIn ? (
                <LoginFormView setOption={setOptionFn} option={option} />
            ) : (
                <RegistrationFormView setOption={setOptionFn} option={option} />
            )}
        </div>
    );
};
