import { useEffect, useState } from "react";
import data from "../server/data.json";
import { TableData } from "../@types/data";

export function useFetchData() {
  const [items, setItems] = useState<TableData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setItems(data as TableData[]);
    setLoading(false);
  }, []);

  return { items, loading };
}
