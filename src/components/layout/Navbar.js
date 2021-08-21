
import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      setIsAuth(true);
    }
  }, []);

  return (


    <nav className="navbar  navbar-light bg-light">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          
              <li className="nav-item active">
              <Link className="navbar-brand" to='/'>Dashboard</Link>
                </li>
  
        </ul>
        <div className="form-inline my-2 my-lg-0">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            {isAuth === true ? (
              <Fragment>
                {' '}
                  <li className="nav-item">
                    <Link className="navbar-brand" to='/logout'>Logout</Link>
                  </li>
              </Fragment>
              ) : (
              <Fragment>
                {' '}
                  <li className="nav-item">
                    <Link className="navbar-brand" to='/login'>Login</Link>
                  </li>
              </Fragment>
            )}
          </ul>
      </div>
    </nav>

  );
};

export default Navbar;

