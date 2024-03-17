import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

const Searchbar = () => {
    const [input, setInput] = useState("");
    const [usernames, setUsernames] = useState([]);
    const [showList, setShowList] = useState(false); // State to control when to show the list

    useEffect(() => {
        fetchData();
    }, []); // Fetch data when the component mounts

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/v1/getusernames`); // Fetch data from the API
            const data = await response.json();
            setUsernames(data.usernames); // Update the usernames state
        } catch (error) {
            console.error('Error fetching usernames:', error);
        }
    }

    const handleChange = (value) => {
        setInput(value); // Update the input state
        setShowList(value.trim() !== ''); // Show the list only if there's input
    }

    // Filter usernames based on input value
    // const filteredUsernames = usernames.filter(username =>
    //     username.toLowerCase().includes(input.toLowerCase())
    // );

    return (
        <div className='input-wrapper'>
            {/* <FaSearch id="search-icon" /> */}
            <input
            className="input input-bordered input-accent w-full max-w-xs"
                placeholder='Type to search ...'
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            />
            {/* Render the list of filtered usernames if input is not empty */}
            {/* {showList && (
                <ul>
                    {filteredUsernames.map((username, index) => (
                        <li key={index}>{username}</li>
                    ))}
                </ul>
            )} */}
        </div>
    );
}

export default Searchbar;
{/* <input type="text" placeholder="Type here" className="input input-bordered input-accent w-full max-w-xs" /> */}