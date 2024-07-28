"use client";
import { ReactNode } from "react";
import styled from "styled-components";

interface propsType {
  children: ReactNode;
}

const GlobalStylesProvider: React.FC<propsType> = ({ children }) => {
  return <GlobalStyle>{children}</GlobalStyle>;
};
const GlobalStyle = styled.div`
  padding: 2.5rem;
  display: flex;
  gap: 2.5rem;
  height: 100%;

  @media screen and (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
`;
export default GlobalStylesProvider;
