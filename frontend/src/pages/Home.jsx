import React, { useEffect, useState } from "react";

import CallToAction from "../components/CallToAction";
import PostCard from "../components/PostCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button, Label, Spinner, TextInput } from "flowbite-react";
export default function Home() {
  const { currentUser } = useSelector((state) => state.user);

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/api/post/getposts", {
        withCredentials: true,
      });
      const data = await res.data;
      if (res.status === 200 || res.status === 201) {
        setPosts(data.posts);
      }
    };
    fetchPosts();
  }, []);

  // today code
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");
  const handleChange = (e) => {
    if (e.target.value !== "instructor" && e.target.value !== "campusName") {
      setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    } else {
      setFormData({ ...formData });
    }
    if (e.target.value === "student") {
      setRole("student");
    } else if (e.target.value === "instructor") {
      setRole("instructor");
    } else if (e.target.value === "campusName") {
      setRole("campusName");
    }
    // if (e.target.name === "role" || e.target.name === "gender") {
    //   setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!formData.username || !formData.email || !formData.password) {
    //   return setErrorMessage("Please fill out the fields.");
    // }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await axios.post("/api/feedback/create", formData);
      const data = res.data;
      if (!res.status === 200 || !res.status === 201) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.status === 200 || res.status === 201) {
        // navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (
    // <div>
    //   <div classNameName="flex flex-col p-28 px-3 max-w-6xl mx-auto">
    //     <h1 classNameName="text-3xl font-bold lg:text-6xl">WelCome to my BLog</h1>
    //     <p className="text-gray-500 text-xs sm:text-sm py-6">
    //       If you’ve ever read a blog post, you’ve consumed content from a
    //       thought leader that is an expert in their industry. Chances are if the
    //       blog post was written effectively, you came away with helpful
    //       knowledge and a positive opinion about the writer or brand that
    //       produced the content.
    //     </p>
    //     <Link
    //       to="/search"
    //       className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
    //     >
    //       View all posts
    //     </Link>
    //   </div>
    //   <div className="p-3 bg-amber-100 dark:bg-slate-800">
    //     <CallToAction />
    //   </div>
    //   <div className="max-w-6xl mx-auto flex flex-col gap-8 py-7">
    //     {posts && posts.length > 0 && (
    //       <div className="flex flex-col gap-6">
    //         <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
    //         <div className="flex flex-wrap justify-center gap-4">
    //           {posts.map((post) => (
    //             <PostCard key={post._id} post={post} />
    //           ))}
    //         </div>
    //         <Link
    //           to={"/search"}
    //           className="text-lg text-teal-500 hover:underline text-center"
    //         >
    //           View all posts
    //         </Link>
    //       </div>
    //     )}
    //   </div>
    // </div>
    <div
      className="py-10 px-4 md:px-0"
      // style={{
      //   backgroundImage: "url(./webdevelopment.png)",
      //   backgroundRepeat: "no-repeat",
      // }}
    >
      <h3 className="text-center text-2xl pb-10">
        Hi {currentUser && currentUser.username} it is your FeedBack Form
      </h3>
      <form className="max-w-2xl mx-auto" onSubmit={handleSubmit}>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-5">
            <label
              htmlFor="fullName"
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Full Name
            </label>
            <label
              htmlFor="fullName"
              className="block mb-2 text-sm  text-gray-900 dark:text-white"
            >
              Please fill Your Full Name field
            </label>
            <input
              type="text"
              id="fullName"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Full Name"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <label
              htmlFor="fullName"
              className="block mb-2 text-sm  text-gray-900 dark:text-white"
            >
              Please fill Your Email field
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="name@flowbite.com"
              required
            />
          </div>
        </div> */}

        {/* <div className="mb-5">
          <label
            htmlFor="repeat-password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Roll No:
          </label>
          <input
            type="password"
            id="repeat-password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* <div className="mb-5">
            <label
              htmlFor="instructorName"
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Instructor Name
            </label>
            <label
              htmlFor="fullName"
              className="block mb-2 text-sm  text-gray-900 dark:text-white"
            >
              Please fill Your Instructor field
            </label>
            <input
              type="text"
              id="instructorName"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div> */}
          {/* <div className="mb-5">
            <label
              htmlFor="phoneNo"
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Phone No:
            </label>
            <label
              htmlFor="fullName"
              className="block mb-2 text-sm  text-gray-900 dark:text-white"
            >
              Please fill Your Phone No field
            </label>
            <input
              type="number"
              id="phoneNo"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div> */}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <h3 className="text-2xl py-2">Select Your FeedBack for:</h3>
          <div className="flex items-center  gap-8 ">
            <div className="flex items-center ">
              <input
                id="campusSelection"
                type="radio"
                name="role"
                value="campusName"
                onChange={handleChange}
                required={true}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="campusSelection"
                className="ms-2 text-md font-medium text-gray-900 dark:text-gray-300"
              >
                Campus
              </label>
            </div>
            {currentUser?.role === "teacher" ? (
              <div className="flex items-center">
                <input
                  id="student"
                  type="radio"
                  name="role"
                  value="student"
                  onChange={handleChange}
                  required={true}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="student"
                  className="ms-2 text-md font-medium text-gray-900 dark:text-gray-300"
                >
                  Student
                </label>
              </div>
            ) : (
              <div className="flex items-center ">
                <input
                  id="instructorSelection"
                  type="radio"
                  name="role"
                  value="instructor"
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="instructorSelection"
                  className="ms-2 text-md font-medium text-gray-900 dark:text-gray-300"
                >
                  Instructor
                </label>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 py-3 pb-5">
          {role === "student" ? (
            <>
              <div>
                <Label value="Student Name" />
                <TextInput
                  type="text"
                  placeholder="Student Name"
                  id="studentName"
                  onChange={handleChange}
                />
              </div>
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
          ) : role === "instructor" ? (
            <div className="">
              <label
                htmlFor="instructorName"
                className="block  mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Instructor
              </label>
              <label
                htmlFor="instructorName"
                className="block mb-2 text-sm text-gray-900 dark:text-white"
              >
                Please fill Your Instructor field
              </label>
              <select
                id="instructorName"
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option>Select Your Instructor</option>
                <option value="Sir Nadir" className="uppercase">
                  Sir Nadir
                </option>
                <option value="Sir Ghous Ahmed" className="uppercase">
                  Sir Ghous Ahmed
                </option>
              </select>
            </div>
          ) : role === "campusName" ? (
            <div className="">
              <label
                htmlFor="campusName"
                className="block  mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Campus Name
              </label>
              <label
                htmlFor="campusName"
                className="block mb-2 text-sm text-gray-900 dark:text-white"
              >
                Please fill Campus Name field
              </label>
              <select
                id="campusName"
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option>Select Your Campus</option>
                <option value="Bahadurabad" className="uppercase">
                  Bahadurabad
                </option>
                <option value="Gulshan" className="uppercase">
                  Ghulshan
                </option>
              </select>
            </div>
          ) : null}
          {currentUser?.role === "student" && (
            <div className="">
              <label
                htmlFor="course"
                className="block  mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Course
              </label>
              <label
                htmlFor="fullName"
                className="block mb-2 text-sm text-gray-900 dark:text-white"
              >
                Please fill Your Course field
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
          )}
        </div>
        <label
          htmlFor="feedback"
          className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
        >
          FeedBack
        </label>
        <label
          htmlFor="fullName"
          className="block mb-2 text-sm text-gray-900 dark:text-white"
        >
          Please fill Your FeedBack field
        </label>
        <textarea
          id="feedback"
          rows="4"
          onChange={handleChange}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write Your Feedback..."
        ></textarea>

        {/* <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
            />
          </div>
          <label
            htmlFor="terms"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            I agree with the{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              terms and conditions
            </a>
          </label>
        </div> */}
        <Button
          gradientDuoTone="greenToBlue"
          type="submit"
          disabled={loading}
          className="w-3/12 mt-8 text-md"
        >
          {loading ? (
            <>
              <Spinner size="sm" />
              <span className="pl-3">Loading...</span>
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </div>
  );
}
