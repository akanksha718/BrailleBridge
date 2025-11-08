import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

export default function useSocket(userId) {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!userId) return; 
    socketRef.current = io("http://localhost:5000", {
      withCredentials: true,
    });

    socketRef.current.emit("join", userId);

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, [userId]);

  return socketRef.current;
}

