import useGetMessages from "../hooks/useGetMessages";
import Message from "./Message";
import MessageSkeleton from "../skeleton/MessageSkeleton";
import {useEffect, useRef} from 'react';

const Messages = () => {
	const {messages, loading} = useGetMessages();
	const lastmsgRef = useRef();

	useEffect(() => {
		setTimeout(() => {
			lastmsgRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

	return (
		<div className='px-4 flex-1 overflow-auto'>

				{!loading &&
					messages.length > 0 &&
					messages.map((message) => (
						<div key={message.id}>
							<Message message={message} />
						</div>
				))}

			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

			{!loading && messages.length === 0 && (
				<div>
					<p className='text-center'>Send a message to start the conversation</p>
				</div>
			)}

		</div>
	);
};
export default Messages;