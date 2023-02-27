import logocoffee from "../assets/img/logo.svg";
import React, { useEffect } from "react";
import MenuAuth from "./MenuAuth";
import MenuUnAuth from "./MenuUnAuth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const idUser = localStorage.getItem("@userId");
  useEffect(() => {}, []);
  return (
    <div>
      <header className="container max-w-5xl mx-auto flex flex-row pt-12 items-center space-x-36 border-b-2 sm:px-4">
        <div className="flex flex row">
          <img alt="logocoffee" src={logocoffee} className="w-12" />
        </div>
        <div className="flex-1 ">
          <ul className="flex flex-row space-x-6 justify-center">
            <li
              className="font-semibold hover:cursor-pointer hover:text-amber-900"
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className="font-semibold hover:cursor-pointer hover:text-amber-900"
              onClick={() => navigate("/products")}
            >
              Product
            </li>
            <li
              className="font-semibold hover:cursor-pointer hover:text-amber-900"
              onClick={() => navigate(`/cart/${idUser}`)}
            >
              Your Cart
            </li>
            <li
              className="font-semibold hover:cursor-pointer hover:text-amber-900"
              onClick={() => navigate(`/history/${idUser}`)}
            >
              History
            </li>
          </ul>
        </div>
        {localStorage.getItem("@userLogin") ? <MenuAuth /> : <MenuUnAuth />}
      </header>
    </div>
  );
};

export default Header;
