﻿import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../AuthContext';

const Layout = ({ children }) => {
    const { user } = useAuthContext();
    const isLoggedIn = !!user;

    return (
        <div>

            <header>
                <nav className="navbar navbar-expand-sm navbar-dark fixed-top bg-dark border-bottom box-shadow">
                    <div className="container">
                        <Link to='/' className="navbar-brand">React Bookmark Manager</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                            <ul className="navbar-nav flex-grow-1">
                                {!isLoggedIn && <li className="nav-item"><Link className='nav-link text-light' to='/signup'>Signup</Link></li>}
                                {!isLoggedIn && <li className="nav-item"><Link className='nav-link text-light' to='/login'>Login</Link></li>}
                                {isLoggedIn && <li className="nav-item"><Link className='nav-link text-light' to='/mybookmarks'>My Bookmarks</Link></li>}
                                {isLoggedIn && <li className="nav-item"><Link className='nav-link text-light' to='/addbookmark'>Add Bookmark</Link></li>}
                                {isLoggedIn && <li className="nav-item"><Link className='nav-link text-light' to='/logout'>Logout</Link></li>}
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <div className="container" style={{ marginTop: 60 }}>
                {children}
            </div>

        </div >
    )
}

export default Layout;