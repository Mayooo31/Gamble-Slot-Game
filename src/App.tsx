import { BrowserRouter, Routes, Route } from "react-router-dom";

import Slot from "./pages/Slot";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Slot />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
