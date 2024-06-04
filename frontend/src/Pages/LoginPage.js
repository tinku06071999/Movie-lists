// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios'
// import Header from '../Components/Header';
// import Footer from '../Components/Footer';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// const LoginPage = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const { login } = useAuth();
//     const navigate = useNavigate();

//     const handleSubmit = async (e) =>{
//         e.preventDefault();
//         try {
//             const response = await axios.post('https://movie-lists-server.vercel.app/api/login',{
//                 email,
//                 password,
//            });
//            const token = response.data.token; // assuming the token is returned in the response
//            localStorage.setItem('token', token); // or set it in cookies
//            console.log("Login successful");
//            // Redirect user after successful login
//            navigate('/dashboard'); // Replace '/dashboard' with your desired route
//         } catch (error) {
//             console.log("Login Error", error.response.data.error);
//             alert("Login failed\n" + error.response.data.error);
//         }
//     }

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-700 via-gray-900 to-black">
//             <section className="login-container">
//                 <div className="container mx-auto p-8 max-w-lg bg-white rounded-lg shadow-xl">
//                     <div className="text-center mb-6">
//                         <h1 className="text-3xl font-bold text-gray-800">Login</h1>
//                     </div>
//                     <form onSubmit={handleSubmit}>
//                         <div className="mb-4">
//                             <input
//                                 type="email"
//                                 name='email'
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 className="form-control block w-full px-4 py-3 text-lg font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
//                                 placeholder="Email address"
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <input
//                                 type="password"
//                                 name='password'
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 className="form-control block w-full px-4 py-3 text-lg font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
//                                 placeholder="Password"
//                             />
//                         </div>
//                         <div className="text-center lg:text-left">
//                             <button
//                                 type="submit"
//                                 className="inline-block w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
//                             >
//                                 Login
//                             </button>
//                             <p className="text-sm font-semibold mt-2 pt-1 mb-0">
//                                 Don't have an account? 
//                                 <Link
//                                     to={"/signup"}
//                                     className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
//                                 >
//                                     signup
//                                 </Link>
//                             </p>
//                         </div>
//                     </form>
//                 </div>
//             </section>
//         </div>
//     );
// }

// export default LoginPage;


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://movie-lists-server.vercel.app/api/login', {
                email,
                password,
            });
            const token = response.data.token; // assuming the token is returned in the response
            localStorage.setItem('token', token); // or set it in cookies
            login(); // Update the authentication state
            console.log("Login successful");
            console.log(token, " while login");
            // Redirect user after successful login
            navigate('/dashboard'); // Replace '/dashboard' with your desired route
        } catch (error) {
            // console.log("Login Error", error.response?.data?.error || error.message);
            alert("Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-700 via-gray-900 to-black">
            <section className="login-container">
                <div className="container mx-auto p-8 max-w-lg bg-white rounded-lg shadow-xl">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">Login</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
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
                        <div className="text-center lg:text-left">
                            <button
                                type="submit"
                                className="inline-block w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                            >
                                Login
                            </button>
                            <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                                Don't have an account?
                                <Link
                                    to={"/signup"}
                                    className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                                >
                                    Signup
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default LoginPage;
