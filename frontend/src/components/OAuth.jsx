import { Button } from "flowbite-react";
import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInSuccess } from "../redux/user/userSlice";
import axios from "axios";
export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth(app);
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);
      const res = await axios.post(
        "https://mern-blog-app-one.vercel.app/api/auth/google",
        {
          name: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          googlePhotoURL: resultFromGoogle.user.photoURL,
        },
        {
          withCredentials: true,
        }
      );
      const data = res.data;
      if (res.status === 200 || res.status === 201) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      type="button"
      gradientDuoTone="pinkToOrange"
      outline
      onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Continue with Google
    </Button>
  );
}
