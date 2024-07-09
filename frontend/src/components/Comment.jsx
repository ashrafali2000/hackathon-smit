import React, { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { Button, Textarea } from "flowbite-react";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";
export const Comment = ({ comment, onLike, onEdit, onDelete }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  const [editContent, setEditContent] = useState(comment.content);
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `https://mern-blog-app-one.vercel.app/api/user/${comment.userId}`,
          {
            withCredentials: true,
          }
        );
        if (res.status === 200 || res.status === 201) {
          const data = res.data;
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);
  const handleEdit = async () => {
    setIsEditing(true);
    setEditContent(comment.content);
  };
  const handleSave = async () => {
    try {
      const res = await axios.put(
        `https://mern-blog-app-one.vercel.app/api/comment/editComment/${comment._id}`,
        {
          content: editContent,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200 || res.status === 201) {
        setIsEditing(false);
        onEdit(comment, editContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          src={user.profilePicture}
          alt={user.username}
          className="h-10 w-10 rounded-full bg-gray-200"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <>
            <Textarea
              className="mb-2"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <div className="flex justify-end gap-2 text-xs">
              <Button
                onClick={handleSave}
                size="sm"
                gradientDuoTone="purpleToBlue"
                type="button"
              >
                Save
              </Button>
              <Button
                size="sm"
                gradientDuoTone="purpleToBlue"
                type="button"
                outline
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-500 pb-2">{comment.content}</p>
            <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
              <button
                type="button"
                onClick={() => onLike(comment._id)}
                className={`text-gray-400 hover:text-blue-500 ${
                  currentUser &&
                  comment.likes.includes(currentUser._id) &&
                  "!text-blue-500"
                }`}
              >
                <FaThumbsUp className="text-sm" />
              </button>
              <p className="text-gray-400">
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    " " +
                    (comment.numberOfLikes === 1 ? "like" : "likes")}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <>
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="text-gray-400 hover:text-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(comment._id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      Delete
                    </button>
                  </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
