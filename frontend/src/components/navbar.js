import React, { useContext, useEffect, useState, } from 'react'
import {
    useLocation, Link, useNavigate
} from "react-router-dom";
import noteContext from '../context/notes/NoteContext';


const NavBar = () => {
    const { token } = useContext(noteContext);
    let navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login')
    }



    let location = useLocation();


    return (
        <nav className="navbar font-weight-bold navbar-expand-lg  bg-dark ">
            {/* <link className="navbar-brand" to="/h"></link>navbar */}

            <div className="container-fluid ">
                <link className="navbar-brand" to="#"></link><p className='text-white'>Navbar</p>
                {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button> */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item y">
                            <a className="nav-link active" aria-current="page" href="/home"><p className='text-white mx-4 font-weight-bold'>Home</p></a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/about"><p className='text-white'>About</p></a>
                        </li>

                    </ul>
                    {!token ? (
                        <form className="d-flex form" style={{ "flexDirection": "row" }}>
                            <Link className="btn btn-primary " reloadDocument to="/login" role='button'>Login</Link>
                            <Link className="btn btn-primary mx-2" reloadDocument to="/signup" role='button'>SignUp</Link>

                        </form>) : <Link className="btn btn-primary mx-2" reloadDocument to="/login" role='button' onClick={handleLogout}>LogOut</Link>}
                </div>
            </div>
        </nav >

    )
}

export default NavBar
