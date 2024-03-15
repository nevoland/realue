import "preact/debug";
// import { render, options } from "preact";
import { render } from "preact";

// const { unmount } = options;
// options.unmount = (vnode) => {
//   console.log(vnode);
//   unmount?.(vnode);
// };

// options.debounceRendering = (render) => {
//   requestAnimationFrame(render);
// };

import { App } from "./views/App.jsx";

import "./main.css";

render(<App />, document.getElementById("app") as HTMLElement);
