import {EditorView} from "./components.js";
import ReactDOM from 'react-dom/client';




export function initEditorView() {
  const root = ReactDOM.createRoot(document.querySelector('body'));
  root.render(<EditorView />);
}