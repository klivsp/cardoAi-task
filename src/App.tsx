import "./App.css";
import Datagrid from "./components/DataTable";
import { useFetchData } from "./hooks/useFetchData";

function App() {
  const { items } = useFetchData();

  return (
    <>
      <div className="header">
        <h1 className="app-title">Cardo AI task</h1>
        <span className="header-button">
          <a href="https://github.com/klivsp" rel="noreferrer" target="_blank">
            Github
          </a>
        </span>
      </div>
      <div className="table-wrapper">
        {items.map((item, index) => {
          return <Datagrid key={index} tableData={item} />;
        })}
      </div>
    </>
  );
}

export default App;
