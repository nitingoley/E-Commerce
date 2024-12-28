import {
  ShoppingBag,
  UserPlus,
  LogIn,
  Lock,
  LogOutIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
  const {user , logout} = useUserStore();
  const isAdmin = user?.role === "admin";
  const {cart} = useCartStore();

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-[rgba(255,125,69,0.7)] via-[rgba(230,45,100,0.7)] to-[rgba(60,10,90,0.7)] shadow-lg z-40 border-b border-[rgba(255,125,69,0.5)]">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap justify-between items-center">
        <Link
          to={"/"}
          className="text-2xl font-bold text-white items-center space-x-2 flex"
        >
          E-Commerce
        </Link>

        <nav className="flex flex-wrap items-center gap-4">
          <Link
            to="/"
            className="text-gray-300 hover:text-white transition duration-300 sm:hidden ease-in-out"
          >
            Home
          </Link>

          {user && (
            <Link to="/cart" className="relative">
              <ShoppingBag
                className="inline-block mr-1 group-hover:"
                size={24}
              />
              <span className="hidden sm:inline">Cart</span>
              <span className="absolute -top-2 -right-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 text-xs duration-300 ease-in-out">
              {cart.length}
              </span>
            </Link>
          )}

          {isAdmin && (
            <Link to={"/secret-dashboard"} className="bg-gradient-to-r from-[#FF7D45] to-[#E62D64] hover:bg-gradient-to-r hover:from-[#E62D64] hover:to-[#3C0A5A] text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center">
              <Lock className="inline-block mr-1" size={18} />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          )}

          {user ? (
            <button  
             onClick={logout}
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-2 rounded-md flex items-center transition duration-300 ease-in-out">
              <LogOutIcon size={18} />
              <span className="hidden sm:inline">Log Out</span>
            </button>
          ) : (
            <>
              <Link
                to={"/signup"}
                className="bg-gradient-to-r from-[#FF7D45] to-[#E62D64] hover:bg-gradient-to-r hover:from-[#E62D64] hover:to-[#3C0A5A] text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
              >
                <UserPlus className="mr-2" size={18} />
                Sign Up
              </Link>
              <Link
                to={"/login"}
                className="bg-gradient-to-r from-[#FF7D45] to-[#E62D64] hover:bg-gradient-to-r hover:from-[#E62D64] hover:to-[#3C0A5A] text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
              >
                <LogIn className="mr-2" size={18} />
                Login
              </Link>
            </>
          )}
        </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
