import React, { useState } from "react";

import { UsernameComponent } from "../username-component/username-component";
import { PasswordComponent } from "../password-component/password-component";
import { LoginOptionsView } from "../options-component/options-component";
import { FieldStatus } from "../../shared/contracts/field-status";
import { SignOptions } from "../../shared/contracts/signup-options";
import { isUsernameOrPasswordValid } from "../../shared/helpers/registration-form-helpers";

type Dictionary<TFields, TValue> = { [TKey in keyof TFields]: TValue };

interface FormFields {
    username: string;
    password: string;
}

interface Props {
    setOption(option: SignOptions): void;
    option: SignOptions;
}
export const LoginFormView = (props: Props): JSX.Element => {
    const [validFields, setValidFields] = useState<Dictionary<UserLoginDto, FieldStatus>>({
        password: FieldStatus.Initialized,
        username: FieldStatus.Initialized
    });
    const [formFields, setFormFields] = useState<UserLoginDto>({
        password: "",
        username: ""
    });
    const [formValid, setFormValid] = useState(false);

    const onFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const fieldName = event.currentTarget.name;
        const fieldValue = event.currentTarget.value;

        const nextValidFields = {
            username: isUsernameOrPasswordValid(formFields.username, 3),
            password: isUsernameOrPasswordValid(formFields.password, 7)
        };

        const newFormFields = formFields;
        newFormFields[fieldName] = fieldValue;

        setFormFields(newFormFields);

        setValidFields(nextValidFields);

        setFormValid(isFormValid(nextValidFields));
    };

    const isFormValid = (nextValidFields: Dictionary<UserLoginDto, FieldStatus>) => {
        return Object.keys(nextValidFields)
            .map(x => nextValidFields[x])
            .every(x => x === FieldStatus.Correct);
    };

    const onFormSubmit: React.MouseEventHandler<HTMLFormElement> = event => {
        event.preventDefault();

        console.info("fields", formFields);
    };

    const getFieldName = (name: keyof FormFields): string => name;

    return (
        <form className="registration-container" onSubmit={onFormSubmit}>
            <LoginOptionsView setOption={props.setOption} option={props.option} />
            <div className="container user-details-container">
                <UsernameComponent
                    onChange={onFieldChange}
                    name={getFieldName("username")}
                    value={formFields.username}
                    fieldStatus={validFields.username}
                />
                <PasswordComponent
                    name={getFieldName("password")}
                    value={formFields.password}
                    onChange={onFieldChange}
                    fieldStatus={validFields.password}
                />
                <div className="tos-button">
                    <div className="tos">
                        <a href="https://passport.twitch.tv/password_resets/new?client_id=kimne78kx3ncx6brgo4mv6wki5h1ko">
                            Trouble logging in?
                        </a>
                    </div>
                    <input
                        className={formValid ? "sign-up enabled" : "sign-up disabled"}
                        type="submit"
                        value="Log In"
                        disabled={!formValid}
                    />
                </div>
            </div>
        </form>
    );
};
