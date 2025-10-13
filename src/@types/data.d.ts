export interface NodeData {
  label: string;
  loan_number: number;
  remaining_amount: number;
  realized_amount: number;
  payment_delay: number;
  asset_amount: number | null;
}

export interface TreeNode {
  root?: NodeData;
  children: (TreeNode | NodeData)[] | null;
}

export interface TableData {
  primary: string;
  children: TreeNode[];
}
