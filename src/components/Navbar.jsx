import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleSignout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">To Do List</div>
      <div className="navbar-buttons">
        {!user ? (
          <>
            <Link to="/login" className="navbar-button">Login</Link>
            <Link to="/signup" className="navbar-button">Sign Up</Link>
          </>
        ) : (
            <div>
                <span className="username">{user.fullName}</span>
          <button onClick={handleSignout} className="navbar-button">
             Sign Out
          </button>
            </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;