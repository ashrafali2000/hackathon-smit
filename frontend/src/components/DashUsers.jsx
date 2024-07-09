import axios from "axios";
import { Button, Modal, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DashUsers = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `https://mern-blog-app-one.vercel.app/api/user/getusers`,
          {
            withCredentials: true,
          }
        );
        const data = res.data;
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);
  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await axios.get(
        `https://mern-blog-app-one.vercel.app/api/user/getusers?startIndex=${startIndex}`,
        {
          withCredentials: true,
        }
      );
      const data = res.data;
      if (res.status === 200 || res.status === 201) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      const res = await axios.delete(
        `https://mern-blog-app-one.vercel.app/api/user/delete/${userIdToDelete}`,
        {
          withCredentials: true,
        }
      );
      if (!res.status === 200 || !res.status === 201) {
        console.log(data.message);
      } else {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Created date
                </th>
                <th scope="col" className="px-6 py-3">
                  User image
                </th>
                <th scope="col" className="px-6 py-3">
                  User Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Admin
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {new Date(user.createdAt).toLocaleDateString()}
                  </th>
                  <td className="px-6 py-4">
                    <img
                      src={user.profilePicture}
                      alt={user._id}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4">{user.username}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    {user.isAdmin ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {" "}
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>There is no User yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="w-14 h-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                Yes I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashUsers;
