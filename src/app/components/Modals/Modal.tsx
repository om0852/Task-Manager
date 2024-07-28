"use client";
import { useGlobalState } from "@/app/context/globalContextProvider";
import React, { ReactNode } from "react";
import styled from "styled-components";

const Modal = ({ content }: { content: ReactNode }) => {
  const { closeModal, theme } = useGlobalState();
  return (
    <ModalStyle theme={theme}>
      <div className="modal-overlay" onClick={closeModal}></div>
      <div className="modal-content">{content}</div>
    </ModalStyle>
  );
};
const ModalStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    filter: blur(5px);
  }
  .modal-content {
    z-index: 102;
    padding: 2rem;
    position: relative;
    max-width: 630px;
    height: 90%;
    overflow-y: scroll;
    scroll-behavior: smooth;
    scrollbar-width: none;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
    border-radius: ${(props) => props.theme.borderRadiusMd2};
    color: ${(props) => props.theme.colorGrey1};

    width: 100%;
    border-radius: 1rem;
    background-color: ${(props) => props.theme.colorBg2};
  }
`;

export default Modal;
