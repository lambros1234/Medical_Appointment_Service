import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";
import Logo from "../assets/MediBookLogo.png";
import { isLoggedIn } from "../utils/auth";
import { Logout } from "../api/auth";
import ProfilePic from "../assets/Profile.jpg";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  let role = localStorage.getItem("role");
  try {
    role = JSON.parse(role)[0]; // take the first role
  } catch (e) {
    role = null;
  }


  // Define navigation per role
  const navByRole = {
    ROLE_PATIENT: [
      { name: "Home", href:"/"},
      { name: "Dashboard", href: "/dashboard" },
      { name: "Doctors", href: "/doctors" },
      { name: "My Appointments", href:"/appointments"}
    ],
    ROLE_DOCTOR: [
      {name: "Home", href:"/"},
      { name: "Dashboard", href: "/dashboard" },
      { name: "Manage Appointments", href: "/manage-appointments" },
      { name: "Availability", href:"/availability"},
    ],
    ROLE_ADMIN: [
      {name: "Home", href:"/"},
      { name: "Dashboard", href: "/#" },  // NOT FINISHED
      { name: "Users", href: "/users" },
      { name: "Reports", href: "/#" }, // NOT FINISHED
    ],
  };

  const navigation = navByRole[role] || [];

  return (
    <nav className="bg-gray-800 fixed top-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo + Navigation */}
          <div className="flex items-center">
            <img src={Logo} alt="MediBook Logo" className="h-20 w-auto -ml-4" />
            <div className="ml-6 flex space-x-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    "text-gray-300 hover:bg-white/5 hover:text-white",
                    "rounded-md px-3 py-2 text-sm font-medium"
                  )}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {isLoggedIn() ? (
              <>
                {/* Notifications */}
                <button
                  type="button"
                  className="relative rounded-full p-1 text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile Dropdown */}
                <Menu as="div" className="relative">
                  <MenuButton className="flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt="User avatar"
                      src={ProfilePic}
                      className="h-8 w-8 rounded-full bg-gray-800 outline outline-white/10"
                    />
                  </MenuButton>

                  <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-black/5">
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Your profile
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Settings
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          Logout();
                          window.location.href = "/login"; // redirect after logout
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </a>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </>
            ) : (
              <a
                href="/login"
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700"
              >
                Login
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
