import "./App.css";
import Datagrid from "./components/DataTable";
import { useFetchData } from "./hooks/useFetchData";

function App() {
  const { items } = useFetchData();

  return (
    <>
      <h1 className="app-title">Cardo AI task</h1>
      <div className="table-wrapper">
        {items.map((item, index) => {
          return <Datagrid key={index} tableData={item} />;
        })}
      </div>
    </>
  );
}

export default App;
