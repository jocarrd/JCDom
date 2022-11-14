/** @jsx JCDom */

import { createRoot, JCDom } from "../src";
import { App } from "./App";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App text="prueba" />);
