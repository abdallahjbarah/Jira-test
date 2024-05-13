import useSocketIO from "@hooks/useSocketIO";
import { getUserSession } from "@utils/methods";
import React from "react";

const SocketIOProvider = ({ children }) => {
  const { initSocket, leaveRoom } = useSocketIO();
  const user = getUserSession();

  const handleNetworkChange = () => {
    const userData = getUserSession();

    if (navigator.onLine) {
      initSocket({
        token: userData?.login_token,
        userId: userData?._id,
      });
    }
  };

  async function loadUserData() {
    const userData = await getUserSession();
    if (userData?._id) {
      initSocket({
        token: userData?.login_token,
        userId: userData?._id,
      });
      if (window) {
        window.removeEventListener("online", handleNetworkChange);
        window.removeEventListener("online", handleNetworkChange);
        window.addEventListener("online", handleNetworkChange);
        window.addEventListener("offline", handleNetworkChange);
      }
    }
  }

  React.useEffect(() => {
    loadUserData();
  }, []);

  return <>{children}</>;
};

export default SocketIOProvider;
