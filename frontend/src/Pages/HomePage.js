// src/Components/HomePage.js
import React from 'react';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-2xl font-bold">MovieApp</a>
          <div>
            <a href="/login" className="text-lg mx-2 hover:text-gray-400">Login</a>
            <a href="/signup" className="text-lg mx-2 hover:text-gray-400">Sign Up</a>
          </div>
        </div>
      </header>
      <div className="flex-grow flex flex-col items-center justify-center bg-gray-900 text-white text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Movie App</h1>
        <p className="text-lg md:text-2xl mb-8">Discover and enjoy unlimited movies and TV shows</p>
        <div className="space-x-4">
          <a href="/login" className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded">Login</a>
          <a href="/signup" className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded">Sign Up</a>
        </div>
      </div>
      <footer className="bg-gray-800 text-white py-4 mt-auto">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 MovieApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
