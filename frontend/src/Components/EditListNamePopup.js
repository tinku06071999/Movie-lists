import React, { useState } from 'react';
import axios from 'axios';

const EditListNamePopup = ({ listId, currentName, onClose, onNameUpdated }) => {
    const [newName, setNewName] = useState(currentName);
    const [error, setError] = useState('');

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.patch(
                `https://movie-lists-server.vercel.app/api/lists/${listId}`,
                { name: newName },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            onNameUpdated(response.data);
            console.log(response.data);
            onClose();
        } catch (error) {
            setError(error.response ? error.response.data.error : 'An error occurred');
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 text-black">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 ">
                <h2 className="text-2xl font-bold mb-4">Edit List Name</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <input
                    type="text"
                    value={newName}
                    onChange={handleNameChange}
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
                    placeholder="New list name"
                />
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="mr-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditListNamePopup;
