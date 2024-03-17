import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();
    const navigate = useNavigate();

	const logout = async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/v1/logout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
            console.log("aaya");

			localStorage.removeItem("chat-user");
            Cookies.remove("token");
			setAuthUser(null);
            toast.success("Logout  Successfull");
            navigate("/");
            // setIsLoggedIn(false);
            
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, logout };
};
export default useLogout;