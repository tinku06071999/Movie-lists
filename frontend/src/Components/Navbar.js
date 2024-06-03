// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Navbar = ({ handleSearch, handleCreateList, handleLogout }) => {
//   const navigate = useNavigate();

//   return (
//     <nav className="flex items-center justify-between bg-gray-800 py-4 px-8 md:px-16 lg:px-24">
//       <div>
//         <h1 className="text-2xl font-bold text-white">Movie Search Dashboard</h1>
//       </div>
//       <div className="flex items-center">
//         <div className="mr-8">
//           <form onSubmit={(e) => { e.preventDefault(); handleSearch(searchTerm); }}>
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="px-4 py-2 text-lg text-gray-700 bg-white border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
//               placeholder="Search for a movie..."
//             />
//             <button
//               type="submit"
//               className="ml-4 px-4 py-2 bg-blue-600 text-white font-medium text-lg rounded shadow-md hover:bg-blue-700 focus:bg-blue-700 focus:outline-none transition duration-150 ease-in-out"
//             >
//               Search
//             </button>
//           </form>
//         </div>
//         <div className="flex items-center">
//           <button
//             onClick={handleCreateList}
//             className="mr-4 px-4 py-2 bg-green-600 text-white font-medium text-lg rounded shadow-md hover:bg-green-700 focus:bg-green-700 focus:outline-none transition duration-150 ease-in-out"
//           >
//             Create List
//           </button>
//           <button
//             onClick={() => navigate('/')}
//             className="mr-4 text-white hover:text-gray-300 focus:outline-none"
//           >
//             Home
//           </button>
//           <button
//             onClick={handleLogout}
//             className="text-white hover:text-gray-300 focus:outline-none"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
