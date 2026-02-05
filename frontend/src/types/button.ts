export interface ButtonProps {
  label?: string;
  variant?: "primary" | "outlined" | "ghost";
  onClick: () => void;
  disabled?: boolean;
}
