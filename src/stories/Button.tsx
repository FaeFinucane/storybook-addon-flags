import React from "react";
import "./button.css";
import { useFlags } from "./FlagsProvider";

interface ButtonProps {
  label?: string;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({ label, ...props }: ButtonProps) => {
  const { ButtonStyle = "primary" } = useFlags();

  const extraClass = `storybook-button--${ButtonStyle}`;

  return (
    <button
      type="button"
      className={`storybook-button ${extraClass}`}
      {...props}
    >
      {label}
    </button>
  );
};
