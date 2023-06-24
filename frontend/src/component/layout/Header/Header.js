import React from "react";
import {ReactNavbar} from "overlay-navbar";
import logo from "../../../images/logo.png";
import {MdAccountCircle } from "react-icons/md";
import {MdSearch } from "react-icons/md";
import {MdAddShoppingCart } from "react-icons/md";


const options = {
    burgerColor:"#B9F3FC",
    burgerColorHover:"#DB1A5A",
    navColor1:"rgb(3, 0, 28)",
    navColor2:"rgb(185, 243, 252)",
    navColor3:"rgb(3, 0, 28)",
    navColor4:"rgb(185, 243, 252)",
    logo,
    logoWidth:"8vmax",
    logoHoverSize:"10px",
    link1Text:"Home",
    link2Text:"Products",
    link3Text:"Contact",
    link4Text:"About",
    link1Url:"/",
    link2Url:"/products",
    link3Url:"/contact",
    link4Url:"/about",
    link1Size:"1.2vmax",
    link1Color:"rgb(3, 0, 28)",
    link2Color:"rgb(3, 0, 28)",
    link3Color:"rgb(185, 243, 252)",
    link4Color:"rgb(185, 243, 252)",
    nav1justifyContent:"flex-end",
    nav2justifyContent:"flex-end",
    nav3justifyContent:"flex-start",
    nav4justifyContent:"flex-start",

    link1ColorHover:"#DB1A5A",
    link2ColorHover:"#DB1A5A",
    link3ColorHover:"#DB1A5A",
    link4ColorHover:"#DB1A5A",
    link2Margin:"3vmax",
    link4Margin:"3vmax",
    link3Margin:"3vmax",
    link1Margin:"3vmax",
   
    profileIcon:true,
    profileIconUrl:"/login",
    profileIconColor:"rgba(3, 0, 28, 1)",
    ProfileIconElement:MdAccountCircle,
    searchIcon:true,
    searchIconColor: "rgba(3, 0, 28, 1)",
    SearchIconElement:MdSearch,
    cartIcon:true,
    cartIconColor: "rgba(3, 0, 28, 1)",
    CartIconElement:MdAddShoppingCart,
    profileIconColorHover: "#DB1A5A",
    searchIconColorHover: "#DB1A5A",
    cartIconColorHover: "#DB1A5A",
    cartIconMargin: "1vmax",
   
  };
  
  const Header = () => {
    return     <ReactNavbar {...options} />
  
  };
  
  

export default Header;

