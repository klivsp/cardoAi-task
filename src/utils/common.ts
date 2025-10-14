import { NodeData, TreeNode } from "../@types/data";
import { SortDirection, SortField } from "../@types/sort";

export const sortNodes = (
  nodes: (TreeNode | NodeData)[],
  field: SortField,
  direction: SortDirection
): (TreeNode | NodeData)[] => {
  if (!direction) return nodes;

  const sorted = [...nodes].sort((a, b) => {
    let aData: NodeData;
    let bData: NodeData;

    if ("root" in a && a.root) {
      aData = a.root;
    } else {
      aData = a as NodeData;
    }

    if ("root" in b && b.root) {
      bData = b.root;
    } else {
      bData = b as NodeData;
    }

    const aValue = aData[field] ?? -Infinity;
    const bValue = bData[field] ?? -Infinity;

    if (direction === "asc") {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  });

  return sorted.map((node) => {
    if ("root" in node && node.root && node.children) {
      return {
        ...node,
        children: sortNodes(node.children, field, direction),
      };
    }
    return node;
  });
};
