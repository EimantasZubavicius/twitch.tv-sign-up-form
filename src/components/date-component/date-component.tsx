import React, { useState } from "react";
import classNames from "classnames";

import { Months } from "../../shared/contracts/months";
import { FieldStatus } from "../../shared/contracts/field-status";

interface Props {
    onInputChange: React.ChangeEventHandler<HTMLInputElement>;
    onSelectChange: React.ChangeEventHandler<HTMLSelectElement>;
    dayFieldStatus: FieldStatus;
    monthFieldStatus: FieldStatus;
    yearFieldStatus: FieldStatus;
    dayValue: string;
    monthValue: string;
    yearValue: string;
    dayInputName: string;
    monthInputName: string;
    yearInputName: string;
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

    const errorMessage = <div className="error-message">*Please enter a valid date.</div>;

    return (
        <div className="parameter date-of-birth">
            <div className="date-label-wrapper label-wrapper">
                <div className="date-of-birth-label label">Date of Birth</div>
            </div>
            <div className="date-wrapper">
                <select
                    onChange={onSelectChange}
                    className={classNames("input-field date month-input", {
                        wrong: props.monthFieldStatus === FieldStatus.Incorrect
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
                        className={classNames("input-field date day", { wrong: props.dayFieldStatus === FieldStatus.Incorrect })}
                        placeholder="Day"
                        onChange={onInputChange}
                        value={props.dayValue}
                        name={props.dayInputName}
                        onFocus={onFocus}
                        onBlur={onBlur}
                    />
                </div>
                <div className="day-wrapper quarter-width date wrapper">
                    <input
                        className={classNames("input-field date year", {
                            wrong: props.yearFieldStatus === FieldStatus.Incorrect
                        })}
                        placeholder="Year"
                        onChange={onInputChange}
                        value={props.yearValue}
                        name={props.yearInputName}
                        onFocus={onFocus}
                        onBlur={onBlur}
                    />
                </div>
            </div>
            {props.dayFieldStatus === FieldStatus.Incorrect ||
            props.monthFieldStatus === FieldStatus.Incorrect ||
            props.yearFieldStatus === FieldStatus.Incorrect ? (
                <div className={classNames("animation-target", { full: focused })}>
                    <div className={classNames("hidden-text", { nonhidden: focused })}>{errorMessage}</div>
                </div>
            ) : null}
        </div>
    );
};
