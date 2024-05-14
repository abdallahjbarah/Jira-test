import { useRouter } from "next/navigation";
import { ROLES, USER_DETAILS } from "@utils/constants";

/**
 * Custom hook for managing user authentication and user data.
 * @returns {{
 *   userData: object,
 *   setUserData: Function,
 *   updateUserData: Function,
 *   logout: Function,
 *   isAuthenticUser: Boolean,
 *   redirectTo: Function
 * }}
 */
export default function useUser() {
  // Retrieve user data and navigate function
  const router = useRouter();

  /**
   * Retrieves user data from localStorage.
   * @returns {object} User data object.
   */
  function getUserSession() {
    try {
      const storedUserData = localStorage.getItem(USER_DETAILS);
      return storedUserData ? JSON.parse(storedUserData) : null;
    } catch (error) {
      console.error("Error retrieving user data from localStorage:", error);
      return null;
    }
  }

  /**
   * Saves user data to localStorage.
   * @param {object} data - User data to be saved.
   */
  function setUserData(data) {
    localStorage.setItem(USER_DETAILS, JSON.stringify(data));
  }

  /**
   * Updates user data in localStorage with new data.
   * @param {object} newUserData - New user data.
   */
  function updateUserDataInSession(newUserData) {
    try {
      const userData = getUserSession();
      const updatedUserData = { ...userData, ...newUserData };
      localStorage.setItem(USER_DETAILS, JSON.stringify(updatedUserData));
    } catch (error) {
      console.error(`Error updating ${USER_DETAILS} in localStorage:`, error);
    }
  }

  /**
   * Navigates to the login page and removes user data from localStorage.
   */
  function logout() {
    localStorage.removeItem(USER_DETAILS);
    router("/");
  }

  /**
   * Redirects the user to a specified path.
   * @param {string} path - Path to redirect to.
   */
  function redirectTo(path) {
    router(path);
  }

  /**
   * Checks if the current user is an authentic user based on their role.
   * @returns {boolean} True if the user is authentic, false otherwise.
   */
  function isAuthenticUser() {
    const userData = getUserSession();
    return (
      Number(userData?.role?.id) === ROLES.SUPER_ADMIN ||
      Number(userData?.role?.id) === ROLES.PARTNER
    );
  }

  // Return the user data and utility functions
  return {
    userData: getUserSession(),
    setUserData,
    updateUserData: updateUserDataInSession,
    logout,
    isAuthenticUser: isAuthenticUser(),
    redirectTo,
  };
}

