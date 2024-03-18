import React from 'react';
import Fcard from '../components/Fcard';
import { useAuthContext } from '../context/AuthContext';

const Follower = () => {
    const { authUser } = useAuthContext();
    const followers = authUser.data.loginUser.followers;
    console.log(authUser.data.loginUser);

    // // Function to handle following back
    // const handleFollowBack = async (followerId) => {
    //     // Implement your follow back logic here
    // };

    return (
        <div className='w-full'>
            <div className='flex row-auto'>
                {followers && followers.map(follower => (
                    // <Fcard
                    //     key={follower.id}
                    //     name={follower.username}
                    //     job={follower.profession}
                    //     imageUrl={follower.image}
                    //     userId={follower.id}
                    // />
                    console.log(follower.username)
                ))}
            </div>
        </div>
    );
};

export default Follower;
