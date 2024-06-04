import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate,Link,Routes,Route } from 'react-router-dom';
import ListCard from '../Components/ListCard';
import Header from '../Components/Header';
import ListDetailsPage from './ListDetailPage';

const DashboardPage = () => {
  const [movies, setMovies] = useState([]);
  const [lists, setLists] = useState([]);
  const [listName, setListName] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [error, setError] = useState('');
  const [selectedListId, setSelectedListId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredList, setHoveredList] = useState(null); // State to track hovered list
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to login if not authenticated
    } else {
      fetchLists();
    }
  }, [isAuthenticated, navigate]);

  const fetchLists = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage when the user logs in
  
      const [myListsResponse, publicListsResponse] = await Promise.all([
        axios.get('http://localhost:3001/api/my-lists', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }),
        axios.get('http://localhost:3001/api/public-lists', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      ]);
  
      const myLists = myListsResponse.data;
      const publicLists = publicListsResponse.data;
  
      // Filter out public lists that are already in myLists
      const combinedLists = [
        ...myLists,
        ...publicLists.filter(publicList => !myLists.some(myList => myList._id === publicList._id))
      ];
  
      console.log('Fetched Lists:', combinedLists);
      setLists(combinedLists);
    } catch (error) {
      setError(error.response ? error.response.data.error : 'An error occurred');
    }
  };
  

  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get(`http://www.omdbapi.com/?apikey=11aaa04b&s=${searchTerm}`);
      if (response.data.Response === "True") {
        setMovies(response.data.Search);
        setError('');
      } else {
        setMovies([]);
        setError(response.data.Error);
      }
    } catch (error) {
      setMovies([]);
      setError("An error occurred while fetching data from OMDB API.");
    }
  };

  const handleCreateList = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('User is not authenticated');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/api/create', {
        name: listName,
        isPublic,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('List Creation Response:', response.data);
      setLists([...lists, response.data.list]); // Update lists with the new list
      setListName('');
      setIsPublic(false);
      alert('List created successfully');
    } catch (error) {
      setError(error.response ? error.response.data.error : 'An error occurred');
    }
  };

  const handleAddToList = async (movie) => {
    if (!selectedListId) {
      setError('Please select a list to add the movie to.');
      return;
    }
    try {
      await axios.post(`http://localhost:3001/api/add-movie/${selectedListId}`, {
        imdbID: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchLists();
      alert('Movie added to the list successfully');
    } catch (error) {
      setError(error.response ? error.response.data.error : 'An error occurred');
    }
  };

  const handleListHover = (listId) => {
    setHoveredList(listId);
  };

  const handleListLeave = () => {
    setHoveredList(null);
  };

  if (!isAuthenticated) {
    return <p>You need to log in to view this page.</p>;
  }
  const handleDeleteList = async (listId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3001/api/lists/${listId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Handle success
      fetchLists();
      console.log('List deleted successfully');
    } catch (error) {
      console.error('Error deleting list:', error);
    }
  };

  const handleEditList = (updatedList) => {
    setLists((prevLists) => prevLists.map(list => list._id === updatedList._id ? updatedList : list));
    fetchLists();
  };


  return (
 
  <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-700 via-gray-900 to-black">
  <Header
    searchTerm={searchTerm}
    setSearchTerm={setSearchTerm}
    handleSearch={handleSearch}
    handleCreateList={handleCreateList}
    listName={listName}
    setListName={setListName}
    isPublic={isPublic}
    setIsPublic={setIsPublic}
  />
  <div className="flex flex-col items-center justify-center p-4">
    <header className="text-center mb-6">
      <h1 className="text-4xl font-bold text-white">Movie Search Dashboard</h1>
    </header>
    <div className="mb-6 w-full">
      <h2 className="text-2xl font-bold text-white mb-4">My Lists</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {lists.map((list) => (
          <ListCard
            key={list._id}
            list={list}
            onDelete={handleDeleteList}
            onEdit={handleEditList}
          />
        ))}
      </div>
    </div>
    {error && <p className="text-red-500 mb-4">{error}</p>}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <div key={movie.imdbID} className="bg-white p-4 rounded-lg shadow-lg text-center">
          <img src={movie.Poster} alt={movie.Title} className="w-full h-auto mb-4" />
          <h2 className="text-lg font-bold">{movie.Title}</h2>
          <p>{movie.Year}</p>
          <select
            value={selectedListId}
            onChange={(e) => setSelectedListId(e.target.value)}
            className="mt-2 block w-full px-4 py-2 text-lg text-gray-700 bg-white border border-solid border-gray-300 rounded focus:outline-none focus:border-blue-600"
          >
            <option value="">Select a list</option>
            {lists.map((list) => (
              <option key={list._id} value={list._id}>{list.name}</option>
            ))}
          </select>
          <button
            onClick={() => handleAddToList(movie)}
            className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white font-medium text-lg rounded shadow-md hover:bg-blue-700 focus:bg-blue-700 focus:outline-none transition duration-150 ease-in-out"
          >
            Add to List
          </button>
        </div>
      ))}
    </div>
  </div>
  <Routes>
    <Route path="/lists/:id" element={<ListDetailsPage lists={lists} />} />
  </Routes>
</div>
);
};

export default DashboardPage;
