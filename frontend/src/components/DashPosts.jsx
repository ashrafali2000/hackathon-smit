import axios from "axios";
import { Button, Modal, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `/api/post/getposts?userId=${currentUser._id}`
        );
        if (res.status === 200 || res.status === 201) {
          const data = res.data;
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);
  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await axios.get(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      if (res.status === 200 || res.status === 201) {
        const data = res.data;
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await axios.delete(
        `/post/deletepost/${postIdToDelete}/${currentUser._id}`
      );
      if (res.status === 200 || res.status === 201) {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    // <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
    //   {currentUser.isAdmin && userPosts.length > 0 ? (
    //     <>
    //       <Table hoverable className="shadow-md">
    //         <Table.Head>
    //           <Table.HeadCell>Date updated</Table.HeadCell>
    //           <Table.HeadCell>Post image</Table.HeadCell>
    //           <Table.HeadCell>Post Title</Table.HeadCell>
    //           <Table.HeadCell>Category</Table.HeadCell>
    //           <Table.HeadCell>Delete</Table.HeadCell>
    //           <Table.HeadCell>
    //             <span>Edit</span>
    //           </Table.HeadCell>
    //         </Table.Head>
    //         {userPosts.map((post) => {
    //           <Table.Body className="divide-y">
    //             <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
    //               <Table.Cell>
    //                 {new Date(post.updatedAt).toLocaleDateString()}
    //               </Table.Cell>
    //               <Table.Cell>
    //                 <Link to={`/post/${post.slug}`}>
    //                   <img
    //                     src={post.image}
    //                     alt={post.title}
    //                     className="w-20 h-10 object-cover bg-gray-500"
    //                   />
    //                 </Link>
    //               </Table.Cell>
    //               <Table.Cell>
    //                 <Link
    //                   className="font-medium text-gray-900 dark:text-white"
    //                   to={`/post/${post.slug}`}
    //                 >
    //                   {post.title}
    //                 </Link>
    //               </Table.Cell>
    //               <Table.Cell>{post.category}</Table.Cell>
    //               <Table.Cell>
    //                 <span
    //                   onClick={() => {
    //                     showModal(true);
    //                     setPostIdToDelete(post._id);
    //                   }}
    //                   className="font-medium text-red-500 hover:underline cursor-pointer"
    //                 >
    //                   Delete
    //                 </span>
    //               </Table.Cell>
    //               <Table.Cell>
    //                 <Link
    //                   className="text-teal-500 hover:underline"
    //                   to={`/update-post/${post._id}`}
    //                 >
    //                   <span>Edit</span>
    //                 </Link>
    //               </Table.Cell>
    //             </Table.Row>
    //           </Table.Body>;
    //         })}
    //       </Table>
    //       {showMore && (
    //         <button
    //           onClick={handleShowMore}
    //           className="w-full text-teal-500 self-center text-sm py-7"
    //         >
    //           Show more
    //         </button>
    //       )}
    //     </>
    //   ) : (
    //     <p>There is no Post yet!</p>
    //   )}
    //   <Modal
    //     show={showModal}
    //     onClose={() => setShowModal(false)}
    //     popup
    //     size="md"
    //   >
    //     <Modal.Header />
    //     <Modal.Body>
    //       <div className="text-center">
    //         <HiOutlineExclamationCircle className="w-14 h-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
    //         <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
    //           Are you sure you want to delete this post
    //         </h3>
    //         <div className="flex justify-center gap-4">
    //           <Button color="failure" onClick={handleDeletePost}>
    //             Yes I'm sure
    //           </Button>
    //           <Button color="gray" onClick={() => setShowModal(false)}>
    //             No, Cancel
    //           </Button>
    //         </div>
    //       </div>
    //     </Modal.Body>
    //   </Modal>
    // </div>
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Date updated
                </th>
                <th scope="col" className="px-6 py-3">
                  Batch
                </th>
                <th scope="col" className="px-6 py-3">
                  RollNO
                </th>
                <th scope="col" className="px-6 py-3">
                  FeedBack
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  Delete
                </th>
                <th scope="col" className="px-6 py-3">
                  <span>Edit</span>
                </th> */}
              </tr>
            </thead>
            <tbody>
              {userPosts.map((post) => (
                <tr
                  key={post._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {new Date(post.createdAt).toLocaleDateString()}
                  </th>
                  <td className="px-6 py-4">
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    {" "}
                    <Link
                      className="font-medium text-gray-900 dark:text-white"
                      to={`/post/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4">{post.category}</td>

                  <td className="px-6 py-4">
                    {" "}
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      className="text-teal-500 hover:underline"
                      to={`/update-post/${post._id}`}
                    >
                      <span>Edit</span>
                    </Link>{" "}
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
        <p>There is no post yet!</p>
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
              <Button color="failure" onClick={handleDeletePost}>
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

export default DashPosts;
