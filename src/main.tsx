import { render } from "preact";

import { App } from "./views/App";

import "./main.css";

render(<App />, document.getElementById("app") as HTMLElement);
