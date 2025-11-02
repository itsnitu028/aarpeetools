
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { ShoppingCart } from "lucide-react";
import logo from "../../assets/logo-new.png";
import { GiHamburgerMenu } from 'react-icons/gi';
import AuthModal from "../Auth/AuthModal";
import "./Navbar.css";
import { MyContext } from "../../App";
import { User, LogOut } from "lucide-react";



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const context=useContext(MyContext);
  const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -6,
    top: 3,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 4px',
    background: "#ef2020ff"
  },
}));

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* Logo (Left) */}
        <div className="logo ">
          <Link to="/" className="cursor-pointer">
          <img src={logo} alt="Logo" className="h-18 w-30" />
        </Link>
        </div>

        {/* Links (Right) */}
        <ul className={`nav-links ${isOpen ? "active" : ""}`}>
          <li><Link to="/">Home</Link></li>
            <li><Link to="/category">Category</Link></li>
          <li><Link to="/product">Products</Link></li>
          <li><Link to="/about">About</Link></li>
          
          {/* Cart */}
          <li className="cursor-pointer" onClick={()=>{context.setOpenCartPanel(true);}}>
            {/* <Link to="/cart" className="cart-link"> */}
            
            <StyledBadge badgeContent={context.cartCount || 0} color="secondary">
            <ShoppingCart />
            </StyledBadge>
              
            {/* </Link> */}
          </li>

          {/* Login */}
          {/* <li> */}
            {/* <Link to="/login" className="login-btn">Login</Link> */}
            {/* <AuthModal /> */}
          {/* </li> */}

          {/* <li className="relative">
  {context.user ? (
    <div className="relative group flex items-center">
       */}
      {/* Rounded icon button */}
      {/* <button className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300 transition">
        <User strokeWidth={1} size={20} />
      </button> */}

      {/* Dropdown */}
      {/* <div className="dropdown-menu">
        <p className="dropdown-item">{context.user.name}</p>
        <button
          className="dropdown-item logout-btn flex items-center gap-2"
          onClick={context.logout}
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  ) : (
    <AuthModal />
  )}
</li> */}
{context.user ? (
        <li className="relative ">

          {/* Bootstrap Dropdown container */}
          <div className=" dropstart">

            {/* Icon button (your existing design) */}
            <button
              className="flex items-center justify-center h-10  rounded-full hover:bg-gray-300 transition"
              style={{ width: '30px', height: '40px' }}
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <User strokeWidth={1.25} size={20} />
            </button>

            {/* Bootstrap Dropdown Menu */}
            <ul
              className="dropdown-menu dropdown-menu-end mt-5"       
              aria-labelledby="dropdownMenuButton"
            >
              <li>
                <p className="dropdown-item">{context.user.name}</p>
              </li>
              <li>
                <button
                  className="dropdown-item flex items-center gap-2"
                  onClick={context.logout}
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </li>
            </ul>
          </div>

        </li>
      ) : (
        <AuthModal />
      )}

        </ul>

        {/* Hamburger Menu (mobile only) */}
        <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          <GiHamburgerMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
