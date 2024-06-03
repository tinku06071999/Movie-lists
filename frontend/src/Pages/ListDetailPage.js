// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams,useNavigate } from 'react-router-dom';

// const ListDetailPage = () => {
//   const { listId } = useParams();
//   const [list, setList] = useState(null);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchList();
//   }, []);

//   const fetchList = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage when the user logs in

//       const [myListsResponse, publicListsResponse] = await Promise.all([
//         axios.get('http://localhost:3001/api/my-lists', {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }),
//         axios.get('http://localhost:3001/api/public-lists', {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         })
//       ]);

//       const myLists = myListsResponse.data;
//       const publicLists = publicListsResponse.data;
//       console.log("my list ", myLists);

//       // Filter out public lists that are already in myLists
//       const combinedLists = [
//         ...myLists,
//         ...publicLists.filter(publicList => !myLists.some(myList => myList._id === publicList._id))
//       ];
   
//       // Find the selected list by ID
      
//       const selectedList = combinedLists.find(list => list._id === list._id);
//       console.log("selected list ",selectedList);
//       if (selectedList) {
//         setList(selectedList);
//       } else {
//         setError('List not found');
//       }
//     } catch (error) {
//       console.error('Error fetching list:', error);
//       setError(error.response ? error.response.data.error : 'An error occurred');
//     }
//   };
//   const handlenavigate = () =>{
//      navigate('/dashboard')
//   }

//   if (!list) {
//     return <div className="text-white">List not found</div>;
// }
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-700 via-gray-900 to-black p-4">
//       <header className="text-center mb-6">
//         <h1 className="text-4xl font-bold text-white">{list.name} Details</h1>
//        <button className='br-4px-rounded bg-black'> <h1 className="text-4xl font-bold text-white"
//         onClick={handlenavigate}
//         >Home</h1>
//         </button>
//       </header>
//       <div className="mb-6 w-full">
//         <h2 className="text-2xl font-bold text-white mb-4">Movies in this list</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {list.movies.map((movie) => (
//             <div key={movie.imdbID} className="bg-gray-800 p-4 rounded-lg shadow-lg text-white">
//               <img src={movie.poster} alt={movie.title} className="w-full h-auto mb-2" />
//               <h3 className="text-lg font-bold">{movie.title}</h3>
//               <p>{movie.year}</p>
//               {/* Add delete option or edit option here */}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ListDetailPage;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi'; // Assuming you're using react-icons package

const ListDetailPage = () => {
  const { listId } = useParams();
  const [list, setList] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

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

      const combinedLists = [
        ...myLists,
        ...publicLists.filter(publicList => !myLists.some(myList => myList._id === publicList._id))
      ];
   
      const selectedList = combinedLists.find(list => list._id === listId);

      if (selectedList) {
        setList(selectedList);
      } else {
        setError('List not found');
      }
    } catch (error) {
      console.error('Error fetching list:', error);
      setError(error.response ? error.response.data.error : 'An error occurred');
    }
  };

  const handleNavigate = () => {
    navigate('/dashboard');
  };

  const onDelete = async(movieId) =>{
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3001/api/lists/${listId}/movies/${movieId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Update the list after deletion
      fetchList();
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  }
  if (!list) {
    return <div className="text-white">List not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-700 via-gray-900 to-black">
      <div className="flex justify-between items-center bg-gray-800 p-4 w-full">
        <h1 className="text-4xl font-bold text-white">{list.name} Details</h1>
        <button className="flex items-center text-white" onClick={handleNavigate}>
          <FiHome className="mr-2" /> Home
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="mb-6 w-full">
          <h2 className="text-2xl font-bold text-white mb-4">Movies in this list</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {list.movies.map((movie) => (
              <div key={movie.imdbID} className="bg-gray-800 p-4 rounded-lg shadow-lg text-white">
                <img src={movie.poster} alt={movie.title} className="w-full h-auto mb-2" />
                
                <p>{movie.year}</p><div className="flex justify-between items-center mt-2">
                <h3 className="text-lg font-bold">{movie.title}</h3>
                
                <button className="mr-2 text-red-600 hover:text-red-800" onClick={() => onDelete(movie.imdbID)}>
                    <FiTrash2 className="inline" /> Delete
                </button> </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListDetailPage;
