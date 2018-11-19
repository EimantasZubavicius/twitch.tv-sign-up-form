import * as React from "react";
import * as ReactDOM from "react-dom";

import { TwitchForm } from "./components/twitch-form/twitch-form";

import "./shared/styles/main.scss";

class App extends React.Component {
    public render(): JSX.Element {
        return <TwitchForm />;
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
