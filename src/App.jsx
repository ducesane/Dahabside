import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "@/components/ui/button";

import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-yellow-500 p-16">
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
