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
    <div
      style={{
        background: background,
        padding,
        borderRadius: borderRad ,
        fontWeight: fw,
        fontSize: fs,
        border,
      }}
    >
      Button
    </div>
  );
};
export default Button;
