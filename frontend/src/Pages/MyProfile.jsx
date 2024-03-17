import React, { useState } from 'react';
import { useAuthContext } from "../context/AuthContext";
import { MDBTypography, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardText, MDBIcon } from 'mdbreact'; // Import MDBReact components

const ProfilePage = () => {
  const { authUser } = useAuthContext();
  const [user, setUser] = useState({
    name: authUser.data.loginUser.username,
    email: authUser.data.loginUser.email,
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    profileImage: authUser.data.loginUser.image, // Use correct image data
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
          <img src={user.profileImage} alt="Profile" className="rounded-full w-30 h-21 mx-auto mb-2" />
          <div>
            <MDBTypography tag="h6">Information</MDBTypography>
            <hr className="mt-0 mb-4" />
            <MDBRow className="pt-1">
              <MDBCol size="6" className="mb-3">
                <MDBTypography tag="h6">Email</MDBTypography>
                <MDBCardText className="text-muted">{user.email}</MDBCardText>
              </MDBCol>
              {/* Add more profile information fields here */}
            </MDBRow>
          </div>
          <div className="mt-auto">
            <MDBTypography tag="h6">Social Media</MDBTypography>
            <hr className="mt-0 mb-4" />
            <div className="d-flex justify-content-start">
              <a href="#!"><MDBIcon fab icon="facebook" size="lg" /></a>
              <a href="#!"><MDBIcon fab icon="twitter" size="lg" /></a>
              <a href="#!"><MDBIcon fab icon="instagram" size="lg" /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
