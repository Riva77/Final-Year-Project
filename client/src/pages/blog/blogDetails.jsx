import { useEffect, useState } from "react";
import { getPost } from "../../apis/blog/getPost";
import IndividualBlogCard from "../../components/card/IndividualBlogCard";


const BlogDetails = () => {
 
const [blogData, setBlogData] = useState(null);

const fetchBlogData= async()=>{
    const blog = await getPost();
    setBlogData(blog);
}

useEffect(()=>{
    fetchBlogData();
},[]);

const blogs = blogData?.map((blog) => {
    //blogdata xa vani matra map garni (?)
    return (
      <IndividualBlogCard
        image={blog.image}
        title={blog.title}
        summary={blog.summary}
        content={blog.content}
        time={blog.createdAt}
        key={blog._id}

      />
    );
  });

  return (
    <div>
      <section style={styles.outerSection}>
        <section style={styles.innerSection}>
        
        <div>{blogs}</div>

        </section>
      </section>
    </div>
  );
};

export default BlogDetails;

//CSS

const styles = {
  outerSection: {
    background: "#F1EEE3",
    // height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "end",
  },

  innerSection: {
    background: "#FDFBF7",
    width: "1100px",
    // height: "100vh",
    padding: "100px ",
    display: "flex",
    flexDirection: "column",
    gap: 30,
  }

 
  
  



};
