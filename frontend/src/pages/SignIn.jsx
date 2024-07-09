import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields"));
    }
    // try {
    //   dispatch(signInStart());
    //   const res = await fetch(
    //     "https://mern-blog-app-one.vercel.app/api/auth/signin",
    //     {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(formData),
    //       credentials: "include",
    //     }
    //   );
    //   const data = await res.json();
    //   if (data.success === false) {
    //     dispatch(signInFailure(data.message));
    //   }
    //   if (res.ok) {
    //     dispatch(signInSuccess(data));
    //     navigate("/");
    //   }
    // } catch (error) {
    //   dispatch(signInFailure(error.message));
    // }

    try {
      dispatch(signInStart());
      const res = await axios.post(
        "/api/auth/signin",
        formData
        // {
        //   withCredentials: true, // Include credentials (cookies)
        // }
      );
      const data = res.data;
      if (!res.status === 200 || !res.status === 201) {
        dispatch(signInFailure(data.message));
      } else {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(
        signInFailure(
          error.response ? error.response.data.message : error.message
        )
      );
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-5xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}

        <div className="flex-grow">
          <img src="/smit.png" className="w-full h-full" alt="logo" />
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="User Email" />
              <TextInput
                type="email"
                placeholder="name@gmail.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="User Password" />
              <TextInput
                type="password"
                placeholder="***********"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="greenToBlue"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sing In"
              )}
            </Button>
            {/* <OAuth /> */}
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't Have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
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
