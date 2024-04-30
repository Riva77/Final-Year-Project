import { useState } from "react";
import { getPost } from "../../apis/blog/getPost";
import CustomButton from "../../components/buttons/CustomButton";
import { useEffect } from "react";
import BlogCard from "../../components/card/BlogCard";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const navigate = useNavigate();

  const [blogData, setBlogData] = useState(null);

  const handlePostClick = (blogId) => {
    navigate(`/blog/blogDetails/${blogId}`);
  };

  const fetchBlogData = async () => {
    const blog = await getPost();
    setBlogData(blog);
    console.log(await blog);
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  const blogs = blogData?.map((blog) => {
    //blogdata xa vani matra map garni (?)
    return (
      <BlogCard
        image={blog.image}
        title={blog.title}
        summary={blog.summary}
        content={blog.content}
        time={blog.createdAt}
        key={blog._id}
        author={`${blog.user?.firstName} ${blog.user?.lastName}`}
        onClick={() => handlePostClick(blog?._id)}
      />
    );
  });
  return (
    <div>
      <section style={styles.backgroundContainer}>
        <section style={styles.container}>
          <CustomButton
            name="Create Post"
            onClick={() => navigate("/createPost")}
          />
          <div style={styles.blogContainer}>{blogs}</div>
        </section>
      </section>
    </div>
  );
};

export default Blog;

const styles = {
  backgroundContainer: {
    background: "#F1EEE3",
    // height: "91vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "end",
  },
  container: {
    background: "#FDFBF7",
    // height: "91vh",
    width: "1100px",
    padding: "100px ",
    display: "flex",
    flexDirection: "column",
    gap: 30,
  },
  blogContainer: {
    width: "100%",
    display: "flex",
    gap: 20,
    flexDirection: "column",
    cursor: "pointer",
  },
};
