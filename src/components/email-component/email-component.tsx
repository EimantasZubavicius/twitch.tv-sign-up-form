import * as React from "react";

import { hiddenText } from "../../shared/helpers/registration-form-helpers";

interface State {
  email: string;
}

interface Props {
  onInputFocus: React.ChangeEventHandler<HTMLInputElement>;
  onInputBlur: React.ChangeEventHandler<HTMLInputElement>;
  onInputStatusChange(type: string, status: string): void;
  inputDict: Inputs<string>;
  inputErrorDict: Inputs<string>;
}

export class EmailComponent extends React.Component<Props, State> {
  public state: State = {
    email: ""
  };

  private onEmailInput: React.ChangeEventHandler<HTMLInputElement> = event => {
    const pattern = /\S+@\S+\.\S+/;

    this.setState({ email: event.target.value });
    if (pattern.test(this.state.email)) {
      this.props.onInputStatusChange("email", "correct");
    } else {
      this.props.onInputStatusChange("email", "incorrect");
    }
  };

  public render(): JSX.Element {
    return (
      <div className="parameter email">
        <div className="email-label-wrapper label-wrapper">
          <div className="email-label label">Email</div>
          {this.props.inputErrorDict["email"] === "correct" ? (
            <div className="fas fa-check-circle icon strong" />
          ) : null}
        </div>
        <input
          className={
            this.props.inputErrorDict["email"] === "incorrect"
              ? "input-field full-width email-input wrong"
              : "input-field full-width email-input"
          }
          onChange={this.onEmailInput}
          value={this.state.email}
          onFocus={this.props.onInputFocus}
          onBlur={this.props.onInputBlur}
          name="email"
        />
        {hiddenText("email", this.props.inputDict, this.props.inputErrorDict)}
      </div>
    );
  }
}
