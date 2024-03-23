import { useEffect, useState } from "react";
import { getSinglePost } from "../../apis/blog/getSinglePost";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { blogId } = useParams();

  const [blogData, setBlogData] = useState(null);

  const fetchBlogData = async () => {
    const blog = await getSinglePost(blogId);
    setBlogData(blog);
  };

  useEffect(() => {
    fetchBlogData();
    console.log(blogData?.content);
  }, []);

  // const blogs = blogData?.map((blog) => {
  //   //blogdata xa vani matra map garni (?)
  //   return (
  //     <IndividualBlogCard
  //       image={blog.image}
  //       title={blog.title}
  //       summary={blog.summary}
  //       content={blog.content}
  //       time={blog.createdAt}
  //       key={blog._id}
  //     />
  //   );
  // });

  return (
    <div>
      <section style={styles.outerSection}>
        <section style={styles.innerSection}>
          <div>
            {/* <div>
              <article className=" w-full overflow-hidden rounded-lg shadow transition hover:shadow-lg"> */}
            <div className="w-full rounded-lg shadow transition hover:shadow-lg">
              <article className="w-full">
                <img
                  alt="Image"
                  src={blogData?.image}
                  className="h-96 w-full object-cover"
                />

                <div className="h-full bg-white p-4 sm:p-6 w-full flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <time
                      datetime="2022-10-10"
                      className="block text-xs text-gray-500"
                    >
                      {new Date(blogData?.createdAt).toLocaleString()}
                    </time>
                    <span className="mt-2 line-clamp-3 text-sm/relaxed text-[#7b351f] font-medium">
                      -
                      {`${blogData?.user.firstName} ${blogData?.user.lastName}`}
                    </span>
                  </div>

                  <a href="#">
                    <h3 className="mt-0.5 text-2xl text-[#4C2B21]">
                      {blogData?.title}
                    </h3>
                  </a>

                  <p className="mt-2  text-sm/relaxed text-[#7b351f] font-medium">
                    {blogData?.summary}
                  </p>
                  <p
                    className="h-full mt-2  text-sm/relaxed text-gray-500"
                    style={{ textAlign: "justify" }}
                    dangerouslySetInnerHTML={{ __html: blogData?.content }}
                  ></p>
                </div>
              </article>
            </div>
          </div>
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
  },
};
