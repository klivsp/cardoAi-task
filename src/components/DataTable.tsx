import { useState } from "react";
import { NodeData, TableData, TreeNode } from "../@types/data";
import { generateTableRows } from "./datagridRowGenerator";
import "../App.css";
import {
  SortDirection,
  SortField,
  TableHeaderConfigProps,
} from "../@types/sort";
import { sortNodes } from "../utils/common";

interface DatagridProps {
  tableData: TableData;
}

const getNodesThatHaveChildren = (
  nodes: (TreeNode | NodeData)[],
  labels: Record<string, boolean> = {}
): Record<string, boolean> => {
  for (const node of nodes) {
    if ("root" in node && node.root) {
      labels[node.root.label] = true;
      if (node.children) {
        getNodesThatHaveChildren(node.children, labels);
      }
    }
  }
  return labels;
};

const tableHeaderConfig: TableHeaderConfigProps[] = [
  { label: "Name", field: null },
  { label: "Loan", field: "loan_number" },
  { label: "Remaining Amount", field: "remaining_amount" },
  { label: "Realized Amount", field: "realized_amount" },
  { label: "Payment Delay", field: "payment_delay" },
  { label: "Asset Amount", field: "asset_amount" },
];

export default function Datagrid({ tableData }: DatagridProps) {
  const [expandTable, setExpandTable] = useState(false);
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>(
    {}
  );
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleToggle = (label: string) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const expandAll = () => {
    const allExpandableNodes = getNodesThatHaveChildren(tableData.children);
    setExpandTable(true);
    setExpandedNodes(allExpandableNodes);
  };

  const collapseAll = () => {
    setExpandedNodes({});
    setExpandTable(false);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortDirection(null);
        setSortField(null);
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedData =
    sortField && sortDirection
      ? {
          ...tableData,
          children: sortNodes(tableData.children, sortField, sortDirection),
        }
      : tableData;

  const SortIcon = ({ field }: { field: SortField }) => {
    const isActive = sortField === field;
    return (
      <span className="sorting-arrows">
        <span
          style={{
            color: isActive && sortDirection === "desc" ? "#000" : "#ccc",
            lineHeight: "0.5",
            padding: "2px",
          }}
        >
          ▲
        </span>
        <span
          style={{
            color: isActive && sortDirection === "asc" ? "#000" : "#ccc",
            lineHeight: "0.5",
          }}
        >
          ▼
        </span>
      </span>
    );
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
              {tableHeaderConfig.map(({ label, field }) =>
                field ? (
                  <th
                    key={field}
                    className="table-header-with-filter "
                    onClick={() => handleSort(field)}
                  >
                    {label} <SortIcon field={field} />
                  </th>
                ) : (
                  <th key={label} style={{ textAlign: "start", width: "50%" }}>
                    {label}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {generateTableRows(
              sortedData.children,
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
