import Bars from "./Bars";
import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";
import Loader from "./Loading.component";
import { logout } from "../services/auth.service";

const Navbar = () => {
  const [barState, setBarState] = useState(false);
  const { user, setUser, loading } = useContext(UserContext);
  let history = useHistory();

  const handleClick = async () => {
    if (!user) {
      history.push("/login");
      return;
    }

    await logout();
    setUser(null);
  };

  return (
    <header className="glassmorphism relative w-full max-w-[98%] mx-auto grid grid-cols-3 items-center px-8 md:px-16 lg:px-20 py-4 md:py-5 mt-4 mb-8 transition-all duration-300">
      {/* Logo - Left */}
      <div className="flex-shrink-0 z-20 justify-self-start">
        <img
          className="h-8 md:h-10 lg:h-12 transition-transform duration-300 hover:scale-110"
          src="/Images/logo.png"
          alt="Logo"
        />
      </div>

      {/* Navigation Links - Centered */}
      <nav
        className={
          barState
            ? "absolute md:relative top-full left-0 right-0 md:top-auto md:col-start-2 md:col-end-3 md:row-start-1 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 lg:gap-12 bg-background-secondary md:bg-transparent w-full md:w-auto py-4 md:py-0 mt-2 md:mt-0 rounded-xl md:rounded-none transition-all duration-300 ease-in-out z-30 opacity-100 translate-y-0"
            : "absolute md:relative top-full left-0 right-0 md:top-auto md:col-start-2 md:col-end-3 md:row-start-1 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 lg:gap-12 bg-background-secondary md:bg-transparent w-full md:w-auto py-4 md:py-0 mt-2 md:mt-0 rounded-xl md:rounded-none transition-all duration-300 ease-in-out z-30 opacity-0 md:opacity-100 -translate-y-4 md:translate-y-0 pointer-events-none md:pointer-events-auto max-md:invisible max-md:md:visible"
        }
      >
        <Link
          to="/"
          className="relative text-text-primary uppercase text-sm md:text-base font-semibold tracking-wide transition-all duration-300 hover:text-primary group px-3 py-2"
        >
          <span className="relative z-10">Home</span>
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
        </Link>
        <Link
          to="/auction"
          className="relative text-text-primary uppercase text-sm md:text-base font-semibold tracking-wide transition-all duration-300 hover:text-primary group px-3 py-2"
        >
          <span className="relative z-10">Auction</span>
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
        </Link>
        {user && (
          <Link
            to="/players"
            className="relative text-text-primary uppercase text-sm md:text-base font-semibold tracking-wide transition-all duration-300 hover:text-primary group px-3 py-2"
          >
            <span className="relative z-10">Players</span>
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
          </Link>
        )}
        <Link
          to="/auctions/played"
          className="relative text-text-primary uppercase text-sm md:text-base font-semibold tracking-wide transition-all duration-300 hover:text-primary group px-3 py-2"
        >
          <span className="relative z-10">Previous</span>
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
        </Link>
      </nav>

      {/* Login/Logout Button - Right */}
      <div className="flex-shrink-0 z-20 justify-self-end">
        {!loading ? (
          <button
            onClick={() => handleClick()}
            className="relative px-6 md:px-8 py-2.5 md:py-3 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-semibold text-sm md:text-base uppercase tracking-wide overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 hover:scale-105 group"
          >
            <span className="relative z-10 flex items-center gap-2">
              {user ? "Logout" : "Login"}
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-primary-dark to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        ) : (
          <Loader size="2" />
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden absolute top-4 right-4 z-30">
        <Bars barState={barState} setBarState={setBarState} />
      </div>
    </header>
  );
};

export default Navbar;
