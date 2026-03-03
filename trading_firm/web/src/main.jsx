import { createRoot } from "react-dom/client";

import { App } from "./App";

const mountNode = document.getElementById("appRoot");
if (!mountNode) {
  throw new Error("appRoot element not found");
}

createRoot(mountNode).render(<App />);
