import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  IconSun,
  IconMoon,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarRightCollapse,
  IconBook,
  IconBooks,
  IconWorld,
  IconSettings,
} from "@tabler/icons-react";

interface SidebarProps {
  onCollapse: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onCollapse }) => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState<string>(location.pathname);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    return localStorage.getItem("sidebar-collapsed") === "true";
  });

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

  // Toggle dark mode
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // Toggle sidebar collapse
  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
    localStorage.setItem("sidebar-collapsed", (!isCollapsed).toString());
    onCollapse(!isCollapsed);
  };

  return (
    <div
      className={`h-screen ${
        isCollapsed ? "w-20" : "w-64"
      } bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex flex-col justify-between fixed shadow-lg transition-all duration-300 ease-in-out`}
    >
      {/* Top Section */}
      <div>
        <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700">
          {!isCollapsed && (
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
              Orca Hub
            </h2>
          )}
          <button
            onClick={toggleSidebar}
            className="flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition duration-200"
          >
            {isCollapsed ? (
              <IconLayoutSidebarRightCollapse size={24} stroke={1.5} />
            ) : (
              <IconLayoutSidebarLeftCollapse size={24} stroke={1.5} />
            )}
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-4">
            <li>
              <Link
                to="/explore"
                className={`flex items-center ${
                  currentPage === "/explore"
                    ? "text-blue-500 dark:text-blue-400 font-semibold"
                    : "hover:text-blue-500 dark:hover:text-blue-400"
                } transition duration-200`}
              >
                <IconWorld size={24} stroke={1.5} />
                {!isCollapsed && <span className="ml-2">Explore</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className={`flex items-center ${
                  currentPage === "/"
                    ? "text-blue-500 dark:text-blue-400 font-semibold"
                    : "hover:text-blue-500 dark:hover:text-blue-400"
                } transition duration-200`}
              >
                <IconBooks size={24} stroke={1.5} />
                {!isCollapsed && <span className="ml-2">Books</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/comics"
                className={`flex items-center ${
                  currentPage === "/comics"
                    ? "text-blue-500 dark:text-blue-400 font-semibold"
                    : "hover:text-blue-500 dark:hover:text-blue-400"
                } transition duration-200`}
              >
                <IconBook size={24} stroke={1.5} />
                {!isCollapsed && <span className="ml-2">Comics</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-300 dark:border-gray-700">
        {/* Dark Mode Toggle */}
        <div
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "justify-between"
          } mb-4`}
        >
          {!isCollapsed && (
            <span className="text-sm font-medium">🌙 Dark Mode</span>
          )}
          <button
            onClick={toggleDarkMode}
            className="flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition duration-200"
          >
            {isDarkMode ? (
              <IconSun size={24} stroke={1.5} />
            ) : (
              <IconMoon size={24} stroke={1.5} />
            )}
          </button>
        </div>

        {/* Settings Button */}
        <Link
          to="/settings"
          className={`flex items-center justify-center px-4 py-2 rounded-md ${
            currentPage === "/settings"
              ? "bg-blue-500 dark:bg-blue-600 text-white"
              : "bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600"
          } transition duration-200`}
        >
          <IconSettings size={24} stroke={1.5} />
          {!isCollapsed && <span className="ml-2">Settings</span>}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
