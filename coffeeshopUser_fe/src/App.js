import React from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import {
  HomePages,
  Login,
  SignUp,
  ForgotPassword,
  Products,
  ProductsDetails,
  User,
  Message,
  Cart,
  History,
} from "./pages";

const App = () => {
  //input token and user id
  // caranya useSelector
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductsDetails />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/message" element={<Message />} />
        <Route path="/cart/:id" element={<Cart />} />
        <Route path="/history/:id" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
