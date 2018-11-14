import * as React from "react";

import { hiddenText } from "../../shared/helpers/registration-form-helpers";

interface State {
  username: string;
}

interface Props {
  onInputFocus: React.ChangeEventHandler<HTMLInputElement>;
  onInputBlur: React.ChangeEventHandler<HTMLInputElement>;
  onInputStatusChange(type: string, status: string): void;
  inputDict: Inputs<string>;
  inputErrorDict: Inputs<string>;
}

export class UsernameComponent extends React.Component<Props, State> {
  public state: State = {
    username: ""
  };

  private onUsernameInput: React.ChangeEventHandler<
    HTMLInputElement
  > = event => {
    this.setState({ username: event.target.value });
    if (event.target.value.length > 3) {
      this.props.onInputStatusChange("username", "correct");
    } else {
      this.props.onInputStatusChange("username", "incorrect");
    }
  };

  public render(): JSX.Element {
    return (
      <div className="parameter username">
        <div className="username-label-wrapper label-wrapper">
          <div className="username-label label">Username</div>
          {this.props.inputErrorDict["username"] === "correct" ? (
            <div className="fas fa-check-circle icon strong" />
          ) : null}
        </div>
        <input
          className={
            this.props.inputErrorDict["username"] === "incorrect"
              ? "input-field date username-input wrong"
              : "input-field date username-input"
          }
          name="username"
          onChange={this.onUsernameInput}
          value={this.state.username}
          onFocus={this.props.onInputFocus}
          onBlur={this.props.onInputBlur}
        />
        {hiddenText(
          "username",
          this.props.inputDict,
          this.props.inputErrorDict
        )}
      </div>
    );
  }
}
