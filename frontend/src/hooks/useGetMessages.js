import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                if (!selectedConversation || !selectedConversation._id) {
                    // If selectedConversation or its ID is missing, return early
                    setLoading(false);
                    return;
                }

                const res = await fetch(`/api/v1/getmessages/${selectedConversation._id}`);
                if (!res.ok) {
                    throw new Error(`Failed to fetch messages (status ${res.status})`);
                }

                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }

                setMessages(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getMessages();
    }, [selectedConversation, setMessages]);

    useEffect(() => {
        console.log("Selected conversation:", selectedConversation);
        console.log("Messages:", messages);
    }, [selectedConversation, messages]);

    return { messages, loading };
};
export default useGetMessages;
