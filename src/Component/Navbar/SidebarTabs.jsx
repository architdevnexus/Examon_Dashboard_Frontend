import { FaTachometerAlt, FaUsers, FaBoxOpen } from "react-icons/fa";
import { GiAchievement, GiNotebook } from "react-icons/gi";
import { MdHistory, MdOutlineReviews } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import { LuNotebookPen } from "react-icons/lu";
import {
  RiBloggerLine,
  RiContactsBook3Line,
  RiUserAddFill,
} from "react-icons/ri";
import { FaUserGear } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import {
  PiChalkboardSimpleBold,
  PiExamBold,
  PiFlagBannerFoldFill,
  PiVideoBold,
} from "react-icons/pi";

export const navItems = [
  {
    label: "Dashboard",
    icon: <FaTachometerAlt />,
    route: "/dashboard",
  },
  {
    label: "Notification",
    icon: <IoIosNotifications />,
    route: "/notification",
  },
  {
    label: "User Management",
    icon: <FaUserGear />,
    route: "/user-management",
  },
  {
    label: "Add Subuser",
    icon: <RiUserAddFill />,
    route: "/add-subuser",
  },
  {
    label: "Mentors",
    icon: <FaUsers />,
    route: "/mentors",
  },
  {
    label: "Home Quiz",
    icon: <GiNotebook />,
    route: "/home-quiz",
  },
  {
    label: "Study Material",
    icon: <FaBoxOpen />,
    subMenu: [
      {
        label: "Quiz",
        route: "/studymaterial/quiz",
        icon: <GiNotebook />,
      },
      {
        label: "PYQs",
        route: "/studymaterial/pyq",
        icon: <MdHistory />,
      },
      {
        label: "Notes",
        route: "/studymaterial/notes",
        icon: <LuNotebookPen />,
      },
    ],
  },
  // {
  //   label: "Courses",
  //   icon: <PiVideoBold />,
  //   route: "/courses",
  // },
  {
    label: "Batches",
    icon: <PiChalkboardSimpleBold />,
    route: "/batches",
  },
  {
    label: "Achievements",
    icon: <GiAchievement />,
    route: "/achievements",
  },
  {
    label: "Exam Details",
    icon: <PiExamBold />,
    route: "/exams",
  },
  {
    label: "Latest News",
    icon: <IoNewspaperOutline />,
    route: "/news",
  },
  {
    label: "Reviews",
    icon: <MdOutlineReviews />,
    route: "/reviews",
  },
  {
    label: "Banners",
    icon: <PiFlagBannerFoldFill />,
    route: "/banners",
  },
  {
    label: "Blogs",
    icon: <RiBloggerLine />,
    route: "/blogs",
  },
  {
    label: "Contact Us",
    icon: <RiContactsBook3Line />,
    route: "/contact-us",
  },
];
