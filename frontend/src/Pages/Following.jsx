import React, { useState } from 'react';
import Fwcard from '../components/Fwcard';
import { useAuthContext } from '../context/AuthContext';

const Following = () => {
    const { authUser } = useAuthContext();
    const [followings] = useState(authUser.data.loginUser.followings); // Destructuring the state value from useState

    // const handleUnfollow = (id) => {
    //     // Call your backend API to unfollow the user with the given id
    //     // Upon successful unfollowing, update the followings state to remove the unfollowed user
    //     // Example:
    //     fetch(`/api/unfollow/${id}`, {
    //         method: 'POST',
    //         // Additional options like headers, body, etc. can be included here
    //     })
    //     .then(response => {
    //         if (response.ok) {
    //             // Remove the unfollowed user from the followings state
    //             setFollowings(prevFollowings => prevFollowings.filter(following => following.id !== id));
    //         }
    //     })
    //     .catch(error => console.error('Error unfollowing user:', error));
    // };

    return (
        <div className='flex row-auto'>
            {/* Map over the followings array and render Fwcard for each following */}
            {followings && followings.map(following => (
                <Fwcard
                    // key={following.id}
                    id={following.id}
                    name={following.username}
                    job={following.profession}
                    imageUrl={following.image}
                    // onUnfollow={handleUnfollow}
                />
            ))}
        </div>
    );
};

export default Following;
