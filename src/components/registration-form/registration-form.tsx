import * as React from "react";

import { Months } from "../../shared/contracts/months";
import { checkPasswordStrength, hiddenText, isDateCorrect } from "../../shared/helpers/registration-form-helpers";

import "./registration-form.scss";

interface State {
  username: string;
  password: string;
  email: string;
  day: string;
  month: number;
  year: string;
  inputFocused: boolean;
  inputDict: Inputs<string>;
  inputErrorDict: Inputs<string>;
}

export class RegistrationFormView extends React.Component<{}, State> {
  public state: State = {
    username: "",
    password: "",
    email: "",
    day: "",
    month: 0,
    year: "",
    inputFocused: false,
    inputDict: {},
    inputErrorDict: {}
  };

  private setMonth: React.ChangeEventHandler<HTMLSelectElement> = event => {
    const month = parseInt(event.target.value);
    const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const year = parseInt(this.state.year);

    this.setState({
      month: month
    });

    if (month === 0 || month > 12) {
      this.onInputStatusChange("month", "incorrect");
    } else {
      this.onInputStatusChange("month", "correct");
    }

    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
      monthLength[1] = 29;
    }

    if (monthLength[month - 1] < parseInt(this.state.day)) {
      this.onInputStatusChange("day", "incorrect");
    } else {
      this.onInputStatusChange("day", "correct");
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
      if (year < 1903 || year > 2018) {
        this.onInputStatusChange("year", "incorrect");
      } else {
        this.onInputStatusChange("year", "correct");
      }

      if (monthLength[month - 1] < day || day < 1) {
        this.onInputStatusChange("day", "incorrect");
      } else {
        this.onInputStatusChange("day", "correct");
      }
    } else if (type === "day") {
      this.setState({
        day: event.target.value
      });

      if (monthLength[month - 1] < day || day < 1) {
        this.onInputStatusChange("day", "incorrect");
      } else {
        this.onInputStatusChange("day", "correct");
      }
    }
  }

  private onPasswordInput: React.ChangeEventHandler<
    HTMLInputElement
  > = event => {
    this.setState({ password: event.target.value });
    if (this.state.password.length < 8) {
      this.onInputStatusChange("password", "incorrect");
    } else {
      this.onInputStatusChange("password", "correct");
    }
  };

  private onUsernameInput: React.ChangeEventHandler<
    HTMLInputElement
  > = event => {
    this.setState({ username: event.target.value });
    if (event.target.value.length > 3) {
      this.onInputStatusChange("username", "correct");
    } else {
      this.onInputStatusChange("username", "incorrect");
    }
  };

  private onEmailInput: React.ChangeEventHandler<HTMLInputElement> = event => {
    const pattern = /\S+@\S+\.\S+/;

    this.setState({ email: event.target.value });
    if (pattern.test(this.state.email)) {
      this.onInputStatusChange("email", "correct");
    } else {
      this.onInputStatusChange("email", "incorrect");
    }
  };

  private onInputStatusChange(type: string, status: string): void {
    this.setState(state => {
      {
        state.inputErrorDict[type] = status;
        return state;
      }
    });
  }

  private onInputFocus: React.ChangeEventHandler<HTMLInputElement> = event => {
    const name = event.target.name;
    this.setState(state => {
      {
        state.inputDict[name] = "focused";
        return state;
      }
    });
  };

  private onInputBlur: React.ChangeEventHandler<HTMLInputElement> = event => {
    const name = event.target.name;
    this.setState(state => {
      {
        state.inputDict[name] = "blured";
        return state;
      }
    });
  };

  private whichDateIncorrect(): JSX.Element {
    if (this.state.inputErrorDict["day"] === "incorrect") {
      return hiddenText("day", this.state.inputDict, this.state.inputErrorDict);
    } else if (this.state.inputErrorDict["month"] === "incorrect") {
      return hiddenText(
        "month",
        this.state.inputDict,
        this.state.inputErrorDict
      );
    } else if (this.state.inputErrorDict["year"] === "incorrect") {
      return hiddenText(
        "year",
        this.state.inputDict,
        this.state.inputErrorDict
      );
    }
  }

  public render(): JSX.Element {
    return (
      <div className="registration-container">
        <div className="header">
          <div className="header-icon">ICON</div>
          <div className="header-text">Join This today</div>
        </div>
        <div className="container-options">
          <div className="container-option unselected">Log In</div>
          <div className="container-option selected">Sign Up</div>
        </div>
        <div className="container user-details-container">
          <div className="parameter username">
            <div className="username-label-wrapper label-wrapper">
              <div className="username-label label">Username</div>
              {this.state.inputErrorDict["username"] === "correct" ? (
                <div className="fas fa-check-circle icon strong" />
              ) : null}
            </div>
            <input
              className="input-field full-width username-input"
              name="username"
              onChange={this.onUsernameInput}
              value={this.state.username}
              onFocus={this.onInputFocus}
              onBlur={this.onInputBlur}
            />
            {hiddenText(
              "username",
              this.state.inputDict,
              this.state.inputErrorDict
            )}
          </div>
          <div className="parameter password">
            <div className="password-label-wrapper label-wrapper">
              <div className="password-label label">Password</div>
              {checkPasswordStrength(
                this.state.password.length,
                this.state.password
              )}
            </div>
            <input
              type="password"
              className={
                this.state.inputErrorDict["password"] === "incorrect"
                  ? "input-field full-width password-input wrong"
                  : "input-field full-width password-input"
              }
              onChange={this.onPasswordInput}
              value={this.state.password}
              onFocus={this.onInputFocus}
              onBlur={this.onInputBlur}
              name="password"
            />
            {hiddenText(
              "password",
              this.state.inputDict,
              this.state.inputErrorDict
            )}
          </div>
          <div className="parameter date-of-birth">
            <div className="date-label-wrapper label-wrapper">
              <div className="date-of-birth-label label">Date of Birth</div>
              {isDateCorrect(this.state.inputErrorDict) ? (
                <div className="fas fa-check-circle icon strong" />
              ) : null}
            </div>
            <div className="date-wrapper">
              <select
                onChange={this.setMonth}
                className={
                  this.state.inputErrorDict["month"] === "incorrect"
                    ? "input-field date username-input wrong"
                    : "input-field date username-input"
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
                    this.state.inputErrorDict["day"] === "incorrect"
                      ? "input-field day wrong"
                      : "input-field day"
                  }
                  placeholder="Day"
                  onChange={event => this.setYearOrDay(event, "day")}
                  value={this.state.day}
                  name="day"
                  onFocus={this.onInputFocus}
                  onBlur={this.onInputBlur}
                />
              </div>
              <div className="day-wrapper quarter-width date wrapper">
                <input
                  className={
                    this.state.inputErrorDict["year"] === "incorrect"
                      ? "input-field year wrong"
                      : "input-field year"
                  }
                  placeholder="Year"
                  onChange={event => this.setYearOrDay(event, "year")}
                  value={this.state.year}
                  name="year"
                  onFocus={this.onInputFocus}
                  onBlur={this.onInputBlur}
                />
              </div>
            </div>
            {this.whichDateIncorrect()}
          </div>
          <div className="parameter email">
            <div className="email-label-wrapper label-wrapper">
              <div className="email-label label">Email</div>
              {this.state.inputErrorDict["email"] === "correct" ? (
                <div className="fas fa-check-circle icon strong" />
              ) : null}
            </div>
            <input
              className={
                this.state.inputErrorDict["email"] === "incorrect"
                  ? "input-field full-width email-input wrong"
                  : "input-field full-width email-input"
              }
              onChange={this.onEmailInput}
              value={this.state.email}
              onFocus={this.onInputFocus}
              onBlur={this.onInputBlur}
              name="email"
            />
            {hiddenText(
              "email",
              this.state.inputDict,
              this.state.inputErrorDict
            )}
          </div>
        </div>
        <div className="tos-button">
          <div className="tos">
            By clicking Sign Up, you are indicating that you have read and agree
            to the Terms of Service and Privacy Policy.
          </div>
          <button className="sign-up">Sign Up</button>
        </div>
      </div>
    );
  }
}
