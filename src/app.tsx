import React from "react";
import ReactDOM from "react-dom";

import "./shared/styles/main.scss";
import { TwitchForm } from "./components/twitch-form/twitch-form";

export const App = (): JSX.Element => {
  return <TwitchForm />;
};

ReactDOM.render(<App />, document.getElementById("root"));
