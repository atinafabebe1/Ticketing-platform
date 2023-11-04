import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Modal from '../components/modal/Modal';

function UserProfile() {
  const [userData, setUserData] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedField, setEditedField] = useState('');
  const [editedValue, setEditedValue] = useState('');

  useEffect(() => {
    api(`/user/profile`)
      .then((data) => {
        setUserData(data.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleEdit = (field, value) => {
    setEditedField(field);
    setEditedValue(value);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = () => {
    // Add your logic to handle the edit action here
    // You can use `editedField` and `editedValue` to update the user's data.
    // Then close the modal:
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    // Add your logic to handle the delete action here
  };

  // Define a function to render each user information field with an edit icon
  const renderEditableField = (label, field, value) => {
    return (
      <div className="mb-4">
        <label className="text-sm text-mediumGray">{label}</label>
        <div className="flex items-center">
          <p className="font-semibold mr-2">{value}</p>
          <FaEdit onClick={() => handleEdit(field, value)} className="text-primary cursor-pointer" />
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-semibold text-primary mb-6">User Profile</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderEditableField('First Name', 'firstName', userData.firstName)}
          {renderEditableField('Last Name', 'lastName', userData.lastName)}
          {renderEditableField('Email', 'email', userData.email)}
          {renderEditableField('Username', 'userName', userData.userName)}
          {renderEditableField('Phone Number', 'phoneNumber', userData.phoneNumber || 'N/A')}
          {renderEditableField('Location', 'location', userData.location || 'N/A')}
          {renderEditableField('Role', 'role', userData.role)}
        </div>
        <div className="mt-6 flex items-center justify-end">
          <button onClick={handleDelete} className="flex px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-full cursor-pointer">
            <FaTrash className="mr-2 my-1" />
            Delete Account
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title={`Edit ${editedField}`}>
        <div className="mb-4">
          <label className="text-sm text-mediumGray">{editedField}</label>
          <input type="text" className="w-full p-2 border rounded" value={editedValue} onChange={(e) => setEditedValue(e.target.value)} />
        </div>
        <div className="flex justify-end">
          <button onClick={handleEditSubmit} className="bg-blue text-white py-2 px-4 rounded-full cursor-pointer">
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default UserProfile;
