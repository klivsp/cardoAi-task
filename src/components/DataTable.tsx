import data from "../server/data.json";
import { TableData } from "../@types/data";
import { generateTableRows } from "../utils/utils";

export default function PortfolioTable() {
  const tableData = data as TableData[];
  const portfolios = tableData[0].children;

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        border: "1px solid #ccc",
      }}
    >
      <thead>
        <tr style={{ backgroundColor: "#f4f4f4" }}>
          <th
            style={{
              textAlign: "left",
              padding: "8px",
              border: "1px solid #ddd",
            }}
          >
            Name
          </th>
          <th
            style={{
              textAlign: "right",
              padding: "8px",
              border: "1px solid #ddd",
            }}
          >
            Loan #
          </th>
          <th
            style={{
              textAlign: "right",
              padding: "8px",
              border: "1px solid #ddd",
            }}
          >
            Remaining Amount
          </th>
          <th
            style={{
              textAlign: "right",
              padding: "8px",
              border: "1px solid #ddd",
            }}
          >
            Realized Amount
          </th>
          <th
            style={{
              textAlign: "right",
              padding: "8px",
              border: "1px solid #ddd",
            }}
          >
            Payment Delay
          </th>
          <th
            style={{
              textAlign: "right",
              padding: "8px",
              border: "1px solid #ddd",
            }}
          >
            Asset Amount
          </th>
        </tr>
      </thead>
      <tbody>{generateTableRows(portfolios)}</tbody>
    </table>
  );
}
