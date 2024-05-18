import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPassword = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    setPasswordArray(passwords);
  };
  useEffect(() => {
    getPassword();
  }, []);

  const copyText = (text) => {
    toast("Copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      passwordRef.current.type = "text";
      ref.current.src = "icons/eyecross.png";
    }
  };
  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: form.id }),
      });

      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() }),
      });

      // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]));
      setform({ site: "", username: "", password: "" });
      toast("Password saved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast("Error: Password saved!");
    }
  };
  const deletePassword = async (id) => {
    let cnf = confirm("Do you want to delete this password?");
    if (cnf) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)));
      let res = await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      toast("Password Deleted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      //   console.log([...passwordArray, form]);
    }
  };
  const editPassword = (id) => {
    setform({ ...passwordArray.filter(i => i.id)[0], id: id });
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute inset-0 -z-10 m-h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <div className="p-2 md:p-0 md:mycontainer min-h-[88.2vh]">
        <h1 className="text-3xl font-bold text-center">
          <span className="text-red-400">&lt;Password </span>
          <span className="text-green-500">Manager/&gt;</span>
        </h1>
        <p className="text-white text-lg text-center">
          Your own Password Manager
        </p>

        <div className=" flex flex-col p-4 text-black items-center gap-8">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter URL"
            className="rounded-full outline-none border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Your Name"
              className="rounded-full outline-none border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full outline-none border border-green-500 w-full p-4 py-1"
                type="password"
                name="password"
              />
              <span
                className="absolute right-0 top-0 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1 w-8 mr-2"
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-green-500 
         border-1 border-green-700 rounded-full gap-2py-1 px-4 w-fit hover:bg-green-600"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>{" "}
            Save Data
          </button>
        </div>
        <div className="password text-white">
          <h2 className="font-bold text-center text-2xl py-4">Your Password</h2>
          {passwordArray.length === 0 && <div> No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className=" bg-green-800 md:flex-col flex-wrap">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-200 text-black">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border-2 border-white text-center">
                        <div className="flex items-center justify-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="size-5 copyBtn cursor-pointer mx-4"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <img src="icons/copyicon.png" alt="copy icon" />
                          </div>
                        </div>
                      </td>
                      <td className=" py-2 border-2 border-white text-center">
                        <div className="flex justify-center items-center">
                          <span>{item.username}</span>
                          <div
                            className="size-5 copyBtn cursor-pointer mx-4"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <img src="icons/copyicon.png" alt="copy icon" />
                          </div>
                        </div>
                      </td>
                      <td className=" py-2 border-2 border-white text-center ">
                        <div className="flex justify-center items-center">
                          <span>{"*".repeat(item.password.length)}</span>
                          <div
                            className="size-5 copyBtn cursor-pointer mx-4"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <img src="icons/copyicon.png" alt="copy icon" />
                          </div>
                        </div>
                      </td>
                      <td className="flex justify-center py-2 border-2 border-white text-center ">
                        <span
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <img
                            className="w-6  cursor-pointer"
                            src="icons/editicon.png"
                            alt=""
                          />
                        </span>
                        <span
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <img
                            className="w-6 ml-5 cursor-pointer"
                            src="icons/deleteicon.png"
                            alt=""
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
