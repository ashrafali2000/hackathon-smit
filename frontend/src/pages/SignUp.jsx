import {
  Alert,
  Button,
  Label,
  Select,
  Spinner,
  TextInput,
} from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import axios from "axios";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    if (e.target.value === "student") {
      setRole("student");
    } else if (e.target.value === "teacher") {
      setRole("teacher");
    }
    if (e.target.name === "role" || e.target.name === "gender") {
      setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out the fields.");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await axios.post("/api/auth/signup", formData);
      const data = res.data;
      if (!res.status === 200 || !res.status === 201) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.status === 200 || res.status === 201) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
    console.log("formData-------->", formData);
  };
  return (
    <div
      className="min-h-screen mt-20"
      style={{
        backgroundImage: "url(./webdevelopment.png)",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex p-3 max-w-5xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        {/* <div className="flex-1">
          <Link to="/" className="text-4xl font-bold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Ashra's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            Once you determine that they’re your competitor, it’s time to take
            note of their techniques so that you can capture a similar
            readership.
          </p>
        </div> */}

        <div className="flex-1">
          <img src="/smit.png" className="w-full h-full" alt="logo" />
        </div>
        {/* right */}
        <div className="flex-grow">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label value="Name" />
                <TextInput
                  type="text"
                  placeholder="Your Name"
                  id="username"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label value=" Email" />
                <TextInput
                  type="email"
                  placeholder="name@gmail.com"
                  id="email"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label value="Password" />
                <TextInput
                  type="password"
                  placeholder="Password"
                  id="password"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label value=" Phone No" />
                <TextInput
                  type="number"
                  placeholder="+92****"
                  id="phoneNo"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="">
                <label
                  htmlFor="campus"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Campus
                </label>
                <select
                  id="campus"
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>Choose a Campus</option>
                  <option value="Gulshan" className="uppercase">
                    Gulshan
                  </option>
                  <option value="Bahadurabad" className="uppercase">
                    Bahadurabad
                  </option>
                </select>
              </div>

              <div className="">
                <label
                  htmlFor="course"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Course
                </label>
                <select
                  id="course"
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>Choose a Course</option>
                  <option value="Web & app" className="uppercase">
                    Web & app
                  </option>
                  <option value="Graphic Designing" className="uppercase">
                    Graphic Designing
                  </option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center  gap-8 ">
                <div className="flex items-center ">
                  <input
                    id="male"
                    type="radio"
                    value="male"
                    name="gender"
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="male"
                    className="ms-2 text-md font-medium text-gray-900 dark:text-gray-300"
                  >
                    Male
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="female"
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="female"
                    className="ms-2 text-md font-medium text-gray-900 dark:text-gray-300"
                  >
                    Female
                  </label>
                </div>
              </div>

              <div className="flex items-center  gap-8 ">
                <div className="flex items-center ">
                  <input
                    id="teacher"
                    type="radio"
                    name="role"
                    value="teacher"
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="teacher"
                    className="ms-2 text-md font-medium text-gray-900 dark:text-gray-300"
                  >
                    Teacher
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="student"
                    type="radio"
                    name="role"
                    value="student"
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="student"
                    className="ms-2 text-md font-medium text-gray-900 dark:text-gray-300"
                  >
                    Student
                  </label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {role === "student" ? (
                <>
                  <div>
                    <Label value="RollNo" />
                    <TextInput
                      type="number"
                      placeholder="RollNO"
                      id="rollNO"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label value=" Batch" />
                    <TextInput
                      type="number"
                      placeholder="User Batch"
                      id="batch"
                      onChange={handleChange}
                    />
                  </div>
                </>
              ) : null}
            </div>
            <Button
              gradientDuoTone="greenToBlue"
              type="submit"
              disabled={loading}
              className="w-4/12"
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sing Up"
              )}
            </Button>
            {/* <OAuth /> */}
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
