import * as React from "react";
import classNames from "classnames";

import { Months } from "../../shared/contracts/months";
import { FieldStatus } from "../../shared/contracts/field-status";

interface State {
    focused: boolean;
}

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

export class DateComponent extends React.Component<Props, State> {
    public state: State = {
        focused: false
    };

    private onInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        event.persist();
        this.props.onInputChange(event);
    };

    private onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = event => {
        event.persist();
        this.props.onSelectChange(event);
    };

    private onFocus = () => {
        this.setState({ focused: true });
    };

    private onBlur = () => {
        this.setState({ focused: false });
    };

    private renderMonthsOptions(): JSX.Element[] {
        const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        return months.map(month => (
            <option key={month} value={month}>
                {Months[month]}
            </option>
        ));
    }

    public render(): JSX.Element {
        const errorMessage = <div className="error-message">*Please enter a valid date.</div>;

        return (
            <div className="parameter date-of-birth">
                <div className="date-label-wrapper label-wrapper">
                    <div className="date-of-birth-label label">Date of Birth</div>
                </div>
                <div className="date-wrapper">
                    <select
                        onChange={this.onSelectChange}
                        className={classNames("input-field date month-input", {
                            wrong: this.props.monthFieldStatus === FieldStatus.Incorrect
                        })}
                        name={this.props.monthInputName}
                    >
                        <option value="0" hidden>
                            Month
                        </option>
                        {this.renderMonthsOptions()}
                    </select>
                    <div className="quarter-width date wrapper">
                        <input
                            className={classNames("input-field date day", { wrong: this.props.dayFieldStatus === FieldStatus.Incorrect })}
                            placeholder="Day"
                            onChange={this.onInputChange}
                            value={this.props.dayValue}
                            name={this.props.dayInputName}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                        />
                    </div>
                    <div className="day-wrapper quarter-width date wrapper">
                        <input
                            className={classNames("input-field date year", {
                                wrong: this.props.yearFieldStatus === FieldStatus.Incorrect
                            })}
                            placeholder="Year"
                            onChange={this.onInputChange}
                            value={this.props.yearValue}
                            name={this.props.yearInputName}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                        />
                    </div>
                </div>
                {this.props.dayFieldStatus === FieldStatus.Incorrect ||
                this.props.monthFieldStatus === FieldStatus.Incorrect ||
                this.props.yearFieldStatus === FieldStatus.Incorrect ? (
                    <div className={classNames("animation-target", { full: this.state.focused })}>
                        <div className={classNames("hidden-text", { nonhidden: this.state.focused })}>{errorMessage}</div>
                    </div>
                ) : null}
            </div>
        );
    }
}
