import { NodeData, TreeNode } from "../@types/data";
import { useFetchData } from "../hooks/useFetchData";
import "./style.css";

const DataTable = () => {
  const { items: data } = useFetchData();

  if (!data || data.length === 0) {
    return <div>No data available.</div>;
  }

  const sectionHeader = (children: (TreeNode | NodeData)[] | null) => {
    return (
      <>
        <tbody>
          {children?.map((child, idx) => (
            <tr key={idx}>
              <th>test</th>
              <th>
                <div>test</div>
              </th>
              <th>
                <div></div>
              </th>
              <th>
                <div>Real. Amount</div>
              </th>
              <th>
                <div>Payment Delay</div>
              </th>
              <th>
                <div>Asset Amount</div>
              </th>
            </tr>
          ))}
        </tbody>
      </>
    );
  };

  return (
    <>
      {data.map((header, index) => (
        <table
          style={{ borderCollapse: "collapse", width: "100%" }}
          className="table"
          key={index}
        >
          <thead className="table-header">
            <tr>
              <th className="header-title">{header.primary}</th>

              <th className="header-actions">
                <span className="action-link">Collapse All</span>
                <span className="action-link">Expand All</span>
              </th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th>{header.primary}</th>
              <th>
                <div className="flex items-center justify-end">Loan #</div>
              </th>
              <th>
                <div>Remaining Amount</div>
              </th>
              <th>
                <div>Real. Amount</div>
              </th>
              <th>
                <div>Payment Delay</div>
              </th>
              <th>
                <div>Asset Amount</div>
              </th>
            </tr>
          </thead>

          <thead className="table-header">
            {sectionHeader(header.children)}
          </thead>

          {/* <tbody>
            {header.children.map((child, idx) => (
              <tr key={idx} className="table-row">
                <td className="row-label">{child?.root?.label}</td>
                <td className="row-data">
                  <span>Loan Number: {child?.root?.loan_number}</span>
                  <span>Remaining Amount: {child?.root?.remaining_amount}</span>
                  <span>Realized Amount: {child?.root?.realized_amount}</span>
                  <span>Payment Delay: {child?.root?.payment_delay}</span>
                  <span>
                    Asset Amount:{" "}
                    {child?.root?.asset_amount !== null
                      ? child?.root?.asset_amount
                      : "N/A"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody> */}
        </table>
      ))}
    </>
  );
};

export default DataTable;
