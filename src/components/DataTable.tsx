import { useState } from "react";
import { NodeData, TableData, TreeNode } from "../@types/data";
import { generateTableRows } from "../utils/utils";
import "../App.css";

interface DatagridProps {
  tableData: TableData;
}

export default function Datagrid({ tableData }: DatagridProps) {
  const [expandTable, setExpandTable] = useState(false);
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>(
    {}
  );

  const handleToggleExpandCollapse = (label: string) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const getNodesThatHaveChildrens = (
    nodes: (TreeNode | NodeData)[],
    labels: Record<string, boolean> = {}
  ): Record<string, boolean> => {
    for (const node of nodes) {
      if ("root" in node && node.root) {
        labels[node.root.label] = true;
        if (node.children) {
          getNodesThatHaveChildrens(node.children, labels);
        }
      }
    }
    return labels;
  };

  const expandAll = () => {
    const allExpandableNodes = getNodesThatHaveChildrens(tableData.children);
    setExpandTable(true);
    setExpandedNodes(allExpandableNodes);
  };

  const collapseAll = () => {
    setExpandedNodes({});
    setExpandTable(false);
  };

  return (
    <div style={{ width: "100%", border: "1px solid #ccc" }}>
      <div className="table-header ">
        <div className="table-header-title">
          <span
            className="expand-first-layer-button"
            onClick={() => setExpandTable(!expandTable)}
            style={{ transform: expandTable ? "rotate(90deg)" : "" }}
          >
            {">"}
          </span>
          <h2 style={{ margin: 0, fontSize: "20px" }}>{tableData.primary}</h2>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={expandAll} className="action-button">
            Expand All
          </button>
          <button onClick={collapseAll} className="action-button">
            Collapse All
          </button>
        </div>
      </div>
      {expandTable && (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr className="table-rows-style">
              <th>Name</th>
              <th>Loan</th>
              <th>Remaining Amount</th>
              <th>Realized Amount</th>
              <th>Payment Delay</th>
              <th>Asset Amount</th>
            </tr>
          </thead>
          <tbody>
            {generateTableRows(
              tableData.children,
              0,
              expandedNodes,
              handleToggleExpandCollapse
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
