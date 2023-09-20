"use client";

import React, { FC, FormEvent, ReactNode, SyntheticEvent } from "react";

interface ButtonProps {
  children: ReactNode;
  type?: "submit" | "button" | "reset" | undefined;
  fullwidth?: boolean;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
  children,
  type = "button",
  fullwidth,
  danger,
  disabled,
  secondary,
}) => {
  return (
    <>
      <button
        type={type}
        disabled={disabled}
        className=" 
        flex 
        justify-center 
        rounded-md 
        px-3 
        py-2 
        text-sm 
        w-full
        font-semibold 
        bg-primary
        
        focus-visible:outline 
        focus-visible:outline-2 
        focus-visible:outline-offset-2 
        "
      >
        {children}
      </button>
    </>
  );
};

export default Button;
