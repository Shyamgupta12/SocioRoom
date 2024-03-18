import React, { useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import "./MyProfile.css"
import { useAuthContext } from "../context/AuthContext";

const ProfilePage = () => {
  const { authUser } = useAuthContext();
  const [user, setUser] = useState({
    // name: ,
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
    <div className='flex justify-center mt-28'>
    <div className='w-9/12 rounded-full'>
    <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
  <MDBCardBody className="p-4">
    <MDBRow className="g-0">
      <MDBCol md="4" className="gradient-custom text-center text-white rounded-full flex items-center"
        style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
        <MDBCardImage src={authUser.data.loginUser.image}
          alt="Avatar" className="my-5 ml-10 rounded-full" style={{ width: '80px' }} fluid />
        <MDBTypography tag="h5" className='mt-10 ml-4 text-black font-bold'>{authUser.data.loginUser.username}</MDBTypography>
        <MDBCardText className='mt-20 ml-[-88px] text-sm'>{authUser.data.loginUser.profession}</MDBCardText>
        <MDBIcon far icon="edit mb-5" />
      </MDBCol> 
      <MDBCol md="8">
        <div className="d-flex flex-column h-100">
          <div>
            <MDBTypography tag="h6" className='font-bold'>Information</MDBTypography>
            <hr className="mt-0 mb-4" />
            <MDBRow className="pt-1">
            <MDBCol size="6" className="mb-3">
              <div>
                  <MDBTypography tag="h6" className='font-bold' style={{ display: 'inline' }}>Email:   </MDBTypography>
                  <MDBCardText className="text-muted" style={{ display: 'inline' }}>{authUser.data.loginUser.email}</MDBCardText>
              </div>
              <div>
                  <MDBTypography tag="h6" className='font-bold' style={{ display: 'inline' }}>Gender:   </MDBTypography>
                  <MDBCardText className="text-muted" style={{ display: 'inline' }}>{authUser.data.loginUser.gender}</MDBCardText>
              </div>
              <div>
                  <MDBTypography tag="h6" className='font-bold' style={{ display: 'inline' }}>Age:   </MDBTypography>
                  <MDBCardText className="text-muted" style={{ display: 'inline' }}>{authUser.data.loginUser.age}</MDBCardText>
              </div>
          </MDBCol>
            </MDBRow>
          </div>
          <div className="mt-auto">
            <MDBTypography tag="h6">Social Media</MDBTypography>
            <hr className="mt-0 mb-4" />
            <div className="d-flex justify-content-start">
              <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
              <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
              <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
            </div>
          </div>
        </div>
      </MDBCol>
    </MDBRow>
  </MDBCardBody>
</MDBCard>
</div>
</div>
  )
   
};

export default ProfilePage;