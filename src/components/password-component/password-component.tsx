import * as React from "react";

import {
  hiddenText,
  checkPasswordStrength
} from "../../shared/helpers/registration-form-helpers";

interface State {
  password: string;
}

interface Props {
  onInputFocus: React.ChangeEventHandler<HTMLInputElement>;
  onInputBlur: React.ChangeEventHandler<HTMLInputElement>;
  onInputStatusChange(type: string, status: string): void;
  inputDict: Inputs<string>;
  inputErrorDict: Inputs<string>;
}

export class PaswordComponent extends React.Component<Props, State> {
  public state: State = {
    password: ""
  };

  private onPasswordInput: React.ChangeEventHandler<
    HTMLInputElement
  > = event => {
    this.setState({ password: event.target.value });
    if (this.state.password.length < 8) {
      this.props.onInputStatusChange("password", "incorrect");
    } else {
      this.props.onInputStatusChange("password", "correct");
    }
  };

  public render(): JSX.Element {
    return (
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
            this.props.inputErrorDict["password"] === "incorrect"
              ? "input-field full-width password-input wrong"
              : "input-field full-width password-input"
          }
          onChange={this.onPasswordInput}
          value={this.state.password}
          onFocus={this.props.onInputFocus}
          onBlur={this.props.onInputBlur}
          name="password"
        />
        {hiddenText(
          "password",
          this.props.inputDict,
          this.props.inputErrorDict
        )}
      </div>
    );
  }
}
