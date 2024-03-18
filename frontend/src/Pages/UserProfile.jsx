import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import "./MyProfile.css"
import { useAuthContext } from "../context/AuthContext";
import { useParams } from 'react-router-dom';
// import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardText, MDBIcon } from 'mdbreact'; // Import MDBReact components

const UserProfile = () => {
  const {userid} = useParams();
  console.log(userid);
  const { authUser } = useAuthContext();
  const [user, setuser] = useState("");
  const [posts, setPosts] = useState([]);
  // const [user, setUser] = useState({
  //   // name: ,
  //   email: 'johndoe@example.com',
  //   bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  //   profileImage: authUser.data.loginUser.image, // Use correct image data
  //   // Add more fields as needed
  // });

  // const [tempUser, setTempUser] = useState({ ...user });
  // const [imagePreview, setImagePreview] = useState('');
  // const [editing, setEditing] = useState(false);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setTempUser({ ...tempUser, [name]: value });
  // };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setTempUser({ ...tempUser, profileImage: reader.result });
  //       setImagePreview(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setUser({ ...tempUser });
  //   setEditing(false);
  // };

  // const handleCancel = () => {
  //   setTempUser({ ...user });
  //   setEditing(false);
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/v1/profile/${userid}`);
        console.log(res);
        const data = await res.json();
        console.log(data);
        if (data.error) {
          throw new Error(data.error);
        }
        setuser(data.user);
        setPosts(data.post);
      } catch (error) {
        // toast.error(error.message);
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

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
        <MDBTypography tag="h5" className='mt-10 ml-4 text-black font-bold'>{user.username}</MDBTypography>
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
              <div>
                  <MDBTypography tag="h6" className='font-bold' style={{ display: 'inline' }}>Gender:   </MDBTypography>
                  <MDBCardText className="text-muted" style={{ display: 'inline' }}>{user.gender}</MDBCardText>
              </div>
              <div>
                  <MDBTypography tag="h6" className='font-bold' style={{ display: 'inline' }}>Age:   </MDBTypography>
                  <MDBCardText className="text-muted" style={{ display: 'inline' }}>{user.age}</MDBCardText>
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

export default UserProfile;