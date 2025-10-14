import { useState } from "react";
import { NodeData, TableData, TreeNode } from "../@types/data";
import { generateTableRows } from "../utils/utils";
import "../App.css";

interface DatagridProps {
  tableData: TableData;
}

export default function Datagrid({ tableData }: DatagridProps) {
  const [expandTable, setExpandTable] = useState(false);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const handleToggle = (label: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  };

  const expandAll = () => {
    const allLabels = new Set<string>();
    const collect = (nodes: (TreeNode | NodeData)[]) => {
      for (const n of nodes) {
        if ("root" in n && n.root) {
          allLabels.add(n.root.label);
          if (n.children) collect(n.children);
        }
      }
    };
    collect(tableData.children);
    setExpandTable(true);
    setExpandedNodes(allLabels);
  };

  const collapseAll = () => {
    setExpandedNodes(new Set());
    setExpandTable(false);
  };

  return (
    <div style={{ width: "100%", border: "1px solid #ccc", borderRadius: 6 }}>
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
              handleToggle
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
