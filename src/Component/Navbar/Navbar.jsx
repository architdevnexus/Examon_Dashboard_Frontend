import { useEffect, useState } from "react";
import { useSidebar } from "./SidebarContext";
import { FaSignOutAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { NavLink, useLocation } from "react-router-dom";
import { navItems } from "./SidebarTabs";

export default function Sidebar({ user }) {
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { collapsed, toggleCollapse } = useSidebar();
  const [filteredTabs, setFilteredTabs] = useState([]);

  const toggleDropdown = (label) => {
    setActiveDropdown((prev) => (prev === label ? null : label));
  };

  const isSubActive = (subMenu) =>
    subMenu?.some((item) => location.pathname.startsWith(item.route));

  useEffect(() => {
    const allowedtbs = JSON.parse(localStorage.getItem("authUser")).allowedTabs;
    // console.log(allowedtbs);
    if (allowedtbs) {
      setFilteredTabs(navItems.filter((tab) => allowedtbs.includes(tab.label)));
    } else {
      setFilteredTabs([...navItems]);
    }
  }, [user]);

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
        {filteredTabs.map((item, idx) => {
          const isActiveParent =
            activeDropdown === item.label || isSubActive(item.subMenu);
          return (
            <div key={idx}>
              {item.subMenu ? (
                <>
                  <button
                    title={collapsed ? item.label : undefined}
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
                          {sub.icon} {!collapsed && sub.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <NavLink
                  title={collapsed ? item.label : undefined}
                  to={item.route}
                  onClick={() => toggleDropdown(item.label)}
                  className={({ isActive }) =>
                    `flex items-center  gap-2 px-3 py-2 rounded-md transition ${
                      isActive
                        ? " border bg-[var(--accent-dark)] text-[var(--tertiary-color)]"
                        : "text-[var(--primary-text)] hover:bg-[var(--accent-dark)] hover:text-white"
                    }`
                  }
                >
                  {item.icon} {!collapsed ? item.label : undefined}
                </NavLink>
              )}
            </div>
          );
        })}
      </nav>

      {/* Logout */}
      <div
        title={collapsed ? "Logout" : undefined}
        className="p-3 border-t border-[var(--border)]"
      >
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
