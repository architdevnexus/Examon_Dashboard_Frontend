import { useEffect, useState } from "react";
import { useSidebar } from "./SidebarContext";
import {
  FaTachometerAlt,
  FaUsers,
  FaBoxOpen,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { NavLink, useLocation } from "react-router-dom";
// import Data from "../../DataStore/DataStore.json";
import { GiAchievement, GiNotebook } from "react-icons/gi";
import { MdHistory, MdOutlineReviews } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import { LuNotebookPen } from "react-icons/lu";
import { RiBloggerLine, RiContactsBook3Line } from "react-icons/ri";
import { FaUserGear } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import {
  PiChalkboardSimpleBold,
  PiExamBold,
  PiVideoBold,
} from "react-icons/pi";

const navItems = [
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
    label: "Mentors",
    icon: <FaUsers />,
    route: "/mentors",
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
  {
    label: "Courses",
    icon: <PiVideoBold />,
    route: "/courses",
  },
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

export default function Sidebar({ user }) {
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { collapsed, toggleCollapse } = useSidebar();

  const toggleDropdown = (label) => {
    setActiveDropdown((prev) => (prev === label ? null : label));
  };

  const isSubActive = (subMenu) =>
    subMenu?.some((item) => location.pathname.startsWith(item.route));

  useEffect(() => {}, [user]);

  if (!user) return;

  return (
    <aside
      className={`h-screen fixed z-50 top-0 left-0 bg-[var(--primary-color)] text-[var(--tertiary-color)] border-r border-[var(--border)] transition-all duration-300 font-[var(--font-family)] flex flex-col ${
        collapsed ? "w-20" : "w-72"
      }`}
    >
      {/* Profile & Collapse Toggle */}
      <div
        className={`flex ${
          collapsed ? "flex-col items-center gap-2" : "flex-row justify-between"
        } items-center p-4 border-b border-[var(--border)]`}
      >
        <div
          className={`flex items-center gap-4 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <img
            src={
              user?.avatar ||
              "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
            }
            alt="Admin"
            className="w-10 h-10 rounded-full"
          />
          {!collapsed && (
            <div className="text-sm">
              <p className="font-semibold uppercase text-[var(--text-color)]">
                {user?.fullname}
              </p>
              <p className="text-xs text-[var(--secondary-text)]">
                {user?.email}
              </p>
            </div>
          )}
        </div>

        <button
          onClick={() => toggleCollapse(!collapsed)}
          className="text-[var(--primary-text)] cursor-pointer hover:text-[var(--accent)] mt-2 md:mt-0"
        >
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {navItems.map((item, idx) => {
          const isActiveParent =
            activeDropdown === item.label || isSubActive(item.subMenu);
          return (
            <div key={idx}>
              {item.subMenu ? (
                <>
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md ${
                      isActiveParent
                        ? "border bg-[var(--accent-dark)] text-[var(--secondary-color)]"
                        : "text-[var(--primary-text)] hover:bg-[var(--accent-dark)] hover:text-[var(--secondary-color)]  "
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {item.icon}
                      {!collapsed && item.label}
                    </span>
                    {!collapsed &&
                      (isActiveParent ? (
                        <CiCircleChevUp className="text-lg" />
                      ) : (
                        <CiCircleChevDown className="text-lg" />
                      ))}
                  </button>
                  {!collapsed && isActiveParent && (
                    <div className="ml-7 mt-1 space-y-1">
                      {item.subMenu.map((sub, subIdx) => (
                        <NavLink
                          key={subIdx}
                          to={sub.route}
                          className={({ isActive }) =>
                            `flex items-center gap-2 px-3 py-1.5 text-sm  rounded-md transition ${
                              isActive
                                ? "  bg-[var(--accent-dark)]  text-[var(--secondary-color)]"
                                : "text-[var(--fade-color)] hover:bg-[var(--accent-dark)] hover:text-white"
                            }`
                          }
                        >
                          {sub.icon} {sub.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <NavLink
                  to={item.route}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-md transition ${
                      isActive
                        ? " border bg-[var(--accent-dark)] text-[var(--tertiary-color)]"
                        : "text-[var(--primary-text)] hover:bg-[var(--accent-dark)] hover:text-white"
                    }`
                  }
                >
                  {item.icon} {!collapsed && item.label}
                </NavLink>
              )}
            </div>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-[var(--border)]">
        <NavLink
          to="/logout"
          className="flex items-center gap-2 px-3 py-2 w-full rounded-md hover:text-red-600 hover:bg-[var(--accent-dark)]"
        >
          <FaSignOutAlt />
          {!collapsed && "Logout"}
        </NavLink>
      </div>
    </aside>
  );
}
