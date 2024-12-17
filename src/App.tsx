import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import BooksPage from "./pages/BooksPage";
import ComicsPage from "./pages/ComicsPage";
import SettingsPage from "./pages/Settings";
import Explore from "./pages/Explore";

function App() {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    return localStorage.getItem("sidebar-collapsed") === "true";
  });

  return (
    <Router>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar onCollapse={setIsCollapsed} />

        {/* Page Content */}
        <div
          className={`flex-1 ${
            isCollapsed ? "ml-20" : "ml-64"
          } transition-all duration-300 p-6 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-h-screen`}
        >
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/comics" element={<ComicsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
