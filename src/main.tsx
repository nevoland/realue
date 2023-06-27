import { render } from "preact";

import { App } from "./views/App.tsx";

import "./main.css";

render(<App />, document.getElementById("app") as HTMLElement);
