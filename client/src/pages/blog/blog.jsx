import { useState } from "react";
import { getPost } from "../../apis/blog/getPost";
import CustomButton from "../../components/buttons/CustomButton";
import { useEffect } from "react";
import BlogCard from "../../components/card/BlogCard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";

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

  const user = useSelector((state) => state.user.data);

  useEffect(() => {
    fetchBlogData();
  }, []);

  const blogs = blogData?.map((blog) => {
    //blogdata xa vani matra map garni (?)
    return (
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
        fetchData={fetchBlogData}
      />
    );
  });
  return (
    <div>
      <section style={styles.backgroundContainer}>
        <section style={styles.container} className="overflow-y-auto cool-scroll">
          {user && (
            <CustomButton
              name="Create Post"
              onClick={() => navigate("/createPost")}
            />
          )}
          <div style={styles.blogContainer}>{blogs}</div>
        </section>
      </section>
      {/* <Footer /> */}
    </div>
  );
};

export default Blog;

const styles = {
  backgroundContainer: {
    background: "#F1EEE3",
     height: "91vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "end",
  },
  container: {
    background: "#FDFBF7",
    height: "91vh",
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
