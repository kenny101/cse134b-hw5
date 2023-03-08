import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <button onClick={() => setCount((count) => count + 1)}>
      Times Clicked: {count}
      </button>
    </div>
  );
}

export default App;
