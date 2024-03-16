import { FaUser } from "react-icons/fa";

const BlogCard = ({ image, title, summary, content, time, onClick }) => {
  const formattedTime = new Date(time).toLocaleString();
  return (
    <div onClick={onClick} >
      <article className="flex w-full overflow-hidden rounded-lg shadow transition hover:shadow-lg">
        <div className="h-56 w-[320px] overflow-hidden">
          {/* Adjust dimensions as needed */}
          <img alt="Image" src={image} className="h-full w-full object-cover" />
        </div>

        <div className="bg-white p-4 sm:p-6 w-full flex flex-col gap-1.5">
          <time datetime="2022-10-10" className="block text-xs text-gray-500">
            {formattedTime}
          </time>
          
          <a href="#">
            <h3 className="mt-0.5 text-2xl text-[#4C2B21] ">{title}</h3>
          </a>

          <p className="mt-2 line-clamp-3 text-sm/relaxed text-[#7b351f] font-medium">
            {summary}
          </p>
          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 ">
            {content}
          </p>
        </div>
      </article>
    </div>
  );
};

export default BlogCard;
