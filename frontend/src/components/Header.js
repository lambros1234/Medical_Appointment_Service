import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/MediBookLogo.png";
import ProfilePic from "../assets/Profile.jpg";
import { isLoggedIn } from "../utils/auth";
import { Logout } from "../api/auth";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import NotificationDropdown from "./NotificationDropdown";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();

  const [notifications, setNotifications] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // Safe role parsing
  let role = localStorage.getItem("role");
  if (role && role.startsWith("[")) {
    try {
      role = JSON.parse(role)[0];
    } catch {
      role = null;
    }
  }

  // Fetch notifications
  useEffect(() => {
    if (!loggedIn) return;

    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:8080/api/notifications/unread",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNotifications(res.data);
      } catch (err) {
        console.log("No notifications or endpoint not ready");
      }
    };

    fetchNotifications();
  }, [loggedIn]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navByRole = {
    ROLE_PATIENT: [
      { name: "Home", href: "/" },
      { name: "Doctors", href: "/doctors" },
      { name: "My Appointments", href: "/appointments" },
    ],
    ROLE_DOCTOR: [
      { name: "Home", href: "/" },
      { name: "Manage Appointments", href: "/doctor-appointments" },
      { name: "Availability", href: "/availability" },
    ],
    ROLE_ADMIN: [
      { name: "Home", href: "/" },
      { name: "Users", href: "/users" },
    ],
  };

  const navigation = navByRole[role] || [];

  const handleLogout = () => {
    Logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 fixed top-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">

          {/* Logo + Navigation */}
          <div className="flex items-center">
            <Link to="/">
              <img src={Logo} alt="MediBook Logo" className="h-20 w-auto -ml-4" />
            </Link>

            {loggedIn && (
              <div className="ml-6 flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-gray-300 hover:bg-white/5 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {loggedIn ? (
              <>
                {/* Bell + Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(prev => !prev)}
                    className="relative rounded-full p-1 text-gray-400 hover:text-white"
                  >
                    <BellIcon className="h-6 w-6" />
                    {notifications.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                        {notifications.length}
                      </span>
                    )}
                  </button>

                  <NotificationDropdown
                    open={dropdownOpen}
                    notifications={notifications}
                    setNotifications={setNotifications} // pass setter to update badge
                  />
                </div>

                {/* Profile */}
                <Menu as="div" className="relative">
                  <MenuButton className="flex rounded-full">
                    <img
                      alt="User avatar"
                      src={ProfilePic}
                      className="h-8 w-8 rounded-full"
                    />
                  </MenuButton>

                  <MenuItems className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block w-full text-left px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Sign out
                        </button>
                      )}
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </>
            ) : (
              <Link
                to="/login"
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}