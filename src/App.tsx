import "./App.css";
import DataTable from "./components/DataTable";
import { useFetchData } from "./hooks/useFetchData";

function App() {
  const { items } = useFetchData();

  console.log(items, "itemsss");
  return (
    <>
      <h1 className="app-title">Cardo AI task</h1>
      <DataTable />
    </>
  );
}

export default App;
