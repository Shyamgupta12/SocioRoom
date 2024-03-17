import React, { useState } from 'react';

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    profileImage: 'https://via.placeholder.com/150', // Placeholder image URL
    // Add more fields as needed
  });

  const [tempUser, setTempUser] = useState({ ...user });
  const [imagePreview, setImagePreview] = useState('');
  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempUser({ ...tempUser, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempUser({ ...tempUser, profileImage: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ ...tempUser });
    setEditing(false);
  };

  const handleCancel = () => {
    setTempUser({ ...user });
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
        <div className="text-center mb-4">
          <img src={tempUser.profileImage} alt="Profile" className="rounded-full w-30 h-21 mx-auto mb-2" />
          <div>
            <label htmlFor="profileImage" className="cursor-pointer text-blue-500 underline">
              Change Profile Image
            </label>
            <input
              type="file"
              id="profileImage"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="name"
              id="name"
              value={tempUser.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              name="email"
              id="email"
              value={tempUser.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
              Bio:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="bio"
              id="bio"
              value={tempUser.bio}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save
            </button>
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
