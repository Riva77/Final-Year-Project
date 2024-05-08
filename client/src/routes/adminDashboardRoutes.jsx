import { BiBookAlt, BiCube } from "react-icons/bi";
import { FaRegBookmark } from "react-icons/fa";
import { HiBookOpen, HiOutlineSquares2X2 } from "react-icons/hi2";
import { LuLayoutDashboard } from "react-icons/lu";

const iconClasses = `h-5 w-5 mr-3`;

export const adminRoutes = [
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    icon: <LuLayoutDashboard className={iconClasses} />,
  },
  {
    path: "/admin/products",
    name: "Products",
    icon: <BiCube className={iconClasses} />,
  },
  {
    path: "/admin/author",
    name: "Author",
    icon: <FaRegBookmark className={iconClasses} />,
  },
  {
    path: "/admin/genre",
    name: "Genre",
    icon: <HiOutlineSquares2X2 className={iconClasses} />,
  },
  {
    path: "/admin/orders",
    name: "Orders",
    icon: <HiOutlineSquares2X2 className={iconClasses} />,
  },
  {
    path: "/admin/blogs",
    name: "Blogs",
    icon: <BiBookAlt className={iconClasses} />,
  },
];
