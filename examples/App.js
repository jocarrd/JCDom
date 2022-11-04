/** @jsx JCDom */
import { JCDom } from "../src";

export function App({ text }) {
  return (
    <div>
      <button onClick={() => console.log("Prueba de Event Handler")}>
        {text}
      </button>
    </div>
  );
}
