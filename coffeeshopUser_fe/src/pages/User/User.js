import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import "../../assets/css/background.css";

const User = () => {
  const [user, setUser] = React.useState([]);
  const [image, setImage] = React.useState(null);

  const { id } = useParams();

  const getUserById = (id) => {
    return axios.get(`http://localhost:5000/api/v1/user/${id}`);
  };

  React.useEffect(() => {
    getUserById(id)
      .then((response) => {
        // data yang diterima dari server
        setUser(response.data.data);
        console.log(response.data.data);
        setImage(response.data.data.images[0].filename);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleRemove = () => {
    localStorage.removeItem("@userLogin");
    localStorage.removeItem("@userId");
  };

  return (
    <div className="bg-gray-100">
      <Header />
      <div className="profil-bg ">
        <main className="container max-w-5xl mx-auto flex flex-col">
          <h1 className="text-white "> User Profil </h1>
          <section className=" flex flex-row ">
            <div className="basis-[30%] bg-white">
              <div className="p-[2rem]">
                <img
                  className="rounded-full h-32 w-32 mx-auto"
                  src={`http://localhost:5000/public/uploads/Images/${image}`}
                  alt="Shoes"
                ></img>
                <div className="flex flex-row justify-end"></div>
              </div>
              <div className="text-center">
                <h1>{user.fullname}</h1>
                <h3>{user.email}</h3>
              </div>
              <div className="text-center">Has been ordered 15 products</div>
            </div>
            <div className="basis-[80%] bg-white ml-[3rem] p-4 ">
              <div className="flex flex-row justify-between">
                <h1 className="text-center text-[#4F5665] font-normal font-extrabold">
                  Contacts
                </h1>
              </div>
              <div className="flex flex-row ">
                <div className="flex flex-col basis-[50%] mr-4">
                  <label>Email Address :</label>
                  <input
                    className="border p-2"
                    type="email"
                    value={user.email}
                  />
                </div>
                <div className="flex flex-col basis-[50%] ml-4">
                  <label>Phone Number :</label>
                  <input
                    className="border p-2"
                    type="number"
                    value={user.phone_number}
                  />
                </div>
              </div>
              <div className="flex flex-col mt-4 mr-[22rem]">
                <label>Address</label>
                <input
                  className="border p-2"
                  type="text"
                  value={user.address}
                />
              </div>
            </div>
          </section>
          <section className="flex flex-row mt-6  mb-4 ">
            <div className="bg-white basis-[80%] mr-[2rem] p-4">
              <div className="flex flex-row justify-between">
                <h1 className="text-center text-[#4F5665] font-normal font-extrabold">
                  Details
                </h1>
              </div>
              <div className="flex flex-col ">
                <div className="flex flex-col mr-[22rem] ">
                  <label>Full Name : </label>
                  <input
                    className="border p-2"
                    type="text"
                    value={user.fullname}
                  />
                </div>
                <div className="flex flex-col mt-2 mr-[22rem]">
                  <label>User Name : </label>
                  <input
                    className="border p-2"
                    type="text"
                    value={user.username}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col basis-[20%]">
              <h1 className="font-bold text-white text-center">
                Do you want to save the change?
              </h1>
              <button className="mt-2 btn btn-primary"> Save Change </button>
              <button className="mt-2 btn btn-primary"> Cancel </button>
              <button className="mt-2 btn btn-primary"> Edit Password</button>
              <button className="mt-2 btn btn-primary" onClick={handleRemove} >
                {" "}
                Log out
              </button>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default User;
