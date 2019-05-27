import React, { useState } from "react";

import { useField, useForm, FormDate } from "@modules/forms";

import { DateComponent } from "../date-component/date-component";
import { EmailComponent } from "../email-component/email-component";
import { LoginOptionsView } from "../options-component/options-component";
import { UsernameComponent } from "../username-component/username-component";
import { PasswordComponent } from "../password-component/password-component";
import { FieldStatus } from "../../shared/contracts/field-status";
import { isEmailValid, isUsernameOrPasswordValid, isDateValid } from "../../shared/helpers/registration-form-helpers";
import { SignOptions } from "../../shared/contracts/signup-options";
import classNames from "classnames";
import { UserDto } from "src/shared/contracts/user-dto";

type Dictionary<TFields, TValue> = { [TKey in keyof TFields]: TValue };

interface Props {
    setOption(option: SignOptions): void;
    option: SignOptions;
}

export const RegistrationFormView = (props: Props): JSX.Element => {
    const [validFields, setValidFields] = useState<Dictionary<UserDto, FieldStatus>>({
        date: FieldStatus.Initialized,
        email: FieldStatus.Initialized,
        password: FieldStatus.Initialized,
        username: FieldStatus.Initialized
    });

    const [username, setUsername] = useField<string>("", (value: string) => {
        switch (isUsernameOrPasswordValid(value, 3)) {
            case FieldStatus.Incorrect:
                return {
                    message: "Cannot be below 4 characters."
                };

            case FieldStatus.Initialized:
                return {
                    message: "Cannot be empty."
                };
        }
        if (isUsernameOrPasswordValid(value, 3) === FieldStatus.Incorrect) {
            return {
                message: "Cannot be below 4 characters."
            };
        }
    });

    const [password, setPassword] = useField<string>("", value => {
        switch (isUsernameOrPasswordValid(value, 7)) {
            case FieldStatus.Incorrect:
                return {
                    message: "Cannot be below 8 characters."
                };

            case FieldStatus.Initialized:
                return {
                    message: "Cannot be empty."
                };
        }
    });

    const [email, setEmail] = useField<string>("", value => {
        switch (isEmailValid(value)) {
            case FieldStatus.Initialized:
                return {
                    message: "Cannot be empty."
                };
            case FieldStatus.Incorrect:
                return {
                    message: "Incorrect email entered."
                };
        }
    });

    const [date, setDate] = useField<FormDate>(
        {
            year: "",
            month: "0",
            day: ""
        },
        value => {
            switch (isDateValid(value)) {
                case FieldStatus.Incorrect:
                    return {
                        message: "Incorrect date entered."
                    };

                case FieldStatus.Initialized:
                    return {
                        message: "No date enetered."
                    };
            }
        }
    );

    const fieldSetters: { [key: string]: (value: string) => void } = {
        username: setUsername,
        password: setPassword,
        email: setEmail,
        day: value => setDate({ ...date.value, day: value }),
        month: value => setDate({ ...date.value, month: value }),
        year: value => setDate({ ...date.value, year: value })
    };

    const form = useForm(() => {
        console.info("form", [username, password, email, date]);
        return Promise.resolve({ message: "Big bad error" });
    }, [username, password, email, date]);

    const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const fieldName = event.currentTarget.name;
        const fieldValue = event.currentTarget.value;

        fieldSetters[fieldName](fieldValue);
    };

    const statusWrapper = (status: FieldStatus): FieldStatus => {
        return status === FieldStatus.Initialized ? (form.state.submitClicked ? FieldStatus.Incorrect : FieldStatus.Initialized) : status;
    };

    const onFormSubmit = () => {
        form.resetError();
        const nextValidFields: Dictionary<UserDto, FieldStatus> = {
            username: isUsernameOrPasswordValid(username.value, 3),
            password: isUsernameOrPasswordValid(password.value, 7),
            date: isDateValid(date.value),
            email: isEmailValid(email.value)
        };

        setValidFields(nextValidFields);

        console.info("fields", { username, password, email, date });
        form.submit();
    };

    const getFieldName = (name: keyof UserDto): string => name.toString();

    return (
        <form
            className="registration-container"
            onSubmit={event => {
                event.preventDefault();
                form.submit();
            }}
        >
            <LoginOptionsView setOption={props.setOption} option={props.option} />
            <div className="container user-details-container">
                <UsernameComponent
                    onChange={handleFieldChange}
                    name={getFieldName("username")}
                    value={username.value}
                    error={username.error}
                    fieldStatus={statusWrapper(validFields.username)}
                    option={props.option}
                />
                <PasswordComponent
                    name={getFieldName("password")}
                    value={password.value}
                    onChange={handleFieldChange}
                    fieldStatus={statusWrapper(validFields.password)}
                    option={props.option}
                    error={password.error}
                />
                <DateComponent
                    onInputChange={handleFieldChange}
                    onSelectChange={handleFieldChange}
                    dayInputName={getFieldName("day")}
                    monthInputName={getFieldName("month")}
                    yearInputName={getFieldName("year")}
                    value={date.value}
                    fieldStatus={statusWrapper(validFields.date)}
                    isFormSubmitted={form.state.submitClicked}
                    error={date.error}
                />
                <EmailComponent
                    name={getFieldName("email")}
                    value={email.value}
                    onChange={handleFieldChange}
                    fieldStatus={statusWrapper(validFields.email)}
                    error={email.error}
                />
                <div className="tos-button">
                    <div className="tos">
                        By clicking Sign Up, you are indicating that you have read and agree to the
                        <a href="https://www.twitch.tv/p/legal/terms-of-service/">Terms of Service</a>
                        and
                        <a href="https://www.twitch.tv/p/legal/privacy-policy/">Privacy Policy.</a>
                    </div>
                    <input className="sign-up enabled" type="submit" value="Sign Up" onClick={onFormSubmit} />
                    {form.state.error ? (
                        <div className={classNames("animation-target", { full: true })}>
                            <div className={classNames("hidden-text", { nonhidden: true })}>
                                <div className="error-message">{form.state.error.message}</div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </form>
    );
};
