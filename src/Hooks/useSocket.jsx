import io from "socket.io-client";
import { useEffect } from "react";

const useSocket = (userData, setSocket) => {
  useEffect(() => {
    const id = userData?.email || userData?.employeeId;

    if (id) {
      const socket = io.connect("http://localhost:3000");
      socket.on("connect", () => {
        setSocket(socket);
      });
    }
  }, [userData?.email, userData?.employeeId]);
};

export default useSocket;
