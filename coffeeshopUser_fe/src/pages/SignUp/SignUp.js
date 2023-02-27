import React, { useEffect, useState } from "react";
import axios from "axios";

import logocoffee from "../../assets/img/logo.svg";
import Footer from "../../components/Footer";

import "../../assets/css/background.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [signupForm, setSignupForm] = useState({
    fullname: "",
    username: "",
    password: "",
    email: "",
    // address: "",
    // phone_number: "",
    // image: null,
  });
  const [validate, setValidate] = useState({
    error: false,
    message: "",
  });
  const navigate = useNavigate();
  const handleSignup = (event) => {
    event.preventDefault();
    axios({
      url: "http://localhost:5000/api/v1/auth/register",
      method: "POST",
      data: signupForm,
    })
      .then((res) => {
        console.log(res.data.data);
        localStorage.setItem("@userLogin", JSON.stringify(res.data.data));
        localStorage.setItem("@userId", res.data.data.user.id);
        navigate("/products");
      })
      .catch((err) => {
        setValidate({ error: true, message: err.response.data.message });
      });
  };

  useEffect(() => {
    if (localStorage.getItem("@userLogin")) {
      navigate("/products");
    }
  });

  // const handleFileChange = (event) => {
  //   setFormData({ ...formData, image: event.target.files[0] });
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const form = new FormData();
  //   form.append("fullname", formData.fullname);
  //   form.append("username", formData.username);
  //   form.append("password", formData.password);
  //   form.append("email", formData.email);
  //   // form.append("address", formData.address);
  //   // form.append("phone_number", formData.phone_number);
  //   // form.append("image", formData.image);
  //   axios({
  //     url: "http://localhost:5000/api/v1/auth/register",
  //     method: "POST",
  //     data: formData,
  //     // headers: { "Content-Type": "multipart/form-data" },
  //   })
  //     .then((res) => {
  //       console.log(res.data.data);
  //       localStorage.setItem("@userId", res.data.data.user.id);
  //       localStorage.setItem("@userLogin", JSON.stringify(res.data.data));

  //       navigate("/products");
  //     })
  //     .catch((err) => {
  //       setValidate({ error: true, message: err.response.data.message });
  //     });
  // };
  // useEffect(() => {
  //   if (localStorage.getItem("@userLogin")) {
  //     navigate("/products");
  //   }
  // });
  return (
    <div className="bg-gray-100">
      <main className="container mx-auto flex">
        <section className="flex-1 auth-bg"></section>
        <section className="flex-1 mt-8">
          <div className="flex flex-row">
            <div className="basis-1/2 ml-8">
              <img className="w-12" src={logocoffee} alt="logo"></img>
            </div>
            <div className="basis-1/2 ml-36">
              <button
                className="mt-2 mx-auto border bg-amber-500 rounded-full py-2 px-6 text-amber-900"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          </div>
          <div className="mt-16">
            <h1 className="text-center text-amber-900 font-bold  text-3xl">
              Sign Up
            </h1>
          </div>
          <form className="mt-10 " onSubmit={handleSignup}>
            {validate.error && (
              <div className="alert alert-error shadow-lg w-3/4 mx-auto">
                <div>
                  <span>{validate.message}</span>
                </div>
              </div>
            )}
            <div className="flex flex-col py-2 w-3/4 mx-auto ">
              <label>Full Name</label>
              <input
                onChange={(e) =>
                  setSignupForm({
                    ...signupForm,
                    fullname: e.target.value,
                  })
                }
                className="border p-2"
                type="text"
              />
            </div>
            <div className="flex flex-col py-2 w-3/4 mx-auto ">
              <label>User Name</label>
              <input
                onChange={(e) =>
                  setSignupForm({
                    ...signupForm,
                    username: e.target.value,
                  })
                }
                className="border p-2"
                type="text"
              />
            </div>

            <div className="flex flex-col py-2 w-3/4 mx-auto ">
              <label>Email Address</label>
              <input
                onChange={(e) =>
                  setSignupForm({
                    ...signupForm,
                    email: e.target.value,
                  })
                }
                className="border p-2"
                type="email"
              />
            </div>
            <div className="flex flex-col py-2 w-3/4 mx-auto ">
              <label>Password</label>
              <input
                onChange={(e) =>
                  setSignupForm({
                    ...signupForm,
                    password: e.target.value,
                  })
                }
                className="border p-2"
                type="password"
              />
            </div>
            {/* <div className="flex flex-col py-2 w-3/4 mx-auto">
              <label>Address</label>
              <input
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: e.target.value,
                  })
                }
                className="border p-2"
                type="text"
              />
            </div>
            <div className="flex flex-col py-2 w-3/4 mx-auto">
              <label>Phone Number</label>
              <input
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone_number: e.target.value,
                  })
                }
                className="border p-2"
                type="number"
              />
            </div>
            <div className="flex flex-col py-2 w-3/4 mx-auto">
              <label>Upload Profil image</label>
              <input
                onChange={handleFileChange}
                className="border p-2"
                type="file"
              />
            </div> */}
            <div className="text-center">
              <button
                type="submit"
                className=" btn btn-primary border border-black w-3/4 my-5 mx-center  py-2 bg-amber-500 hover:bg-amber-400 text-amber-900"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="text-center">
            <button className=" btn btn-primary border border-black  w-3/4 my-5  py-2 bg-white  hover:bg-gray-400 text-black">
              Sign Up With Google
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;
