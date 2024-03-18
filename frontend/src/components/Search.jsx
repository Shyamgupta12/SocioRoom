// import React, { useState, useEffect } from 'react';
// import { MdOutlinePersonSearch } from "react-icons/md";

// function UserSearch({user.id}) {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [users, setUsers] = useState([]);
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     fetch('/users') // Assuming this is the endpoint to fetch users from the backend
//       .then(response => response.json())
//       .then(data => {
//         setUsers(data);
//       })
//       .catch(error => console.error('Error fetching users:', error));
//   }, []);

 

//   const handleChange = (e) => {
//     setSearchTerm(e.target.value);
//     const results = users.filter(user =>
//       user.username.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setSearchResults(results);
//   };

//   return (
//     <div className="container mx-auto mt-3 mb-0">
//       <div className="relative">
//         <input
//           type="text"
//           placeholder="Search users...."
//           value={searchTerm}
//           onChange={handleChange}
//           className="w-full px-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
//         />
//         <div className="absolute px-8 py-2 inset-y-0 left-0 flex items-center pl-3">
//           <MdOutlinePersonSearch className="text-gray-400" />
//         </div>
//       </div>
//       <ul className="mt-4">
//         {searchResults.map(user => (
//           <li key={user.id} className="py-2 border-b border-gray-300">{user.username}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default UserSearch;
