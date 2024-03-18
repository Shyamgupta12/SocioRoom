import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory from react-router-dom
import { FaSearch } from 'react-icons/fa';

const Searchbar = () => {
    const [input, setInput] = useState("");
    const [usernames, setUsernames] = useState([]);
    const [showList, setShowList] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/v1/getusernames`);
            const data = await response.json();
            setUsernames(data.usernames);
        } catch (error) {
            console.error('Error fetching usernames:', error);
        }
    }

    const handleButtonClick = async (id) => {
        // Redirect to the profile page of the clicked user
        const res = await fetch(`/api/v1/${id}`);
        const data = await res.json();

        navigate(`/profile/${data.userId}`);
        setShowList(false);
    };

    const handleChange = (value) => {
        setInput(value);
        setShowList(value.trim() !== '');
    }

    const filteredUsernames = usernames.filter(username =>
        username.toLowerCase().includes(input.toLowerCase())
    );

    return (
        <div className='input-wrapper'>
            <input
                className="input input-bordered input-accent max-w-xl h-6 w-11/12" 
                placeholder='Type to search users...'
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            />
            {showList && (
                <ul style={{ 
                    position: 'absolute', 
                    top: '100%', 
                    left: '50%', 
                    transform: 'translateX(-50%)', 
                    width: '100%', 
                    backgroundColor: 'gray', 
                    border: '1px solid #ccc', 
                    borderRadius: '4px', 
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    padding: '0', // Remove default padding
                    display: 'flex', // Use flexbox for alignment
                    justifyContent: 'center', // Center align horizontally
                    alignItems: 'center', // Center align vertically
                    flexDirection: 'column' // Align items in a column
                }}>
                    {filteredUsernames.map((username, index) => (
                        <button key={index} style={{ display: 'block',textAlign: 'center', margin: '5px 10px', padding: '5px 10px', backgroundColor: 'black', borderRadius: '4px' }} onClick={() => handleButtonClick(username)}>{username}</button>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Searchbar;
