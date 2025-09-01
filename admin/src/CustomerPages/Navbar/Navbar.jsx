
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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
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
            
            <StyledBadge badgeContent={1} color="secondary">
            <ShoppingCart />
            </StyledBadge>
              
            {/* </Link> */}
          </li>

          {/* Login */}
          <li>
            {/* <Link to="/login" className="login-btn">Login</Link> */}
            <AuthModal />
          </li>
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
