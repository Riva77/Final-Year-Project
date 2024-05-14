import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogCard from "../../../components/card/BlogCard";
import CustomButton from "../../../components/buttons/CustomButton";
import { toastSuccess } from "../../../utils/toast";
import Spinner from "../../../components/spinner/spinner";

const AdminBlogs = () => {
  const navigate = useNavigate();

  const [blogData, setBlogData] = useState(null);

  const handlePostClick = (blogId) => {
    navigate(`/blog/blogDetails/${blogId}`);
  };

  const fetchBlogData = async () => {
    const blog = await axios.get("http://localhost:8000/api/getAllBlogs");

    setBlogData(blog.data);
    console.log(await blog);
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  const handleBlogApproval = async (blogId, approval) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/approveBlog/${blogId}`,
        { approval: approval }
      );
      if (response.status === 200) {
        toastSuccess(`Blog ${approval}!`);
      }
      fetchBlogData();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  if (!blogData) {
    return <Spinner message={"Loading blogs.."} />;
  }

  const blogs = blogData?.map((blog) => {
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
          id={blog?._id}
          image={blog.image}
          title={blog.title}
          summary={blog.summary}
          content={blog.content}
          time={blog.createdAt}
          key={blog._id}
          author={blog.user}
          onClick={() => handlePostClick(blog?._id)}
          fetchData={fetchBlogData}
        />
        {blog.approval === "pending" && (
          <div className="flex justify-end gap-2">
            <button
              className="bg-green-500 text-white rounded-md py-1 px-3"
              onClick={() => handleBlogApproval(blog._id, "approved")}
            >
              Approve
            </button>
            <button
              className="bg-red-500 text-white rounded-md py-1 px-3"
              onClick={() => handleBlogApproval(blog._id, "declined")}
            >
              Decline
            </button>
          </div>
        )}
      </div>
    );
  });

  return <div className="flex flex-col gap-5">{blogs}</div>;
};

export default AdminBlogs;
