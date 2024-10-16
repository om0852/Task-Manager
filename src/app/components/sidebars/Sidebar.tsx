"use client";
import React from "react";
import styled from "styled-components";
import menu from "@/app/utils/menu";
import {
  useGlobalState,
  useGlobalUpdate,
} from "@/app/context/globalContextProvider";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Button from "../button/Button";
import { arrowLeft, bars, logout } from "@/app/utils/Icons";
import { SignedOut, SignOutButton, UserButton, useUser } from "@clerk/nextjs";
const Sidebar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const { user } = useUser();
  // console.log(user)
  const handleClick = (link: string) => {
    router.push(link);
  };

  const { theme, collapsed, collapseMenu } = useGlobalState();
  // console.log(theme)
  // useGlobalUpdate()
  return (
    <SidebarStyled
      className="flex flex-col justify-between"
      collapsed={collapsed}
      theme={theme}
    >
      <button className="toggle-nav" onClick={collapseMenu}>
        {collapsed ? bars : arrowLeft}
      </button>
      <div className="profile">
        <div className="profile-overlay absolute top-0 left-0 w-full h-full backdrop-filter[blur(10px)]  z-0 transition-all "></div>
        <div className="image">
          {" "}
          <Image
            width={70}
            height={70}
            src={user?.imageUrl ? user.imageUrl : "/avatar1.png"}
            alt=""
          />
        </div>{" "}
        <div className="user-btn absolute z-20 top-0 w-full h-full">
          <UserButton />
        </div>
        <h1>
          <span className="capitalize">{user?.firstName}</span>
          <span className="capitalize">{user?.lastName}</span>
        </h1>
      </div>
      <ul className="nav-items">
        {menu.map((item) => {
          return (
            <li
              key={item.id}
              className={`nav-item ${pathName == item.link ? "active" : ""}`}
              onClick={() => handleClick(item.link)}
            >
              {item.icon}
              <Link href={item.link}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
      <div className="sign-out relative mb-4 px-4 flex flex-col items-center">
        <div
          onClick={() => {
            setTimeout(() => {
              router.push("/signin");
            }, 1000);
          }}
          className="gap-2 w-[70%] bg-red-500 text-white justify-center h-10 flex flex-row items-center "
        >
          {logout}
          <SignOutButton />
        </div>
        {/* <Button click={()=>{SignedOut(()=>router.push("/sign-in"))}} icon={logout} name="Sign Out" padding={"0.4rem 0.8rem"} borderRad={"0.8rem"} fw="500" fs="1.2rem" type="submit" /> */}
      </div>
    </SidebarStyled>
  );
};
const SidebarStyled = styled.nav<{ collapsed: boolean }>`
  position: relative;
  width: ${(props) => props.theme.sidebarWidth};
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  color: ${(props) => props.theme.colorGrey3};
transform:${(props) =>
  props.collapsed ? "translateX(-120%)" : "translateX(0)"} ;
transition:  all 0.3 cubic-bezier(.53,0.32,0,1);

  .toggle-nav{
    position: absolute;
    right: ${(props) =>
  props.collapsed ? "-5rem":"-3rem"};
    display: none;
    top: 3.5rem;
    padding: 1rem;
    border-bottom-right-radius: .5rem;
    border-top-right-radius: .5rem;
    background-color: ${(props) => props.theme.colorBg};
  }
  @media screen and (max-width: 768px) {
    position: fixed;
    z-index: 22;
    height: 95%;
    margin-top: 1%;
  .toggle-nav{
display: block;
}
    .user-btn {
    .cl-rootBox {
      width: 80%;
      height: 80%;
      display: block;
      .cl-userButtonBox {
        width: 100%;
        height: 100%;

        .cl-internal-c4jh7f {
          width: 100%;
          height: 100%;
          opacity: 0;
        }
      }
    }
  }
}
  .user-btn {
    .cl-rootBox {
      width: 100%;
      height: 100%;
      display: block;
      .cl-userButtonBox {
        width: 100%;
        height: 100%;

        .cl-internal-c4jh7f {
          width: 100%;
          height: 100%;
          opacity: 0;
        }
      }
    }
  }
  .cl-userButtonTrigger {
    opacity: 0;
    width: 100%;
    height: 100%;
  }
  .profile {
    margin: 1.5rem;
    position: relative;
    padding: 1rem 0.8rem;
    border-radius: 1rem;
    cursor: pointer;
    font-weight: 500;
    color: ${(props) => props.theme.colorGrey0};
    display: flex;
    align-items: center;

    .profile-overlay {
      border-radius: 1rem;
      border: 2px solid ${(props) => props.theme.borderColor2};
      opacity: 0.2;
    }
    h1 {
      font-size: 1.2rem;
      display: flex;
      flex-direction: column;
      line-height: 1.4rem;
    }
    .image h1 {
      position: relative;
      z-index: 1;
    }
    .image {
      flex-shrink: 0;
      display: inline-block;
      overflow: hidden;
      transition: all 0.5s ease;
      border-radius: 100%;
      width: 70px;
      height: 70px;
      img {
        border-radius: 100%;
        transition: all 0.5s ease;
      }
    }
    > h1 {
      font-size: clamp(1.2rem, 4vw, 1.4rem);
      line-height: 100%;
      margin-left: 0.8rem;
    }
    &:hover {
      .profile-overlay {
        opacity: 1.3;
        border: 2px solid ${(props) => props.theme.borderColor2};
      }
    }
  }

  .nav-item {
    padding: 0.6rem 1rem;
    padding-left: 2.1rem;
    margin: 0.3rem 0;
    display: grid;
    grid-template-columns: 40px 1fr;
    cursor: pointer;
    position: relative;

    &::after {
      position: absolute;
      content: "";
      left: 0;
      top: 0;
      width: 0;
      height: 100%;
      background-color: ${(props) => props.theme.activeNavLinkHover};
      z-index: 1;
      transition: all 0.3s ease-in-out;
    }
    &::before {
      position: absolute;
      content: "";
      left: 0;
      top: 0;
      width: 0%;
      height: 100%;
      background-color: ${(props) => props.theme.colorGreenDark};
      z-index: 1;
      transition: all 0.3s ease-in-out;
      border-bottom-left-radius: 5px;
      border-top-left-radius: 5px;
    }
    a {
      font-weight: 500;
      z-index: 2;
      transition: all 0.3s ease-in-out;
    }
    i {
      display: flex;
      align-items: center;
      color: ${(props) => props.theme.colorIcons};
    }
    &:hover {
      &::after {
        width: 100%;
      }
      &::before {
      }
    }
  }
  .active {
    background-color: ${(props) => props.theme.activeNavLink};
    i {
      color: ${(props) => props.theme.colorIcons2};
    }
    a {
      color: ${(props) => props.theme.colorIcons2};
      /* line-height: 0; */
    }
  }
  .active::before {
    width: 0.3rem;
  }
`;

export default Sidebar;
