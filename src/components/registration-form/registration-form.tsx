import React, { useState } from "react";

import { DateComponent } from "../date-component/date-component";
import { EmailComponent } from "../email-component/email-component";
import { LoginOptionsView } from "../options-component/options-component";
import { UsernameComponent } from "../username-component/username-component";
import { PasswordComponent } from "../password-component/password-component";
import { FieldStatus } from "../../shared/contracts/field-status";
import {
    isMonthValid,
    isDayValid,
    isYearValid,
    isEmailValid,
    isUsernameOrPasswordValid
} from "../../shared/helpers/registration-form-helpers";
import { SignOptions } from "../../shared/contracts/signup-options";
import { useField } from "src/shared/helpers/hooks";

type Dictionary<TFields, TValue> = { [TKey in keyof TFields]: TValue };

interface FormFields {
    username: string;
    password: string;
    day: string;
    month: string;
    year: string;
    email: string;
}

interface Props {
    setOption(option: SignOptions): void;
    option: SignOptions;
}

export const RegistrationFormView = (props: Props): JSX.Element => {
    const [validFields, setValidFields] = useState<Dictionary<UserDto, FieldStatus>>({
        day: FieldStatus.Initialized,
        month: FieldStatus.Initialized,
        year: FieldStatus.Initialized,
        email: FieldStatus.Initialized,
        password: FieldStatus.Initialized,
        username: FieldStatus.Initialized
    });
    const [formFields, setFormFields] = useState<UserDto>({
        day: "",
        month: "0",
        year: "",
        email: "",
        password: "",
        username: ""
    });
    const [formValid, setFormValid] = useState(false);
    const [hookedUsername, setHookedUsername] = useField<string>("", (value: string) => {
        if (value.length < 4) {
            return {
                message: "Cannot be below 4 characters."
            };
        }

        return undefined;
    });

    const onFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const fieldName = event.currentTarget.name;
        const fieldValue = event.currentTarget.value;

        const newFormFields = formFields;
        newFormFields[fieldName] = fieldValue;

        setFormFields(newFormFields);

        const nextValidFields: Dictionary<UserDto, FieldStatus> = {
            username: isUsernameOrPasswordValid(formFields.username, 3),
            password: isUsernameOrPasswordValid(formFields.password, 7),
            month: isMonthValid(formFields.month),
            day: isDayValid(formFields.day, formFields.month, formFields.year),
            year: isYearValid(formFields.year),
            email: isEmailValid(formFields.email)
        };

        setValidFields(nextValidFields);

        setFormValid(
            Object.keys(nextValidFields)
                .map(x => nextValidFields[x])
                .every(x => x === FieldStatus.Correct)
        );
    };

    const onHookedUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        setHookedUsername({ value: value });
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
                    option={props.option}
                />
                <UsernameComponent
                    name="hooked-username"
                    value={hookedUsername.value}
                    onChange={onHookedUsernameChange}
                    fieldStatus={hookedUsername.error ? FieldStatus.Incorrect : FieldStatus.Initialized}
                    error={hookedUsername.error}
                    option={props.option}
                />
                <PasswordComponent
                    name={getFieldName("password")}
                    value={formFields.password}
                    onChange={onFieldChange}
                    fieldStatus={validFields.password}
                    option={props.option}
                />
                <DateComponent
                    onInputChange={onFieldChange}
                    onSelectChange={onFieldChange}
                    dayInputName={getFieldName("day")}
                    monthInputName={getFieldName("month")}
                    yearInputName={getFieldName("year")}
                    dayValue={formFields.day}
                    monthValue={formFields.month}
                    yearValue={formFields.year}
                    dayFieldStatus={validFields.day}
                    monthFieldStatus={validFields.month}
                    yearFieldStatus={validFields.year}
                />
                <EmailComponent
                    name={getFieldName("email")}
                    value={formFields.email}
                    onChange={onFieldChange}
                    fieldStatus={validFields.email}
                />
                <div className="tos-button">
                    <div className="tos">
                        By clicking Sign Up, you are indicating that you have read and agree to the
                        <a href="https://www.twitch.tv/p/legal/terms-of-service/">Terms of Service</a>
                        and
                        <a href="https://www.twitch.tv/p/legal/privacy-policy/">Privacy Policy.</a>
                    </div>
                    <input
                        className={formValid ? "sign-up enabled" : "sign-up disabled"}
                        type="submit"
                        value="Sign Up"
                        disabled={!formValid}
                    />
                </div>
            </div>
        </form>
    );
};
