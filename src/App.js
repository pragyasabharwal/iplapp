import "./App.css";
import Navbar from "./components/Navbar";
import Schedule from "./components/Schedule/Schedule";
import { useState, useEffect } from "react";
import Table from "./components/Table";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState();

  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get(
          "https://gist.githubusercontent.com/hdck007/57650c774d9631c097db855bf110a4b6/raw/58b00de2a8c06831fda2f471e1b635a90208a4be/ipl.json"
        );
        setData(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className="App">
      <Navbar setSearch={setSearch} />
      <Routes>
        <Route path="*" element={<Navigate to="/matches" replace />} />

        <Route
          path="/matches"
          element={<Schedule setData={setData} data={data} search={search} />}
        />
        <Route path="/table" element={<Table data={data} />} />
      </Routes>
    </div>
  );
}

export default App;
