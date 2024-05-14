import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../../components/spinner/spinner";
import axios from "axios";
import BlogCard from "../../../components/card/BlogCard";
import { useNavigate } from "react-router-dom";

const UserBlog = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.data);
  const [userBlogs, setUserBlogs] = useState();

  const handlePostClick = (blogId) => {
    navigate(`/blog/blogDetails/${blogId}`);
  };

  const fetchUserBlogs = async (e) => {
    try {
      const blogs = await axios.get(
        `http://localhost:8000/api/getUserBlog/${user?._id}`
      );
      setUserBlogs(blogs.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserBlogs();
  }, []);

  if (!userBlogs) {
    return <Spinner message={"Loading Blogs..."} />;
  }

  const blogs = userBlogs?.map((blog) => {
    //blogdata xa vani matra map garni (?)
    return (
      <div className="flex flex-col gap-5 rounded-md p-2 hover:bg-[#FFFFFF]">
        <div
          className={` w-20 text-white rounded-md text-center px-3 py-1 text-xs ${
            blog.approval === "pending"
              ? "bg-yellow-500"
              : blog.approval === "declined"
              ? "bg-red-500"
              : "bg-green-500"
          }`}
        >
          {blog.approval[0].toUpperCase() + blog.approval.substring(1)}
        </div>
        <BlogCard
          id={blog._id}
          image={blog.image}
          title={blog.title}
          summary={blog.summary}
          content={blog.content}
          time={blog.createdAt}
          key={blog._id}
          author={blog.user}
          onClick={() => handlePostClick(blog?._id)}
          fetchData={fetchUserBlogs}
        />
      </div>
    );
  });
  return <div className="flex flex-col gap-5">{blogs}</div>;
};

export default UserBlog;
