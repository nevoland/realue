import { render } from "../lib/dependencies";

import { App } from "./views/App";

import "./main.css";

render(<App />, document.getElementById("app") as HTMLElement);
