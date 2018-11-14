import * as React from "react";

import {
  hiddenText,
  isDateCorrect
} from "../../shared/helpers/registration-form-helpers";
import { Months } from "../../shared/contracts/months";

interface State {
  day: string;
  month: number;
  year: string;
}

interface Props {
  onInputFocus: React.ChangeEventHandler<HTMLInputElement>;
  onInputBlur: React.ChangeEventHandler<HTMLInputElement>;
  onInputStatusChange(type: string, status: string): void;
  inputDict: Inputs<string>;
  inputErrorDict: Inputs<string>;
}

export class DateComponent extends React.Component<Props, State> {
  public state: State = {
    day: "",
    month: 0,
    year: ""
  };

  private setMonth: React.ChangeEventHandler<HTMLSelectElement> = event => {
    const month = parseInt(event.target.value);
    const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const year = parseInt(this.state.year);

    this.setState({
      month: month
    });

    if (month === 0 || month > 12) {
      this.props.onInputStatusChange("month", "incorrect");
    } else {
      this.props.onInputStatusChange("month", "correct");
    }

    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
      monthLength[1] = 29;
    }

    if (this.state.day !== "" && monthLength[month - 1] < parseInt(this.state.day)) {
      this.props.onInputStatusChange("day", "incorrect");
    } else {
      this.props.onInputStatusChange("day", "correct");
    }
  };

  private setYearOrDay(
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ): void {
    let year;
    let day;

    if (type === "year") {
      year = parseInt(event.target.value);
      day = parseInt(this.state.day);
    } else {
      year = parseInt(this.state.year);
      day = parseInt(event.target.value);
    }
    const month = this.state.month;
    const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
      monthLength[1] = 29;
    }

    if (type === "year") {
      this.setState({
        year: event.target.value
      });

      if (year < 1903 || year > 2018 || isNaN(year)) {
        this.props.onInputStatusChange("year", "incorrect");
      } else {
        this.props.onInputStatusChange("year", "correct");
      }

      if (monthLength[month - 1] < day || day < 1) {
        this.props.onInputStatusChange("day", "incorrect");
      } else {
        this.props.onInputStatusChange("day", "correct");
      }
    } else if (type === "day") {
      this.setState({
        day: event.target.value
      });

      if (monthLength[month - 1] < day || day < 1 || isNaN(day)) {
        this.props.onInputStatusChange("day", "incorrect");
      } else {
        this.props.onInputStatusChange("day", "correct");
      }
    }
  }

  private whichDateIncorrect(): JSX.Element {
    if (this.props.inputErrorDict["day"] === "incorrect") {
      return hiddenText("day", this.props.inputDict, this.props.inputErrorDict);
    } else if (this.props.inputErrorDict["month"] === "incorrect") {
      return hiddenText(
        "month",
        this.props.inputDict,
        this.props.inputErrorDict
      );
    } else if (this.props.inputErrorDict["year"] === "incorrect") {
      return hiddenText(
        "year",
        this.props.inputDict,
        this.props.inputErrorDict
      );
    }
  }

  public render(): JSX.Element {
    return (
      <div className="parameter date-of-birth">
        <div className="date-label-wrapper label-wrapper">
          <div className="date-of-birth-label label">Date of Birth</div>
          {isDateCorrect(this.props.inputErrorDict) ? (
            <div className="fas fa-check-circle icon strong" />
          ) : null}
        </div>
        <div className="date-wrapper">
          <select
            onChange={this.setMonth}
            className={
              this.props.inputErrorDict["month"] === "incorrect"
                ? "input-field date month-input wrong"
                : "input-field date month-input"
            }
          >
            <option value="0" hidden>
              Month
            </option>
            <option value="1">{Months[1]}</option>
            <option value="2">{Months[2]}</option>
            <option value="3">{Months[3]}</option>
            <option value="4">{Months[4]}</option>
            <option value="5">{Months[5]}</option>
            <option value="6">{Months[6]}</option>
            <option value="7">{Months[7]}</option>
            <option value="8">{Months[8]}</option>
            <option value="9">{Months[9]}</option>
            <option value="10">{Months[10]}</option>
            <option value="11">{Months[11]}</option>
            <option value="12">{Months[12]}</option>
          </select>
          <div className="quarter-width date wrapper">
            <input
              className={
                this.props.inputErrorDict["day"] === "incorrect"
                  ? "input-field day wrong"
                  : "input-field day"
              }
              placeholder="Day"
              onChange={event => this.setYearOrDay(event, "day")}
              value={this.state.day}
              name="day"
              onFocus={this.props.onInputFocus}
              onBlur={this.props.onInputBlur}
            />
          </div>
          <div className="day-wrapper quarter-width date wrapper">
            <input
              className={
                this.props.inputErrorDict["year"] === "incorrect"
                  ? "input-field year wrong"
                  : "input-field year"
              }
              placeholder="Year"
              onChange={event => this.setYearOrDay(event, "year")}
              value={this.state.year}
              name="year"
              onFocus={this.props.onInputFocus}
              onBlur={this.props.onInputBlur}
            />
          </div>
        </div>
        {this.whichDateIncorrect()}
      </div>
    );
  }
}
