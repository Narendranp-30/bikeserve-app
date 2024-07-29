import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Navbar.css';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
    <div className="container">
      <Link to="/home" className="navbar-brand">
        Turbo Bike Service
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/home" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/services" className="nav-link">
              Service List
            </Link>
          </li>
          {user ? (
            <>
              <li className="nav-item">
                <Link to="/customer-dashboard" className="nav-link">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <button onClick={onLogout} className="btn btn-link nav-link">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  </nav>
    );
};

export default Navbar;



// // src/components/Home/Navbar.js
// import React from 'react';
// import '../../styles/Navbar.css';
// import { Link } from 'react-router-dom';

// const Navbar = ({ user, onLogout }) => {
//   return (
//     <nav className="navbar">
//       <div className="container">
//         <Link to="/" className="navbar-brand">
//           Bike Service App
//         </Link>
//         <div className="navbar-links">
//           {user ? (
//             <>
//               <Link to="/customer-dashboard">Dashboard</Link>
//               <Link to="/services">Services</Link>
//               <button onClick={onLogout}>Logout</button>
//             </>
//           ) : (
//             <>
//               <Link to="/login">Login</Link>
//               <Link to="/register">Register</Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// //41