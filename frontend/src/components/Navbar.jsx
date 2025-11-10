import { useEffect, useRef, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useLocation, Link } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { Heart, ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, setUser, cart, favorite, axios, navigate } =
    useContext(AppContext);
  const [open, setOpen] = useState(false); // mobile menu
  const [profileOpen, setProfileOpen] = useState(false); // profile dropdown (desktop)
  const location = useLocation();

  const dropdownRef = useRef(null); // profile dropdown ref
  const mobileMenuRef = useRef(null); // mobile menu ref
  const hamburgerRef = useRef(null); // hamburger button ref (optional)

  // Close dropdown/menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // profile dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      // mobile menu
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/auth/logout");
      if (data.success) {
        toast.success(data.message);
        setUser(false);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const isActive = (path) =>
    location.pathname === path ? "text-secondary border-b border-primary" : "";

  return (
    <nav className="flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 py-3 border-b border-gray-300 bg-white relative transition-all">
      {/* Logo */}
      <Link to={"/"}>
        <img src={assets.logo} alt="Logo" className="w-32 md:w-42" />
      </Link>

      {/* Desktop Nav Links */}
      <div className="hidden sm:flex items-center gap-8">
        <Link to={"/"} className={isActive("/")}>
          Home
        </Link>
        <Link to={"/shop"} className={isActive("/shop")}>
          Shop
        </Link>
        <Link to={"/about"} className={isActive("/about")}>
          About
        </Link>
        <Link to={"/contact"} className={isActive("/contact")}>
          Contact
        </Link>
        <button
          onClick={() => navigate("/admin")}
          className="bg-primary text-white px-6 py-2 cursor-pointer rounded-full"
        >
          Admin
        </button>
      </div>

      {/* Right section: Cart, Wishlist, Profile (desktop), Hamburger (mobile) */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Cart */}
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <ShoppingBag className="w-6 h-6" />
          <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] flex items-center justify-center rounded-full">
            {cart ? cart.length : 0}
          </span>
        </div>

        {/* Wishlist */}
        <div
          onClick={() => navigate("/wishlist")}
          className="relative cursor-pointer"
        >
          <Heart className="w-6 h-6" />
          <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] flex items-center justify-center rounded-full">
            {favorite ? favorite.length : 0}
          </span>
        </div>

        {/* Profile (Desktop only) */}
        <div className="hidden sm:block relative" ref={dropdownRef}>
          {user ? (
            <>
              <img
                src={assets.profile_pic}
                alt="Profile"
                onClick={() => setProfileOpen((prev) => !prev)}
                className="w-10 h-10 rounded-full cursor-pointer"
              />
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-secondary shadow-lg rounded-lg transition duration-300 z-50">
                  <ul className="text-white">
                    <li
                      onClick={() => {
                        navigate("/my-orders");
                        setProfileOpen(false);
                      }}
                      className="cursor-pointer hover:bg-primary py-2 px-3"
                    >
                      My Orders
                    </li>
                    <li
                      onClick={() => {
                        logout();
                        setProfileOpen(false);
                      }}
                      className="cursor-pointer hover:bg-primary py-2 px-3"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="cursor-pointer px-6 py-2 bg-primary hover:bg-secondary transition text-white rounded-full"
            >
              Login
            </button>
          )}
        </div>

        {/* Hamburger (Mobile only) */}
        <button
          ref={hamburgerRef}
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Menu"
          className="sm:hidden"
        >
          <svg
            width="24"
            height="18"
            viewBox="0 0 24 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="2" rx="1" fill="#426287" />
            <rect y="8" width="24" height="2" rx="1" fill="#426287" />
            <rect y="16" width="24" height="2" rx="1" fill="#426287" />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div
          ref={mobileMenuRef}
          className="absolute top-[65px] right-0 w-[70%] bg-white shadow-md py-4 flex flex-col items-start gap-3 px-5 text-base md:hidden z-50"
        >
          <Link
            onClick={() => setOpen(false)}
            to={"/"}
            className={isActive("/")}
          >
            Home
          </Link>
          <Link
            onClick={() => setOpen(false)}
            to={"/shop"}
            className={isActive("/shop")}
          >
            Shop
          </Link>
          <Link
            onClick={() => setOpen(false)}
            to={"/about"}
            className={isActive("/about")}
          >
            About
          </Link>
          <Link
            onClick={() => setOpen(false)}
            to={"/contact"}
            className={isActive("/contact")}
          >
            Contact
          </Link>

          <button
            onClick={() => {
              navigate("/admin");
              setOpen(false);
            }}
            className="bg-primary text-white px-4 py-2 rounded-full"
          >
            Admin
          </button>

          {/* Profile (Mobile) */}
          {user ? (
            <>
              <button
                onClick={() => {
                  navigate("/my-orders");
                  setOpen(false);
                }}
                className="cursor-pointer text-left hover:text-primary"
              >
                My Orders
              </button>
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="cursor-pointer text-left hover:text-primary"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setOpen(false);
              }}
              className="cursor-pointer px-8 py-2 bg-primary hover:bg-secondary transition text-white rounded-full"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
