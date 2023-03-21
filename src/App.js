import { Route, Routes } from "react-router";
import "./App.css";
import IfCondition from "./page/marksheet/IfCondition";
import MarkSheet from "./page/marksheet/MarkSheet";
import Header from "./header/Header";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/ifcondition" element={<IfCondition />} />
        <Route path="/marksheet" element={<MarkSheet />} />
      </Routes>
    </div>
  );
}

export default App;
