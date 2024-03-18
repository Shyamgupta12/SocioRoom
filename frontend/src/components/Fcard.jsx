import React from 'react';
import '../index.css';
import { useState ,useEffect} from 'react';
// import { useAuthContext } from '../context/AuthContext';

const Fcard = ({ name, job, imageUrl, userId }) => {
 
    // const { authUser } = useAuthContext();
    // const userid = authUser.data.loginUser.id;
    // to follow user--------

    const [isFollowing, setIsFollowing] = useState(false);
    const [user, setUser] = useState("");
    const [posts, setPosts] = useState([]);

    const followUser = async (userId) => {
        try {
            const response = await fetch(/api/v1/${userId}/follow, {
                method: 'POST', // Specify the POST method
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header
                },
                credentials: 'same-origin', // Ensure that cookies are sent with the request
            });
    
            if (response.ok) {
                // If the request is successful, handle the response accordingly
                const data = await response.json();
                console.log(data); // Log the response data
                // Optionally, you can perform additional actions here, such as updating UI
            } else {
                // If the request fails, handle the error
                console.error('Failed to follow user:', response.statusText);
                // Optionally, you can display an error message to the user
            }
        } catch (error) {
            // Handle network errors or other exceptions
            console.error('Error following user:', error.message);
            // Optionally, you can display an error message to the user
        }
    };

    const handleFollow = async () => {
        try {
            // Send a PUT request to follow the user
            const response = await fetch(`/${userId}/follow`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any necessary headers such as authorization token
                },
                // Optionally, you can pass any data in the request body
                body: JSON.stringify({}),
            });

            console.log(response);

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || 'Failed to follow the user');
            }

            setIsFollowing(true);
        } catch (error) {
            console.error('Error following the user:', error);
        }
    };

    //   useEffect(() => {
    //     fetch(`http://localhost:5000/user/${userid}`, {
    //       headers: {
    //         Authorization: "Bearer " + localStorage.getItem("jwt"),
    //       },
    //     })
    //       .then((res) => res.json())
    //       .then((result) => {
    //         console.log(result);
    //         setUser(result.user);
    //         setPosts(result.post);
    //         if (
    //           result.user.followers.includes(
    //             JSON.parse(localStorage.getItem("user"))._id
    //           )
    //         ) {
    //         //   setIsFollow(true);
    //         }
    //       });
    //   }, [isFollow]);

      // over---------------
  

    return (
        <div className='flex w-full mt-[50px]'>
            <div className="profile-card">
                <div className="image">
                    <img src={imageUrl} alt="" className="profile-img" />
                </div>
                <div className="text-data">
                    <span className="name">{name}</span>
                    <span className="job">{job}</span>
                </div>
                <div className="buttons">
                    <button className="button" onClick={handleFollow} disabled={isFollowing}>{isFollowing ? 'Following' : 'Follow Back'}</button>
                </div>
            </div>
        </div>
    );
};

export default Fcard;
