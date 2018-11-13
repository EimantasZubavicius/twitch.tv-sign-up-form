import * as React from "react";

import { UsernameComponent } from "../username-component/username-component";
import { PaswordComponent } from "../password-component/password-component";
import { DateComponent } from "../date-component/date-component";
import { EmailComponent } from "../email-component/email-component";

import "./registration-form.scss";

interface State {
  email: string;

  inputFocused: boolean;
  inputDict: Inputs<string>;
  inputErrorDict: Inputs<string>;
}

export class RegistrationFormView extends React.Component<{}, State> {
  public state: State = {
    email: "",
    inputFocused: false,
    inputDict: {},
    inputErrorDict: {}
  };

  private onInputStatusChange = (type: string, status: string) => {
    this.setState(state => {
      {
        state.inputErrorDict[type] = status;
        return state;
      }
    });
  };

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

  public render(): JSX.Element {
    return (
      <div className="registration-container">
        <div className="header">
          <div className="header-icon">ICON</div>
          <div className="header-text">Join This today</div>
        </div>
        <ul className="container-options">
          <li className="container-option unselected">Log In</li>
          <li className="container-option selected">Sign Up</li>
        </ul>
        <div className="container user-details-container">
          <UsernameComponent
            onInputBlur={this.onInputBlur}
            onInputFocus={this.onInputFocus}
            onInputStatusChange={this.onInputStatusChange}
            inputDict={this.state.inputDict}
            inputErrorDict={this.state.inputErrorDict}
          />
          <PaswordComponent
            onInputBlur={this.onInputBlur}
            onInputFocus={this.onInputFocus}
            onInputStatusChange={this.onInputStatusChange}
            inputDict={this.state.inputDict}
            inputErrorDict={this.state.inputErrorDict}
          />
          <DateComponent
            onInputBlur={this.onInputBlur}
            onInputFocus={this.onInputFocus}
            onInputStatusChange={this.onInputStatusChange}
            inputDict={this.state.inputDict}
            inputErrorDict={this.state.inputErrorDict}
          />
          <EmailComponent
            onInputBlur={this.onInputBlur}
            onInputFocus={this.onInputFocus}
            onInputStatusChange={this.onInputStatusChange}
            inputDict={this.state.inputDict}
            inputErrorDict={this.state.inputErrorDict}
          />
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
