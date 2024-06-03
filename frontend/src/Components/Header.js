import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Header = (
  
  {
    searchTerm,
    setSearchTerm,
    handleSearch,
    handleCreateList,
    listName,
    setListName,
    isPublic,
    setIsPublic
}) => 
  
  {
   
  return (
        <nav className="bg-gray-800 w-full p-4 flex flex-wrap justify-between items-center">
           
            <div className="flex items-center w-full md:w-auto">
                <form
                    onSubmit={(e) => { e.preventDefault(); handleSearch(searchTerm); }}
                    className="flex items-center flex-1 md:w-auto mb-2 md:mb-0"
                >
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 text-lg text-gray-700 bg-white border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none w-full"
                        placeholder="Search for a movie..."
                    />
                    <button
                        type="submit"
                        className="ml-4 px-4 py-2 bg-blue-600 text-white font-medium text-lg rounded shadow-md hover:bg-blue-700 focus:bg-blue-700 focus:outline-none transition duration-150 ease-in-out"
                    >
                        Search
                    </button>
                </form>
                <form onSubmit={handleCreateList} className="flex items-center ml-4">
                    <input
                        type="text"
                        value={listName}
                        onChange={(e) => setListName(e.target.value)}
                        className="px-4 py-2 text-lg text-gray-700 bg-white border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="New list name..."
                    />
                    <label className="ml-4 text-lg text-white">
                        <input
                            type="checkbox"
                            checked={isPublic}
                            onChange={(e) => setIsPublic(e.target.checked)}
                            className="mr-2"
                        />
                        Public
                    </label>
                    <button
                        type="submit"
                        className="ml-4 px-4 py-2 bg-green-600 text-white font-medium text-lg rounded shadow-md hover:bg-green-700 focus:bg-green-700 focus:outline-none transition duration-150 ease-in-out"
                    >
                        Create List
                    </button>
                </form>
            </div>
            <div className="text-white text-lg flex items-center ml-0 md:ml-4">
                <Link to="/login" className="hover:underline">Logout</Link>
                <FontAwesomeIcon icon={faSignOutAlt} className="ml-2" />
           
                </div>
        </nav>
    );
};

export default Header;
