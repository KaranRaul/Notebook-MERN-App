import React, { useContext } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/NoteContext';

import Alert from './Alert';
const Login = () => {
    const [msg, setMsg] = useState();
    let navigate = useNavigate();
    let bool = useState(false);
    const { setToken } = useContext(noteContext);
    const [login, setLogin] = useState({ "email": "", "password": "" });

    const onChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }


    const HandleSubmit = async (e) => {
        e.preventDefault();

        // LOGIN 
        const host = "http://localhost:5000"
        // const url = host + "/api/auth/login";
        const url = "https://notebook-app-ten.vercel.app/api/auth/login";

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(login)
        });
        console.log(login);

        const json = await response.json();
        console.log(json);
        if (json.error)
            setMsg(json.error)
        if (json.success) {
            //save to local storage
            localStorage.setItem('token', json.authToken)
            setToken(localStorage.getItem('token'));
            navigate("/home");
        }
    }
    return (
        <>
            <section className="vh-100" >
                {msg && <Alert messege={msg} />}
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card shadow-2-strong" style={{ "backgroundColor": "#adcfd0" }}>
                                <div className="card-body p-5 text-center " >

                                    <h3 className="mb-5">Sign in</h3>

                                    <div className="form-outline mb-4">
                                        <input type="email" id="email" onChange={onChange} name="email" className="form-control form-control-lg" />
                                        <label className="form-label" for="email">Email</label>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input type="password" id="password" onChange={onChange} name='password' className="form-control form-control-lg" />
                                        <label className="form-label" for="password">Password</label>
                                    </div>


                                    <div className="form-check d-flex justify-content-start mb-4">
                                        <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
                                        <label className="form-check-label" for="form1Example3"> Remember password </label>
                                    </div>

                                    <button type="button" role='button' className="btn btn-primary" onClick={HandleSubmit} >Submit</button>





                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Login
