import { BiTrashAlt } from "react-icons/bi";
import { formatDate } from "../../utils/helper";
import { toastError, toastSuccess } from "../../utils/toast";
import axios from "axios";
import { useSelector } from "react-redux";

const BlogCard = ({
  id,
  image,
  title,
  summary,
  content,
  time,
  onClick,
  author,
  fetchData,
}) => {
  const user = useSelector((state) => state.user.data);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/deleteBlog/${id}`
      );
      fetchData();
      console.log(response);
      toastSuccess("Blog deleted successfully");
    } catch (error) {
      console.log(error);
      toastError("Error deleting blog");
    }
  };

  // const formattedTime = new Date(time).toLocaleString();
  return (
    <div className="relative">
      <div
        className={`absolute right-5 bottom-5 ${
          user._id === author?._id || user.role === "admin" ? "" : "hidden"
        }`}
        onClick={() => handleDelete(id)}
      >
        <BiTrashAlt />
      </div>
      <article
        className="flex w-full overflow-hidden rounded-lg shadow transition hover:shadow-lg"
        onClick={onClick}
      >
        <div className="h-56 w-[320px] overflow-hidden">
          {/* Adjust dimensions as needed */}
          <img alt="Image" src={image} className="h-full w-full object-cover" />
        </div>

        <div className="bg-white p-4 sm:p-6 w-full flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <time datetime="2022-10-10" className="block text-xs text-gray-500">
              {formatDate(time)}
            </time>
            <span className="mt-2 line-clamp-3 text-sm/relaxed text-[#7b351f] font-medium">
              -{author?.firstName + " " + author?.lastName}
            </span>
          </div>

          <a href="#">
            <h3 className="mt-0.5 text-2xl text-[#4C2B21] ">{title}</h3>
          </a>

          <p className="mt-2 line-clamp-3 text-sm/relaxed text-[#7b351f] font-medium">
            {summary}
          </p>
          <p
            className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 "
            dangerouslySetInnerHTML={{ __html: content }}
          ></p>
        </div>
      </article>
    </div>
  );
};

export default BlogCard;
