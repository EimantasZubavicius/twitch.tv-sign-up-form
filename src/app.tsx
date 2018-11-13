import * as React from "react";
import * as ReactDOM from "react-dom";

import { RegistrationFormView } from "./components/registration-form/registration-form";

import "./shared/styles/main.scss";

class App extends React.Component {
  public render(): JSX.Element {
    return <RegistrationFormView />;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
