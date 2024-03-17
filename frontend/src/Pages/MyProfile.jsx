import React, { useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import "./MyProfile.css"

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
    <div className='flex justify-center mt-28'>
    <div className='w-9/12'>
    <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
  <MDBCardBody className="p-4">
    <MDBRow className="g-0">
      <MDBCol md="4" className="gradient-custom text-center text-white"
        style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
        <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
          alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
        <MDBTypography tag="h5">Marie Horwitz</MDBTypography>
        <MDBCardText>Web Designer</MDBCardText>
        <MDBIcon far icon="edit mb-5" />
      </MDBCol>
      <MDBCol md="8">
        <div className="d-flex flex-column h-100">
          <div>
            <MDBTypography tag="h6">Information</MDBTypography>
            <hr className="mt-0 mb-4" />
            <MDBRow className="pt-1">
              <MDBCol size="6" className="mb-3">
                <MDBTypography tag="h6">Email</MDBTypography>
                <MDBCardText className="text-muted">info@example.com</MDBCardText>
              </MDBCol>
              <MDBCol size="6" className="mb-3">
                <MDBTypography tag="h6">Phone</MDBTypography>
                <MDBCardText className="text-muted">123 456 789</MDBCardText>
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
