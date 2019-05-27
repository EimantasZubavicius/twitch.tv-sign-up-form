import React, { useState } from "react";
import classNames from "classnames";

import { Months } from "../../shared/contracts/months";
import { FieldStatus } from "../../shared/contracts/field-status";
import { FieldError, FormDate } from "@modules/forms";
import { isMonthValid, isDayValid, isYearValid } from "src/shared/helpers/registration-form-helpers";

interface Props {
    onInputChange: React.ChangeEventHandler<HTMLInputElement>;
    onSelectChange: React.ChangeEventHandler<HTMLSelectElement>;
    value: FormDate;
    dayInputName: string;
    monthInputName: string;
    yearInputName: string;
    fieldStatus: FieldStatus;
    isFormSubmitted: boolean;
    error?: FieldError;
}

export const DateComponent = (props: Props): JSX.Element => {
    const [focused, setFocused] = useState(false);

    const onInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        event.persist();
        props.onInputChange(event);
    };

    const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = event => {
        event.persist();
        props.onSelectChange(event);
    };

    const onFocus = () => {
        setFocused(true);
    };

    const onBlur = () => {
        setFocused(false);
    };

    const renderMonthsOptions = (): JSX.Element[] => {
        const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        return months.map(month => (
            <option key={month} value={month}>
                {Months[month]}
            </option>
        ));
    };

    const errorMessage = <div className="error-message">{props.error && props.error.message}</div>;
    const isFieldIncorrect = props.fieldStatus === FieldStatus.Incorrect && props.error;

    return (
        <div className="parameter date-of-birth">
            <div className="date-label-wrapper label-wrapper">
                <div className="date-of-birth-label label">Date of Birth</div>
            </div>
            <div className="date-wrapper">
                <select
                    onChange={onSelectChange}
                    className={classNames("input-field date month-input", {
                        wrong: isMonthValid(props.value.month) !== FieldStatus.Correct && props.isFormSubmitted
                    })}
                    name={props.monthInputName}
                >
                    <option value="0" hidden>
                        Month
                    </option>
                    {renderMonthsOptions()}
                </select>
                <div className="quarter-width date wrapper">
                    <input
                        className={classNames("input-field date day", {
                            wrong: isDayValid(props.value) !== FieldStatus.Correct && props.isFormSubmitted
                        })}
                        placeholder="Day"
                        onChange={onInputChange}
                        value={props.value.day}
                        name={props.dayInputName}
                        onFocus={onFocus}
                        onBlur={onBlur}
                    />
                </div>
                <div className="day-wrapper quarter-width date wrapper">
                    <input
                        className={classNames("input-field date year", {
                            wrong: isYearValid(props.value.year) !== FieldStatus.Correct && props.isFormSubmitted
                        })}
                        placeholder="Year"
                        onChange={onInputChange}
                        value={props.value.year}
                        name={props.yearInputName}
                        onFocus={onFocus}
                        onBlur={onBlur}
                    />
                </div>
            </div>
            {isFieldIncorrect ? (
                <div className={classNames("animation-target", { full: focused || isFieldIncorrect })}>
                    <div className={classNames("hidden-text", { nonhidden: focused || isFieldIncorrect })}>{errorMessage}</div>
                </div>
            ) : null}
        </div>
    );
};
