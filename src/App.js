import { Route, Routes } from "react-router";
import "./App.css";
import IfCondition from "./page/marksheet/IfCondition";
import MarkSheet from "./page/marksheet/MarkSheet";
import Header from "./header/Header";
import List from './listing/list';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/ifcondition" element={<IfCondition />} />
        <Route path="/marksheet" element={<MarkSheet />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </div>
  );
}

export default App;
