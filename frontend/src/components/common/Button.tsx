import clsx from "clsx";
import type { ButtonProps } from "../../types/button";

const Button = (props: ButtonProps) => {
  return (
    <button
      className={clsx("btn", {
        "btn-primary": props.variant === "primary",
        "btn-outlined": props.variant === "outlined",
        "btn-ghost": props.variant === "ghost",
      })}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.label && props.label}
    </button>
  );
};

export default Button;
