import { createContext, useCallback, useContext, useState } from "react";

const PublicContext = createContext();

export const usePublicContext = () => {
  return useContext(PublicContext);
};

export default function ReactPublicContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState();
  const [isSideOpen, setIsSideOpen] = useState(true);

  const [userDataUpdated, setUserDataUpdated] = useState({
    value: true,
    status: "",
  });
  const forceUpdateUserData = useCallback((status) => {
    setUserDataUpdated((data) => {
      return { value: !data.value, status: status };
    });
  }, []);

  return (
    <PublicContext.Provider
      value={{
        isLoading,
        setIsLoading,
        setIsSideOpen,
        isSideOpen,
        forceUpdateUserData,
        userDataUpdated,
      }}
    >
      {children}
    </PublicContext.Provider>
  );
}
