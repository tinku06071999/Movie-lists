import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const SignupPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://movie-lists-server.vercel.app/api/signup',
             { name, email, password });
            console.log('Signup successful!', response.data.message);
            alert(response.data.message + " \nPlease Login now");
            navigate('/login');
          } catch (error) {
            // console.error('Signup error:', error.response.data);
             alert("already registred or\n" )
          }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-700 via-gray-900 to-black">
            <section className="register-container">
                <div className="container mx-auto p-8 max-w-lg bg-white rounded-lg shadow-xl">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">Signup</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                                type="text"
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form-control block w-full px-4 py-3 text-lg font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="Full name"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="email"
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control block w-full px-4 py-3 text-lg font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="Email address"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                name='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control block w-full px-4 py-3 text-lg font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="Password"
                            />
                        </div>
                        <button
                            type="submit"
                            className="inline-block w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                        >
                            Signup
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default SignupPage;
