import React, { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import {
  HiAnnotation,
  HiArrowSmRight,
  HiChartPie,
  HiDocumentText,
  HiOutlineUserGroup,
  HiUser,
} from "react-icons/hi";
import { TfiCommentAlt } from "react-icons/tfi";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "../redux/user/userSlice";
import axios from "axios";
export const DashSidebar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    try {
      const res = await axios.post("/api/user/signout");
      const data = res.data;
      if (!res.status === 200 || !res.status === 201) {
        console.log("data-error", data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          {currentUser && currentUser.isAdmin && (
            <Link to={"/dashboard/?tab=dash"}>
              <Sidebar.Item
                icon={HiChartPie}
                active={tab === "dash" || !tab}
                labelColor="dark"
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}
          <Link to={"/dashboard/?tab=profile"}>
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={
                currentUser.isAdmin
                  ? "Admin"
                  : currentUser.role === "teacher"
                  ? "teacher"
                  : "student"
              }
              labelColor="dark"
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <Link to={"/dashboard/?tab=posts"}>
              <Sidebar.Item
                active={tab === "posts"}
                icon={HiDocumentText}
                as="div"
              >
                Posts
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to={"/dashboard/?tab=users"}>
              <Sidebar.Item
                active={tab === "users"}
                icon={HiOutlineUserGroup}
                as="div"
              >
                Users
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to={"/dashboard/?tab=comments"}>
              <Sidebar.Item
                active={tab === "comments"}
                icon={HiAnnotation}
                as="div"
              >
                Comments
              </Sidebar.Item>
            </Link>
          )}
          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};
