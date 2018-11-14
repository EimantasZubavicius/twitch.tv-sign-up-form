import * as React from "react";

import { hiddenText } from "../../shared/helpers/registration-form-helpers";

interface State {
  username: string;
  inputFocused: boolean;
}

interface Props {
  inputErrorDict: Inputs<string>;
}

export class SubmitComponent extends React.Component<Props, State> {
  private checkInputValidations(): boolean {
    if (Object.keys(this.props.inputErrorDict).length === 6) {
      return Object.keys(this.props.inputErrorDict)
        .map(key => this.props.inputErrorDict[key])
        .every(input => input === "correct");
    } else {
      return false;
    }
  }

  public render(): JSX.Element {
    return (
      <div className="tos-button">
        <div className="tos">
          By clicking Sign Up, you are indicating that you have read and agree
          to the
          <a href="https://www.twitch.tv/p/legal/terms-of-service/">
            Terms of Service
          </a>
          and
          <a href="https://www.twitch.tv/p/legal/privacy-policy/">
            Privacy Policy.
          </a>
        </div>
        <button
          className={
            this.checkInputValidations()
              ? "sign-up enabled"
              : "sign-up disabled"
          }
        >
          Sign Up
        </button>
      </div>
    );
  }
}
