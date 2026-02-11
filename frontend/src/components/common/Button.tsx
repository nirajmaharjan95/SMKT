import clsx from "clsx";
import type { ButtonProps } from "../../types/button";

const Button = (props: ButtonProps) => {
  const { onClick, children, className, disabled, label, variant } = props;
  return (
    <button
      className={clsx("btn", className, {
        "btn-primary": variant === "primary",
        "btn-outlined": variant === "outlined",
        "btn-ghost": variant === "ghost",
      })}
      onClick={onClick}
      disabled={disabled}
    >
      {label && label}
      {!label && children}
    </button>
  );
};

export default Button;
