// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FiTrash2, FiEdit } from 'react-icons/fi'; // Assuming you're using react-icons package
// import ListDetailPage from '../Pages/ListDetailPage';

// const ListCard = ({ list, onDelete }) => {
//     const defaultImageUrl = list.movies.length > 0 ? list.movies[0].poster : 'default-image-url';
//     const navigate = useNavigate();

//     const handleCardClick = () => {
//       navigate('/lists/:listId')
//     };

//     return (
//         <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-white relative cursor-pointer" onClick={handleCardClick}>
//             <img src={defaultImageUrl} alt={list.name} className="w-full h-auto mb-2" />
//             <h3 className="text-xl font-bold">{list.name}</h3>
//             <div className="flex justify-between items-center mt-2">
//                 <div>
//                     <button className="mr-2 text-red-600 hover:text-red-800" onClick={() => onDelete(list._id)}>
//                         <FiTrash2 className="inline" /> Delete
//                     </button>
//                     <Link to={`/list/edit/${list._id}`} className="text-blue-600 hover:text-blue-800">
//                         <FiEdit className="inline" /> Edit Name
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ListCard;

import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiEdit } from 'react-icons/fi'; // Assuming you're using react-icons package
import EditListNamePopup from './EditListNamePopup';

const ListCard = ({ list, onDelete,onEdit  }) => {
    const defaultImageUrl = list.movies.length > 0 ? list.movies[0].poster : 'default-image-url';
    const [isEditing, setIsEditing] = useState(false);
   
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handlePopupClose = () => {
        setIsEditing(false);
    };

    const handleNameUpdated = (updatedList) => {
        onEdit(updatedList); // Update the list name in the parent component or refresh the data
    };
    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-white relative">
        <Link to={`/lists/${list._id}`}>
            <img src={defaultImageUrl} alt={list.name} className="w-full h-auto mb-2 cursor-pointer" />
        </Link>
        <h3 className="text-xl font-bold">{list.name}</h3>
        <div className="flex justify-between items-center mt-2">
            <div>
                <button className="mr-2 text-red-600 hover:text-red-800" onClick={() => onDelete(list._id)}>
                    <FiTrash2 className="inline" /> Delete
                </button>
                <button onClick={handleEditClick} className="text-blue-600 hover:text-blue-800">
                    <FiEdit className="inline" /> Edit Name
                </button>
            </div>
        </div>
        {isEditing && (
            <EditListNamePopup
                listId={list._id}
                currentName={list.name}
                onClose={handlePopupClose}
                onNameUpdated={handleNameUpdated}
            />
        )}
    </div>
);
};

export default ListCard;
