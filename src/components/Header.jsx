"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { logout } from "../store/methods/authMethod";
import { reset } from "../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  LogOut,
  User,
  Home as HomeIcon,
  CloudUpload,
  Menu,
  X,
} from "lucide-react";

function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { success, isAuthenticated, uid } = useSelector((state) => state.auth);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (success) {
      router.push(`/`);
      dispatch(reset());
    }
  }, [dispatch, success, router]);

  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-gray-800">
              Next SM
            </Link>
          </div>

          <div className="hidden sm:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link
                  href="/"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <HomeIcon size={18} />
                  Home
                </Link>
                <Link
                  href="/upload"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <CloudUpload size={18} />
                  Upload
                </Link>
                <Link
                  href={`/profile`}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <User size={18} />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <div className="sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 p-2 rounded-md"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="sm:hidden bg-white shadow-md px-4 py-2 mb-4">
            {isAuthenticated ? (
              <>
                <Link
                  href="/"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900  px-3 py-2 rounded-md text-sm font-medium"
                >
                  <HomeIcon size={18} />
                  Home
                </Link>
                <Link
                  href="/upload"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900  px-3 py-2 rounded-md text-sm font-medium"
                >
                  <CloudUpload size={18} />
                  Upload
                </Link>
                <Link
                  href={`/profile`}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900  px-3 py-2 rounded-md text-sm font-medium"
                >
                  <User size={18} />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-white bg-red-500 hover:bg-red-600  w-full px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-blue-500 hover:bg-blue-600 text-white block px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
