import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Header from "./components/Header";
import FooterCom from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminPrivateRoute from "./components/OnlyAdminRoute";
import CreatePost from "./pages/CreatePost";
import UPdatePost from "./pages/UpdatePost";
import PostPage from "./pages/PostPage";
import { ScrollToTop } from "./components/ScrollToTop";
import { Search } from "./pages/Search";
import { useSelector } from "react-redux";

export default function App() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />}></Route>
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postId" element={<UPdatePost />} />
        </Route>
        <Route path="/projects" element={<Projects />} />
        <Route path="/post/:postSlug" element={<PostPage />} />
      </Routes>
      <FooterCom />
    </BrowserRouter>
  );
}
