import { useState } from "react";
import data from "../server/data.json";
import { NodeData, TableData, TreeNode } from "../@types/data";
import { generateTableRows } from "../utils/utils";
import "../App.css";

export default function PortfolioTable() {
  const tableData = data as TableData[];
  const portfolios = tableData[0].children;

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
    collect(portfolios);
    setExpandedNodes(allLabels);
  };

  const collapseAll = () => setExpandedNodes(new Set());

  return (
    <div style={{ width: "100%", border: "1px solid #ccc", borderRadius: 6 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
          backgroundColor: "#f0f2f5",
          borderBottom: "1px solid #ddd",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "20px" }}>Portfolio Overview</h2>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={expandAll}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "8px 14px",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            style={{
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              padding: "8px 14px",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Collapse All
          </button>
        </div>
      </div>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr className="table-rows-style">
            <th>Name</th>
            <th>Loan #</th>
            <th>Remaining Amount</th>
            <th>Realized Amount</th>
            <th>Payment Delay</th>
            <th>Asset Amount</th>
          </tr>
        </thead>
        <tbody>
          {generateTableRows(portfolios, 0, expandedNodes, handleToggle)}
        </tbody>
      </table>
    </div>
  );
}
