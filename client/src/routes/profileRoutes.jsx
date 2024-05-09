import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { FaRegBookmark } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { BiBookAlt, BiCube } from "react-icons/bi";

const iconClasses = `h-5 w-5 mr-3`;

const profileRoute = [
  {
    path: "/profile/orders",
    icon: <HiOutlineSquares2X2 className={iconClasses} />,
    name: "Orders",
  },
  {
    path: "/profile/favourites",
    icon: <FaRegBookmark className={iconClasses} />,
    name: "Favourites",
  },
  {
    path: "/profile/account-settings",
    icon: <IoSettingsOutline className={iconClasses} />,
    name: "Account Settings",
  },
  {
    path: "/profile/blogs",
    name: "My Blogs",
    icon: <BiBookAlt className={iconClasses} />,
  },
];

export default profileRoute;
