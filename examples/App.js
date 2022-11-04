/** @jsx JCDom */
import { JCDom } from "../src";

export function App({ text }) {
  return (
    <div>
      <button onClick={() => console.log("Prueba Event Handler")}>
        {text}
      </button>
    </div>
  );
}
