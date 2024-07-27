"use client";
import { useGlobalState } from "@/app/context/globalContextProvider";
import React, { ReactNode } from "react";
import styled from "styled-components";
interface Props {
  icon?: ReactNode;
  name?: string;
  background?: string;
  padding?: string;
  borderRad?: string;
  fw?: string;
  fs?: string;
  click?: () => void;
  type?: string;
  dClick?: () => void;
  border?: string;
}
const Button: React.FC<Props> = ({
  icon,
  name,
  background,
  padding,
  borderRad,
  fw,
  fs,
  click,
  dClick,
  border,
  type,
}) => {
  const { theme } = useGlobalState();

  return (
    <ButtonStyled
      style={{
        background: background,
        padding: padding || "0.5rem 1rem",
        borderRadius: borderRad || "0.5rem",
        fontWeight: fw || "500",
        fontSize: fs,
        border: border || "none",
        display:"flex",
        alignItems:"center",
        width:"80%",
        justifyContent:"space-around"
      }}
      onClick={click}
    >
      {icon && icon}
      {name && name}
      
    </ButtonStyled>
  );
};
const ButtonStyled=styled.button`

  
`
export default Button;
