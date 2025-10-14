export type SortField =
  | "loan_number"
  | "remaining_amount"
  | "realized_amount"
  | "payment_delay"
  | "asset_amount";

export type SortDirection = "asc" | "desc" | null;

export interface TableHeaderConfigProps {
  label: string;
  field: SortField | null;
}
