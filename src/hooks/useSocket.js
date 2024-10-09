import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { checkTokenExpiry } from "../common/utils";

const SOCKET_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000";

export const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || checkTokenExpiry()) {
      return;
    }

    const newSocket = io(SOCKET_URL, {
      extraHeaders: {
        authorization: "Bearer " + token,
      },
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return socket;
};
