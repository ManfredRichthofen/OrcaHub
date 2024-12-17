import React from "react";
import { IconSettings, IconSun } from "@tabler/icons-react";

const SettingsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      {/* Page Title */}
      <div className="flex items-center mb-6">
        <IconSettings
          size={32}
          stroke={1.5}
          className="text-blue-500 dark:text-blue-400 mr-2"
        />
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
          Settings
        </h2>
      </div>

      {/* Page Description */}
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Customize your Orca Hub experience here.
      </p>

      {/* Theme Selection */}
      <div className="mt-6">
        <label
          htmlFor="theme-select"
          className="block mb-2 font-medium text-gray-800 dark:text-gray-300"
        >
          Theme
        </label>
        <div className="relative">
          <select
            id="theme-select"
            className="w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <IconSun
              size={20}
              className="text-gray-400 dark:text-gray-300"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="mt-8">
        <label
          className="block mb-2 font-medium text-gray-800 dark:text-gray-300"
        >
          Notification Preferences
        </label>
        <div className="space-y-4">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-500 dark:text-blue-400 border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-700 dark:text-gray-300">
              Email Notifications
            </span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-500 dark:text-blue-400 border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-700 dark:text-gray-300">
              Push Notifications
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
