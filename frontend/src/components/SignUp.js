import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';

const SignUp = () => {

    let navigate = useNavigate();
    const [signup, setSignup] = useState({ "name": "", "email": "", "password": "" });
    const [bool, setBool] = useState();
    const onChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value })
    }


    const HandleSubmit = async (e) => {
        e.preventDefault();

        // LOGIN 
        const host = "http://localhost:5000"
        const url = "https://notebook-app-ten.vercel.app/api/auth/createUser";

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signup)
        });
        console.log(signup);

        const json = await response.json();
        console.log(json);
        if (json.errors) {
            console.log(json.errors);
            setBool(json.errors);
            return;
        }
        else {
            localStorage.setItem('token', json.authToken)
            navigate("/home");
        }

    }
    return (
        <div className='container mb-5'>
            {bool && <Alert messege={bool} />
            }
            <div class="mask d-flex align-items-center h-100 gradient-custom-3">
                <div class="container h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div class="card" style={{ "border-radius": "15px;" }}>
                                <div class="card-body p-5">
                                    <h2 class="text-uppercase text-center mb-5">Create an account</h2>

                                    <form>

                                        <div class="form-outline mb-4">
                                            <input type="name" name="name" id="form3Example1cg" onChange={onChange} class="form-control form-control-lg" />
                                            <label class="form-label" for="form3Example1cg">Your Name</label>
                                        </div>

                                        <div class="form-outline mb-4">
                                            <input type="email" name='email' id="form3Example3cg" onChange={onChange} class="form-control form-control-lg" />
                                            <label class="form-label" for="form3Example3cg">Your Email</label>
                                        </div>

                                        <div class="form-outline mb-4">
                                            <input type="password" name="password" id="password" onChange={onChange} class="form-control form-control-lg" />
                                            <label class="form-label" for="form3Example4cg">Password</label>
                                        </div>


                                        <div class="d-flex justify-content-center">
                                            <button type="button"
                                                class="btn btn-success btn-block btn-lg gradient-custom-4 text-body " onClick={HandleSubmit}>Register</button>
                                        </div>


                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SignUp;
