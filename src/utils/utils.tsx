import { NodeData, TreeNode } from "../@types/data";
import { JSX } from "react/jsx-runtime";

export function generateTableRows(
  nodes: (TreeNode | NodeData)[],
  level = 0,
  expandedNodes: Set<string>,
  onToggle: (label: string) => void,
  path = ""
): JSX.Element[] {
  return nodes.flatMap((node, index) => {
    let data: NodeData;
    let children: (TreeNode | NodeData)[] | null = null;

    if ("root" in node && node.root) {
      data = node.root;
      children = node.children;
    } else {
      data = node as NodeData;
    }

    const hasChildren = Array.isArray(children) && children.length > 0;
    const isExpanded = expandedNodes.has(data.label);

    const nodeKey = path ? `${path}-${index}` : `${index}`;

    const row = (
      <tr key={nodeKey}>
        <td
          style={{
            paddingLeft: `${level * 20}px`,
            cursor: hasChildren ? "pointer" : "default",
          }}
        >
          {hasChildren && (
            <span
              style={{ marginRight: "5px", userSelect: "none" }}
              onClick={() => onToggle(data.label)}
            >
              {isExpanded ? "▼" : "▸"}
            </span>
          )}
          {data.label}
        </td>
        <td>{data.loan_number}</td>
        <td>{data.remaining_amount?.toLocaleString()}</td>
        <td>{data.realized_amount?.toLocaleString()}</td>
        <td>{data.payment_delay?.toFixed(2)}</td>
        <td>
          {data.asset_amount !== null
            ? data.asset_amount.toLocaleString()
            : "-"}
        </td>
      </tr>
    );

    const childRows =
      hasChildren && isExpanded && children
        ? generateTableRows(
            children,
            level + 1,
            expandedNodes,
            onToggle,
            nodeKey
          )
        : [];

    return [row, ...childRows];
  });
}
