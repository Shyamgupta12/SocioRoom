import React, { useState, useEffect } from 'react';
import { MDBCol, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import "./MyProfile.css"
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const { username } = useParams();

  const [user, setUser] = useState({
    profession: '',
    email: '',
    image: '',
    gender: '',
    age: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/profile/${username}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [username]);

  return (
    <div className='flex justify-center mt-28'>
      <div className='w-9/12 rounded-full'>
        <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
          <MDBCardBody className="p-4">
            <MDBRow className="g-0">
              <MDBCol md="4" className="gradient-custom text-center text-white rounded-full flex items-center"
                style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                <MDBCardImage src={user.image}
                  alt="Avatar" className="my-5 ml-10 rounded-full" style={{ width: '80px' }} fluid />
                <MDBTypography tag="h5" className='mt-10 ml-4 text-black font-bold'>{username}</MDBTypography>
                <MDBCardText className='mt-20 ml-[-88px] text-sm'>{user.profession}</MDBCardText>
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
                          <MDBCardText className="text-muted" style={{ display: 'inline' }}>{user.email}</MDBCardText>
                        </div>
                        {/* Add similar blocks for other user information */}
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
  );
};

export default ProfilePage;
