// Fwcard.js
import React from 'react';
import '../index.css'
import { Link } from 'react-router-dom';
import { useState ,useEffect} from 'react';
import { useAuthContext } from '../context/AuthContext';

const Fwcard = ({ id, name, job, imageUrl }) => {
    const { authUser } = useAuthContext();
    const [isFollowing, setIsFollowing] = useState(true);
    const userid = authUser.data.loginUser.id;

     // to unfollow user   ---------
   
    // const [isFollow, setIsFollow] = useState(false);
    // const [user, setUser] = useState("");
    // const [posts, setPosts] = useState([]);

   
    const handleUnfollow = async () => {
        try {
            // Send a PUT request to follow the user
            const response = await fetch(`/${id}/unfollow`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any necessary headers such as authorization token
                },
                // Optionally, you can pass any data in the request body
                body: JSON.stringify({
                    id:userid
                }),
            });

            console.log(response);

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || 'Failed to follow the user');
            }

            setIsFollowing(false);
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
//           setIsFollow(true);
//         }
//       });
//   }, [isFollow]);
  
  // over----

    return (
        <div className='flex'>
            <div className="profile-card">
                <div className="image">
                    <img src={imageUrl} alt="" className="profile-img" />
                </div>
                <div className="text-data">
                    <span className="name">{name}</span>
                    <span className="job">{job}</span>
                </div>
            
                <div className="buttons">
                    <button className="button" onClick={handleUnfollow} disabled={isFollowing}>{isFollowing ? 'UnFollow' : 'Follow Back'}</button>
                    <Link to={"/messages"}><button className="button">Message</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Fwcard;
