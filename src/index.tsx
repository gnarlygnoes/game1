import * as React from "react";
import { createRoot } from "react-dom/client";
import { observer } from "mobx-react-lite";

const App = observer(() => {
  return (
    <div>
      <h1>Hi</h1>
    </div>
  );
});

createRoot(document.getElementById("root")!).render(<App />);
