
const BlogCard = ({ image, title, summary , content, time}) => {
  return (
    <div >
    
    <article className="flex w-full overflow-hidden rounded-lg shadow transition hover:shadow-lg">
  <img
    alt="Image"
    src={image}
    className="h-56 w-[241px] object-cover"
  />

  <div className="bg-white p-4 sm:p-6 w-full">
    <time datetime="2022-10-10" className="block text-xs text-gray-500">{time} </time>

    <a href="#">
      <h3 className="mt-0.5 text-lg text-gray-900">{title}</h3>
    </a>

    <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
    {summary}
    </p>
    <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
    {content}
    </p>
  </div>
</article>
    </div>
  );
};

export default BlogCard;
