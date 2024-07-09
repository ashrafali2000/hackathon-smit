import axios from "axios";
import { Button, Modal, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DashComments = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `https://mern-blog-app-one.vercel.app/api/comment/getcomments`,
          {
            withCredentials: true,
          }
        );
        const data = res.data;

        setComments(data.comments);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id]);
  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await axios.get(
        `https://mern-blog-app-one.vercel.app/api/comment/getcomments?startIndex=${startIndex}`,
        {
          withCredentials: true,
        }
      );
      const data = res.data;
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const res = await axios.delete(
        `https://mern-blog-app-one.vercel.app/api/comment/deleteComment/${commentIdToDelete}`,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200 || res.status === 201) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Created updated
                </th>
                <th scope="col" className="px-6 py-3">
                  Comment contents
                </th>
                <th scope="col" className="px-6 py-3">
                  Number of likes
                </th>
                <th scope="col" className="px-6 py-3">
                  PostId
                </th>
                <th scope="col" className="px-6 py-3">
                  UserId
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </th>
                  <td className="px-6 py-4">{comment.content}</td>
                  <td className="px-6 py-4">{comment.numberOfLikes}</td>
                  <td className="px-6 py-4">{comment.postId}</td>
                  <td className="px-6 py-4">{comment.userId}</td>
                  <td className="px-6 py-4">
                    {" "}
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setCommentIdToDelete(comment._id);
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
        <p>There is no Comment yet!</p>
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
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteComment}>
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

export default DashComments;
